import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PublicationStatus } from '../generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCourseModuleDto } from './dto/create-course-module.dto';
import { UpdateCourseModuleDto } from './dto/update-course-module.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  findPublished() {
    return this.prisma.course.findMany({
      where: {
        status: PublicationStatus.PUBLISHED,
        publishedAt: { lte: new Date() },
      },
      select: {
        id: true,
        slug: true,
        title: true,
        summary: true,
        price: true,
        currency: true,
        accessDays: true,
        cover: true,
        publishedAt: true,
      },
      orderBy: { publishedAt: 'desc' },
    });
  }

  findAllForAdmin() {
    return this.prisma.course.findMany({
      include: {
        cover: true,
        _count: { select: { modules: true, enrollments: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByIdForAdmin(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        cover: true,
        modules: {
          orderBy: { position: 'asc' },
          include: {
            lessons: {
              orderBy: { position: 'asc' },
              include: { video: true, resources: { include: { media: true } } },
            },
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException('Curso no encontrado');
    }

    return course;
  }

  create(input: CreateCourseDto) {
    return this.prisma.course.create({
      data: {
        ...input,
        slug: input.slug.trim().toLowerCase(),
        title: input.title.trim(),
        publishedAt:
          input.status === PublicationStatus.PUBLISHED ? new Date() : null,
      },
    });
  }

  async update(id: string, input: UpdateCourseDto) {
    await this.ensureExists(id);
    return this.prisma.course.update({
      where: { id },
      data: {
        ...input,
        slug: input.slug?.trim().toLowerCase(),
        title: input.title?.trim(),
        publishedAt:
          input.status === PublicationStatus.PUBLISHED ? new Date() : undefined,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: { _count: { select: { enrollments: true } } },
    });

    if (!course) {
      throw new NotFoundException('Curso no encontrado');
    }
    if (
      course.status !== PublicationStatus.DRAFT ||
      course._count.enrollments
    ) {
      throw new BadRequestException(
        'Solo se pueden eliminar cursos en borrador sin inscripciones',
      );
    }

    await this.prisma.$transaction(async (tx) => {
      const moduleIds = (
        await tx.courseModule.findMany({
          where: { courseId: id },
          select: { id: true },
        })
      ).map(({ id: moduleId }) => moduleId);
      const lessonIds = (
        await tx.lesson.findMany({
          where: { moduleId: { in: moduleIds } },
          select: { id: true },
        })
      ).map(({ id: lessonId }) => lessonId);

      await tx.lessonResource.deleteMany({
        where: { lessonId: { in: lessonIds } },
      });
      await tx.lesson.deleteMany({ where: { id: { in: lessonIds } } });
      await tx.courseModule.deleteMany({ where: { id: { in: moduleIds } } });
      await tx.course.delete({ where: { id } });
    });
  }

  async createModule(courseId: string, input: CreateCourseModuleDto) {
    await this.ensureExists(courseId);
    return this.prisma.courseModule.create({
      data: { courseId, title: input.title.trim(), position: input.position },
    });
  }

  updateModule(moduleId: string, input: UpdateCourseModuleDto) {
    return this.prisma.courseModule.update({
      where: { id: moduleId },
      data: { ...input, title: input.title?.trim() },
    });
  }

  async removeModule(moduleId: string): Promise<void> {
    const exists = await this.prisma.courseModule.count({
      where: { id: moduleId },
    });
    if (!exists) throw new NotFoundException('Módulo no encontrado');

    await this.prisma.$transaction(async (tx) => {
      const lessonIds = (
        await tx.lesson.findMany({
          where: { moduleId },
          select: { id: true },
        })
      ).map(({ id }) => id);
      await tx.lessonResource.deleteMany({
        where: { lessonId: { in: lessonIds } },
      });
      await tx.lesson.deleteMany({ where: { id: { in: lessonIds } } });
      await tx.courseModule.delete({ where: { id: moduleId } });
    });
  }

  async createLesson(moduleId: string, input: CreateLessonDto) {
    const exists = await this.prisma.courseModule.count({
      where: { id: moduleId },
    });
    if (!exists) throw new NotFoundException('Módulo no encontrado');
    return this.prisma.lesson.create({
      data: { ...input, moduleId, title: input.title.trim() },
    });
  }

  updateLesson(lessonId: string, input: UpdateLessonDto) {
    return this.prisma.lesson.update({
      where: { id: lessonId },
      data: { ...input, title: input.title?.trim() },
    });
  }

  async removeLesson(lessonId: string): Promise<void> {
    const result = await this.prisma.lesson.deleteMany({
      where: { id: lessonId },
    });
    if (!result.count) throw new NotFoundException('Lección no encontrada');
  }

  async findPublishedBySlug(slug: string) {
    const course = await this.prisma.course.findFirst({
      where: {
        slug: slug.trim().toLowerCase(),
        status: PublicationStatus.PUBLISHED,
        publishedAt: { lte: new Date() },
      },
      include: {
        cover: true,
        modules: {
          orderBy: { position: 'asc' },
          include: {
            lessons: {
              where: { status: PublicationStatus.PUBLISHED },
              orderBy: { position: 'asc' },
              select: {
                id: true,
                title: true,
                kind: true,
                position: true,
              },
            },
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException('Curso no encontrado');
    }

    return course;
  }

  private async ensureExists(id: string): Promise<void> {
    const exists = await this.prisma.course.count({ where: { id } });
    if (!exists) {
      throw new NotFoundException('Curso no encontrado');
    }
  }
}
