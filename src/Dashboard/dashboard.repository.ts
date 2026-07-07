import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { DatabaseService } from '../../database/database.service';

@Injectable()
export class DashboardRepository {
  constructor(
    private readonly dbService: DatabaseService,
  ) {}

  async GetAllCategoryDetail() {
    try {
      const pool = this.dbService.getPool();

      const result = await pool
        .request()
        .execute('sp_DashboardCategory_GetAll');

      return result.recordset;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async GetAllStatusDetail() {
    try {
      const pool = this.dbService.getPool();

      const result = await pool
        .request()
        .execute('sp_DashboardStatusArticle_GetAll');

      return result.recordset;
    } catch {
      throw new InternalServerErrorException();
    }
  }
}