import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { GrantAccessDto } from './dto/grant-access.dto';

export type GrantCourseAccessInput = GrantAccessDto & { grantedById: string };

@Injectable()
export class EnrollmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async grantAccess(input: GrantCourseAccessInput) {
    const startsAt = input.startsAt ?? new Date();

    return this.prisma.$transaction(async (tx) => {
      const course = await tx.course.findUnique({
        where: { id: input.courseId },
        select: { accessDays: true },
      });

      if (!course) {
        throw new NotFoundException('Curso no encontrado');
      }

      const expiresAt =
        input.expiresAt ??
        new Date(startsAt.getTime() + course.accessDays * 86_400_000);

      if (expiresAt <= startsAt) {
        throw new BadRequestException(
          'La fecha de vencimiento debe ser posterior al inicio',
        );
      }

      const enrollment = await tx.enrollment.upsert({
        where: {
          userId_courseId: {
            userId: input.userId,
            courseId: input.courseId,
          },
        },
        update: {},
        create: {
          userId: input.userId,
          courseId: input.courseId,
        },
      });

      return tx.enrollmentAccess.create({
        data: {
          enrollmentId: enrollment.id,
          grantedById: input.grantedById,
          startsAt,
          expiresAt,
          reason: input.reason?.trim() || 'Habilitación manual por WhatsApp',
        },
        include: {
          enrollment: {
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  fullName: true,
                  isActive: true,
                },
              },
              course: true,
            },
          },
          grantedBy: {
            select: { id: true, email: true, fullName: true },
          },
        },
      });
    });
  }

  findActiveByUser(userId: string) {
    const now = new Date();

    return this.prisma.enrollment.findMany({
      where: {
        userId,
        access: {
          some: {
            startsAt: { lte: now },
            expiresAt: { gt: now },
            revokedAt: null,
          },
        },
      },
      include: { course: { include: { cover: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAccessibleCourse(userId: string, courseId: string) {
    const now = new Date();
    const enrollment = await this.prisma.enrollment.findFirst({
      where: {
        userId,
        courseId,
        access: {
          some: {
            startsAt: { lte: now },
            expiresAt: { gt: now },
            revokedAt: null,
          },
        },
      },
    });

    if (!enrollment) {
      throw new ForbiddenException('No tienes acceso vigente a este curso');
    }

    return this.prisma.course.findUniqueOrThrow({
      where: { id: courseId },
      include: {
        cover: true,
        modules: {
          orderBy: { position: 'asc' },
          include: {
            lessons: {
              where: { status: 'PUBLISHED' },
              orderBy: { position: 'asc' },
              include: {
                video: true,
                resources: {
                  orderBy: { position: 'asc' },
                  include: { media: true },
                },
              },
            },
          },
        },
      },
    });
  }

  findAllForAdmin() {
    return this.prisma.enrollment.findMany({
      include: {
        user: {
          select: { id: true, email: true, fullName: true, isActive: true },
        },
        course: { select: { id: true, slug: true, title: true } },
        access: {
          include: {
            grantedBy: { select: { id: true, email: true, fullName: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async revokeAccess(accessId: string): Promise<void> {
    const result = await this.prisma.enrollmentAccess.updateMany({
      where: { id: accessId, revokedAt: null },
      data: { revokedAt: new Date() },
    });

    if (!result.count) {
      throw new NotFoundException('Acceso activo no encontrado');
    }
  }
}
