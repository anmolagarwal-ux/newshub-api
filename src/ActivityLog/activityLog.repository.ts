import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CustomResponse, DBCustomResponse } from 'src/modal/CustomResponse.dto';
import { ActivityLog } from './dto/activityLog.dto';

@Injectable()
export class ActivityLogRepository {
  constructor(private readonly dbService: DatabaseService) { }

  async CreateActivityLog(dto: ActivityLog): Promise<DBCustomResponse> {
    const res = new DBCustomResponse();
    const pool = this.dbService.getPool();
    try {
      const result = await pool
        .request()
        .input('user_id', dto.user_id)
        .input('module_name', dto.module_name)
        .input('action_type', dto.action_type)
        .input('description', dto.description)
        .execute('SP_ActivityLog_Create');
      result.recordset.map((data) => {
        res.isSuccess = data.isSuccess;
        res.message = data.message;
      });
      return res;
    }
    catch (exception) {
      return res;
    }
  }

  async GetAll(pageNumber: number, pageSize: number): Promise<CustomResponse<ActivityLog>> {

    const res = new CustomResponse<ActivityLog>();
    const pool = this.dbService.getPool();
    try {
      const result = await pool.request()      
        .input('pageNumber',pageNumber).input('pageSize',pageSize)
        .execute('sp_ActivityLog_GetAll');
      res.response = result.recordset;
      res.isSuccess = true;
      res.statusCode = 200;
      res.message = 'Successful';
      return res;
    }
    catch (exception) {
      return res;
    }
  }

}