import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CustomResponse } from 'src/modal/CustomResponse.dto';
import { GetAllDashboard } from './dto/dashboard.dto';


@Injectable()
export class DashboardRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async GetAllCategoryDetail(): Promise<CustomResponse<GetAllDashboard>> {

    const res = new CustomResponse<GetAllDashboard>();
    const pool = this.dbService.getPool();
    try{
        const result = await pool.request().execute('sp_DashboardCategory_GetAll');
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

  async GetAllStatusDetail(): Promise<CustomResponse<GetAllDashboard>> {

    const res = new CustomResponse<GetAllDashboard>();
    const pool = this.dbService.getPool();
    try{
        const result = await pool.request().execute('sp_DashboardStatusArticle_GetAll');
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