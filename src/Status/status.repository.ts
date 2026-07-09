import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DatabaseService } from '../../database/database.service';

@Injectable()
export class StatusRepository {
  constructor(
    private readonly dbService: DatabaseService,
  ) {}

  async GetAll() {
    try {
      const pool = this.dbService.getPool();

      const result = await pool
        .request()
        .execute('sp_Status_GetAll');

      return result.recordset;
    } catch {
      throw new NotFoundException('status.Database_Error');
    }
  }
}