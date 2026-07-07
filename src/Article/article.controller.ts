import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Message } from '../decorator/message.decorator';
import { ArticleService } from './article.service';
import { ArticleBySlugDto } from './dto/article.dto';

@ApiTags('Article')
@Controller('article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
  ) {}

  @Get('breaking')
  @Message('article.Breaking_Articles_Success')
  @ApiOperation({ summary: 'Get Breaking Articles' })
  async getBreakingArticles() {
    return this.articleService.getBreakingArticles();
  }

  @Get('featured')
  @Message('article.Featured_Articles_Success')
  @ApiOperation({ summary: 'Get Featured Articles' })
  async getFeaturedArticles() {
    return this.articleService.getFeaturedArticles();
  }

  @Get('top')
  @Message('article.Top_Articles_Success')
  @ApiOperation({ summary: 'Get Top Articles' })
  async getTopArticles() {
    return this.articleService.getTopArticles();
  }

  @Get()
  @Message('article.Article_List_Success')
  @ApiOperation({ summary: 'Get Articles' })
  async getArticles(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: number,
  ) {
    return this.articleService.getArticles(
      page,
      pageSize,
      search,
      categoryId,
    );
  }

  @Get('slug')
  @Message('article.Article_Detail_Success')
  @ApiOperation({ summary: 'Get Article By Slug' })
  async getArticleBySlug(
    @Query() dto: ArticleBySlugDto,
  ) {
    return this.articleService.getArticleBySlug(dto);
  }
}