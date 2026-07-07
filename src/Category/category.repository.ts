import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { DatabaseService } from '../../database/database.service';
import { CreateCategory, UpdateCategory } from './dto/category.dto';

@Injectable()
export class CategoryRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async GetAll() {
    try {
      const pool = this.dbService.getPool();
      const result = await pool.request().execute('sp_Category_GetAll');

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
        .input('category_id', id)
        .execute('sp_Category_GetById');

      return result.recordset[0] ?? null;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async Create(dto: CreateCategory) {
    try {
      const pool = this.dbService.getPool();

      const result = await pool
        .request()
        .input('category_name', dto.category_name)
        .input('category_description', dto.category_description)
        .input('category_slug', dto.category_slug)
        .input('created_by', dto.created_by)
        .execute('sp_Category_Create');

      return result.recordset[0];
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async Update(dto: UpdateCategory) {
    try {
      const pool = this.dbService.getPool();

      const result = await pool
        .request()
        .input('category_id', dto.id)
        .input('category_name', dto.category_name)
        .input('category_description', dto.category_description)
        .input('category_slug', dto.category_slug)
        .execute('sp_Category_Update');

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
        .input('category_id', id)
        .execute('sp_Category_Delete');

      return result.recordset[0];
    } catch {
      throw new InternalServerErrorException();
    }
  }
}