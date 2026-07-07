import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { DatabaseService } from '../../database/database.service';
import { CreateArticleDTO, UpdateArticleDTO } from './dto/publishArticle.dto';

@Injectable()
export class PublishArticleRepository {
  constructor(
    private readonly dbService: DatabaseService,
  ) {}

  async Create(dto: CreateArticleDTO) {
    try {
      const pool = this.dbService.getPool();

      const result = await pool
        .request()
        .input('title', dto.title)
        .input('slug', dto.slug)
        .input('short_description', dto.short_description)
        .input('content', dto.content)
        .input('featured_image', dto.featured_image)
        .input('category_id', dto.category_id)
        .input('author_id', dto.author_id)
        .input('status_id', dto.status_id)
        .input('is_featured', dto.is_featured)
        .input('is_breaking', dto.is_breaking)
        .input('is_draft', dto.is_draft)
        .execute('sp_PublishArticle_Create');

      return result.recordset[0];

    } catch {
      throw new InternalServerErrorException();
    }
  }


  async GetAll(
    pageNumber: number,
    pageSize: number,
    status_id: number,
    category_id: number,
    search: string = '',
    userId: number,
  ) {

    try {
      const pool = this.dbService.getPool();

      const result = await pool
        .request()
        .input('pageNumber', pageNumber)
        .input('pageSize', pageSize)
        .input('status_id', status_id)
        .input('category_id', category_id)
        .input('search', search)
        .input('user_Id', userId)
        .execute('sp_PublishArticle_GetAll');

      return result.recordset;

    } catch {
      throw new InternalServerErrorException();
    }
  }


  async GetById(id: number) {

    try {
      const pool = this.dbService.getPool();

      const result = await pool
        .request()
        .input('id', id)
        .execute('sp_PublishArticle_GetById');

      return result.recordset[0] ?? null;

    } catch {
      throw new InternalServerErrorException();
    }
  }


  async Update(dto: UpdateArticleDTO) {

    try {
      const pool = this.dbService.getPool();

      const result = await pool
        .request()
        .input('id', dto.id)
        .input('title', dto.title)
        .input('slug', dto.slug)
        .input('short_description', dto.short_description)
        .input('content', dto.content)
        .input('featured_image', dto.featured_image)
        .input('category_id', dto.category_id)
        .input('status_id', dto.status_id)
        .input('is_featured', dto.is_featured)
        .input('is_breaking', dto.is_breaking)
        .input('is_draft', dto.is_draft)
        .execute('sp_PublishArticle_Update');

      return result.recordset[0];

    } catch {
      throw new InternalServerErrorException();
    }
  }


  async Delete(id: number) {

    try {
      const pool = this.dbService.getPool();

      const result = await pool
        .request()
        .input('id', id)
        .execute('sp_PublishArticle_Delete');

      return result.recordset[0];

    } catch {
      throw new InternalServerErrorException();
    }
  }
}