import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesAdminController } from './articles-admin.controller';
import { ArticleCategoriesAdminController } from './article-categories-admin.controller';
import { ArticlesService } from './articles.service';

@Module({
  controllers: [
    ArticlesController,
    ArticlesAdminController,
    ArticleCategoriesAdminController,
  ],
  providers: [ArticlesService],
  exports: [ArticlesService],
})
export class ArticlesModule {}
