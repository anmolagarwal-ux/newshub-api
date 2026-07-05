import { Injectable } from '@nestjs/common';

import {
    ArticleBySlugDto,
    ArticleQueryDto,
    BreakingArticleDto,
    FeaturedArticleDto,
    TopArticleDto
} from './dto/article.dto';
import { ArticleRepository } from './article.repository';

@Injectable()
export class ArticleService {

    constructor(
        private readonly articleRepository: ArticleRepository,
    ) { }

    async getBreakingArticles(): Promise<BreakingArticleDto[]> {

        return await this.articleRepository.getBreakingArticles();

    }

    async getFeaturedArticles(): Promise<FeaturedArticleDto[]> {

        return await this.articleRepository.getFeaturedArticles();

    }

    async getTopArticles(): Promise<TopArticleDto[]> {

        return await this.articleRepository.getTopArticles();

    }

    async getArticles(page: number, pageSize: number, search?: string, categoryId?: number) {

        return await this.articleRepository.getArticles(page,pageSize,search,categoryId,);

    }

    async getArticleBySlug(
        dto: ArticleBySlugDto,
    ) {

        return await this.articleRepository.getArticleBySlug(
            dto.slug,
        );

    }

}