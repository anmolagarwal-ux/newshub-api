import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import {
    ArticleBySlugDto
} from './dto/article.dto';
import { ArticleService } from './article.service';

@ApiTags('Article')
@Controller('article')
export class ArticleController {

    constructor(
        private readonly articleService: ArticleService,
    ) { }

    @Get('breaking')
    @ApiOperation({ summary: 'Get Breaking Articles' })
    async getBreakingArticles() {
        return await this.articleService.getBreakingArticles();
    }

    @Get('featured')
    @ApiOperation({ summary: 'Get Featured Articles' })
    async getFeaturedArticles() {
        return await this.articleService.getFeaturedArticles();
    }

    @Get('top')
    @ApiOperation({ summary: 'Get Top Articles' })
    async getTopArticles() {
        return await this.articleService.getTopArticles();
    }

    @Get()
    @ApiOperation({ summary: 'Get Articles' })
    async getArticle(
    @Query('page') page : number,
    @Query('pageSize')pageSize : number,
    @Query('search') search : string,
    @Query('categoryId') categoryId : number,){
        return await this.articleService.getArticles(page, pageSize, search, categoryId);
    }

    @Get('slug')
    @ApiOperation({ summary: 'Get Article By Slug' })
    async getArticleBySlug(
        @Query() dto: ArticleBySlugDto,
    ) {
        return await this.articleService.getArticleBySlug(dto);
    }

}