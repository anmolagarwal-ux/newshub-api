import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { DatabaseService } from '../../database/database.service';
import { ActivityLog } from './dto/activityLog.dto';

@Injectable()
export class ActivityLogRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async CreateActivityLog(dto: ActivityLog) {
    try {
      const pool = this.dbService.getPool();

      const result = await pool
        .request()
        .input('user_id', dto.user_id)
        .input('module_name', dto.module_name)
        .input('action_type', dto.action_type)
        .input('description', dto.description)
        .execute('SP_ActivityLog_Create');

      return result.recordset[0];
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async GetAll(pageNumber: number, pageSize: number) {
    try {
      const pool = this.dbService.getPool();

      const result = await pool
        .request()
        .input('pageNumber', pageNumber)
        .input('pageSize', pageSize)
        .execute('sp_ActivityLog_GetAll');

      return result.recordset;
    } catch {
      throw new InternalServerErrorException();
    }
  }
}