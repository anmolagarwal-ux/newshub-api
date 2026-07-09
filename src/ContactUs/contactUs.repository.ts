import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DatabaseService } from '../../database/database.service';
import { CreateContactUsDTO } from './dto/contactUs.Dto';

@Injectable()
export class ContantUsRepository {
  constructor(
    private readonly dbService: DatabaseService,
  ) {}

  async Create(dto: CreateContactUsDTO) {
    try {
      const pool = this.dbService.getPool();

      const result = await pool
        .request()
        .input('name', dto.name)
        .input('email', dto.email)
        .input('subject', dto.subject)
        .input('message', dto.body)
        .execute('sp_ContactUs_Create');

      return result.recordset[0];
    } catch {
      throw new NotFoundException('contactus.Database_Error');
    }
  }

  async GetAll(pageNumber: number, pageSize: number) {
    try {
      const pool = this.dbService.getPool();

      const result = await pool
        .request()
        .input('pageNumber', pageNumber)
        .input('pageSize', pageSize)
        .execute('sp_ContactUs_GetAll');

      return result.recordset;
    } catch {
      throw new NotFoundException('contactus.Database_Error');
    }
  }

  async GetById(id: number) {
    try {
      const pool = this.dbService.getPool();

      const result = await pool
        .request()
        .input('id', id)
        .execute('sp_ContactUs_GetById');

      return result.recordset[0] ?? null;
    } catch {
      throw new NotFoundException('contactus.Database_Error');
    }
  }
}