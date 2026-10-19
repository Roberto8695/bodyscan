import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRole } from '../generated/prisma/client';
import { PasswordService } from '../auth/password.service';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwords: PasswordService,
  ) {}

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
        emailVerifiedAt: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        roles: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        fullName: true,
        emailVerifiedAt: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        roles: true,
      },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
      include: { roles: true },
    });
  }

  async create(input: CreateUserDto) {
    const email = input.email.trim().toLowerCase();
    const existing = await this.prisma.user.findUnique({ where: { email } });

    if (existing) {
      throw new ConflictException('El correo ya está registrado');
    }

    return this.prisma.user.create({
      data: {
        email,
        fullName: input.fullName.trim(),
        passwordHash: await this.passwords.hash(input.password),
        roles: {
          create: (input.roles?.length ? input.roles : [UserRole.STUDENT]).map(
            (role) => ({ role }),
          ),
        },
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        isActive: true,
        createdAt: true,
        roles: true,
      },
    });
  }

  async update(id: string, input: UpdateUserDto) {
    const existing = await this.prisma.user.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return this.prisma.$transaction(async (tx) => {
      if (input.roles) {
        await tx.userRoleAssignment.deleteMany({ where: { userId: id } });
        await tx.userRoleAssignment.createMany({
          data: input.roles.map((role) => ({ userId: id, role })),
        });
      }

      return tx.user.update({
        where: { id },
        data: {
          fullName: input.fullName?.trim(),
          isActive: input.isActive,
        },
        select: {
          id: true,
          email: true,
          fullName: true,
          isActive: true,
          updatedAt: true,
          roles: true,
        },
      });
    });
  }
}
