import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PublicationStatus } from '../generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CreateArticleCategoryDto } from './dto/create-article-category.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  findPublished() {
    return this.prisma.article.findMany({
      where: {
        status: PublicationStatus.PUBLISHED,
        publishedAt: { lte: new Date() },
      },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        publishedAt: true,
        cover: true,
        author: { select: { id: true, fullName: true } },
        categories: { include: { category: true } },
      },
      orderBy: { publishedAt: 'desc' },
    });
  }

  findAllForAdmin() {
    return this.prisma.article.findMany({
      include: {
        author: { select: { id: true, fullName: true } },
        publishedBy: { select: { id: true, fullName: true } },
        categories: { include: { category: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByIdForAdmin(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, fullName: true } },
        publishedBy: { select: { id: true, fullName: true } },
        cover: true,
        categories: { include: { category: true } },
      },
    });

    if (!article) {
      throw new NotFoundException('Artículo no encontrado');
    }
    return article;
  }

  create(authorId: string, input: CreateArticleDto) {
    const { categoryIds, ...data } = input;
    return this.prisma.$transaction(async (tx) => {
      const article = await tx.article.create({
        data: {
          ...data,
          content: input.content as Prisma.InputJsonValue,
          slug: input.slug.trim().toLowerCase(),
          title: input.title.trim(),
          authorId,
          publishedById:
            input.status === PublicationStatus.PUBLISHED ? authorId : null,
          publishedAt:
            input.status === PublicationStatus.PUBLISHED ? new Date() : null,
        },
      });

      if (categoryIds?.length) {
        await tx.articleCategoryLink.createMany({
          data: categoryIds.map((categoryId) => ({
            articleId: article.id,
            categoryId,
          })),
        });
      }

      return tx.article.findUniqueOrThrow({
        where: { id: article.id },
        include: { categories: { include: { category: true } } },
      });
    });
  }

  async update(id: string, publisherId: string, input: UpdateArticleDto) {
    const existing = await this.prisma.article.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Artículo no encontrado');
    }

    const { categoryIds, ...data } = input;
    return this.prisma.$transaction(async (tx) => {
      if (categoryIds) {
        await tx.articleCategoryLink.deleteMany({ where: { articleId: id } });
        await tx.articleCategoryLink.createMany({
          data: categoryIds.map((categoryId) => ({
            articleId: id,
            categoryId,
          })),
        });
      }

      const updateData: Prisma.ArticleUncheckedUpdateInput = {
        ...data,
        content: input.content as Prisma.InputJsonValue | undefined,
        slug: input.slug?.trim().toLowerCase(),
        title: input.title?.trim(),
        publishedById:
          input.status === PublicationStatus.PUBLISHED
            ? publisherId
            : undefined,
        publishedAt:
          input.status === PublicationStatus.PUBLISHED
            ? (existing.publishedAt ?? new Date())
            : undefined,
      };

      return tx.article.update({
        where: { id },
        data: updateData,
        include: { categories: { include: { category: true } } },
      });
    });
  }

  async remove(id: string): Promise<void> {
    const result = await this.prisma.article.deleteMany({ where: { id } });
    if (!result.count) {
      throw new NotFoundException('Artículo no encontrado');
    }
  }

  findCategories() {
    return this.prisma.articleCategory.findMany({ orderBy: { name: 'asc' } });
  }

  createCategory(input: CreateArticleCategoryDto) {
    return this.prisma.articleCategory.create({
      data: {
        slug: input.slug.trim().toLowerCase(),
        name: input.name.trim(),
      },
    });
  }

  updateCategory(id: string, input: CreateArticleCategoryDto) {
    return this.prisma.articleCategory.update({
      where: { id },
      data: {
        slug: input.slug.trim().toLowerCase(),
        name: input.name.trim(),
      },
    });
  }

  async removeCategory(id: string): Promise<void> {
    const result = await this.prisma.articleCategory.deleteMany({
      where: { id },
    });
    if (!result.count) throw new NotFoundException('Categoría no encontrada');
  }

  async findPublishedBySlug(slug: string) {
    const article = await this.prisma.article.findFirst({
      where: {
        slug: slug.trim().toLowerCase(),
        status: PublicationStatus.PUBLISHED,
        publishedAt: { lte: new Date() },
      },
      include: {
        cover: true,
        author: { select: { id: true, fullName: true } },
        categories: { include: { category: true } },
      },
    });

    if (!article) {
      throw new NotFoundException('Artículo no encontrado');
    }

    return article;
  }
}
