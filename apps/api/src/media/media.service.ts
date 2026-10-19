import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
import { CreateMediaDto } from './dto/create-media.dto';

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.MediaAssetCreateInput) {
    return this.prisma.mediaAsset.create({ data });
  }

  findById(id: string) {
    return this.prisma.mediaAsset.findUnique({ where: { id } });
  }

  findAll() {
    return this.prisma.mediaAsset.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  createMetadata(input: CreateMediaDto) {
    return this.prisma.mediaAsset.create({
      data: {
        ...input,
        sizeBytes:
          input.sizeBytes === undefined ? undefined : BigInt(input.sizeBytes),
      },
    });
  }

  async remove(id: string): Promise<void> {
    const result = await this.prisma.mediaAsset.deleteMany({ where: { id } });
    if (!result.count) throw new NotFoundException('Archivo no encontrado');
  }
}
