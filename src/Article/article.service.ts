import { Injectable, NotFoundException } from '@nestjs/common';

import {
  ArticleBySlugDto,
  BreakingArticleDto,
  FeaturedArticleDto,
  TopArticleDto,
} from './dto/article.dto';
import { ArticleRepository } from './article.repository';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
  ) {}

  async getBreakingArticles(): Promise<BreakingArticleDto[]> {
    return this.articleRepository.getBreakingArticles();
  }

  async getFeaturedArticles(): Promise<FeaturedArticleDto[]> {
    return this.articleRepository.getFeaturedArticles();
  }

  async getTopArticles(): Promise<TopArticleDto[]> {
    return this.articleRepository.getTopArticles();
  }

  async getArticles(
    page: number,
    pageSize: number,
    search?: string,
    categoryId?: number,
  ) {
    return this.articleRepository.getArticles(
      page,
      pageSize,
      search,
      categoryId,
    );
  }

  async getArticleBySlug(dto: ArticleBySlugDto) {
    const article = await this.articleRepository.getArticleBySlug(dto.slug);

    if (!article) {
      throw new NotFoundException('article.Article_Not_Found');
    }

    return article;
  }
}