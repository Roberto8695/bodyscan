import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { CreateServiceDto } from './dto/create-service.dto';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';

@Injectable()
export class InstitutionalService {
  constructor(private readonly prisma: PrismaService) {}

  findSpecialties() {
    return this.prisma.specialty.findMany({
      where: { isPublished: true },
      orderBy: [{ position: 'asc' }, { name: 'asc' }],
    });
  }

  findProfessionals() {
    return this.prisma.professional.findMany({
      where: { isPublished: true },
      include: {
        photo: true,
        specialties: { include: { specialty: true } },
      },
      orderBy: [{ position: 'asc' }, { fullName: 'asc' }],
    });
  }

  findServices() {
    return this.prisma.service.findMany({
      where: { isPublished: true },
      include: { specialty: true },
      orderBy: [{ position: 'asc' }, { name: 'asc' }],
    });
  }

  findAllSpecialtiesForAdmin() {
    return this.prisma.specialty.findMany({
      include: { _count: { select: { professionals: true, services: true } } },
      orderBy: [{ position: 'asc' }, { name: 'asc' }],
    });
  }

  createSpecialty(input: CreateSpecialtyDto) {
    return this.prisma.specialty.create({
      data: {
        ...input,
        slug: input.slug.trim().toLowerCase(),
        name: input.name.trim(),
      },
    });
  }

  updateSpecialty(id: string, input: UpdateSpecialtyDto) {
    return this.prisma.specialty.update({
      where: { id },
      data: {
        ...input,
        slug: input.slug?.trim().toLowerCase(),
        name: input.name?.trim(),
      },
    });
  }

  async removeSpecialty(id: string): Promise<void> {
    const result = await this.prisma.specialty.deleteMany({ where: { id } });
    if (!result.count)
      throw new NotFoundException('Especialidad no encontrada');
  }

  findAllProfessionalsForAdmin() {
    return this.prisma.professional.findMany({
      include: { photo: true, specialties: { include: { specialty: true } } },
      orderBy: [{ position: 'asc' }, { fullName: 'asc' }],
    });
  }

  createProfessional(input: CreateProfessionalDto) {
    const { specialtyIds, ...data } = input;
    return this.prisma.professional.create({
      data: {
        ...data,
        fullName: input.fullName.trim(),
        specialties: {
          create: specialtyIds?.map((specialtyId) => ({ specialtyId })),
        },
      },
      include: { specialties: { include: { specialty: true } } },
    });
  }

  async updateProfessional(id: string, input: UpdateProfessionalDto) {
    const existing = await this.prisma.professional.count({ where: { id } });
    if (!existing) throw new NotFoundException('Profesional no encontrado');
    const { specialtyIds, ...data } = input;

    return this.prisma.$transaction(async (tx) => {
      if (specialtyIds) {
        await tx.professionalSpecialty.deleteMany({
          where: { professionalId: id },
        });
        await tx.professionalSpecialty.createMany({
          data: specialtyIds.map((specialtyId) => ({
            professionalId: id,
            specialtyId,
          })),
        });
      }
      return tx.professional.update({
        where: { id },
        data: { ...data, fullName: input.fullName?.trim() },
        include: { specialties: { include: { specialty: true } } },
      });
    });
  }

  async removeProfessional(id: string): Promise<void> {
    const result = await this.prisma.professional.deleteMany({ where: { id } });
    if (!result.count) throw new NotFoundException('Profesional no encontrado');
  }

  findAllServicesForAdmin() {
    return this.prisma.service.findMany({
      include: { specialty: true },
      orderBy: [{ position: 'asc' }, { name: 'asc' }],
    });
  }

  createService(input: CreateServiceDto) {
    return this.prisma.service.create({
      data: {
        ...input,
        slug: input.slug.trim().toLowerCase(),
        name: input.name.trim(),
      },
    });
  }

  updateService(id: string, input: UpdateServiceDto) {
    return this.prisma.service.update({
      where: { id },
      data: {
        ...input,
        slug: input.slug?.trim().toLowerCase(),
        name: input.name?.trim(),
      },
    });
  }

  async removeService(id: string): Promise<void> {
    const result = await this.prisma.service.deleteMany({ where: { id } });
    if (!result.count) throw new NotFoundException('Servicio no encontrado');
  }
}
