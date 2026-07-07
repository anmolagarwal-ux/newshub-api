import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CustomResponse, DBCustomResponse } from '../modal/CustomResponse.dto';
import { CreateRoleDTO, GetAllRole } from './dto/role.dto';

@Injectable()
export class RoleRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async Create(dto: CreateRoleDTO): Promise<DBCustomResponse> {

    const res = new DBCustomResponse();
    const pool = this.dbService.getPool();
    try{
        const result = await pool
            .request()
            .input('name', dto.role_name)
            .input('user_id', dto.user_id)
            .execute('sp_Role_Create');
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

  async GetAll(): Promise<CustomResponse<GetAllRole>> {

    const res = new CustomResponse<GetAllRole>();
    const pool = this.dbService.getPool();
    try{
        const result = await pool.request().execute('sp_Role_GetAll');
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

  async GetById(id: number): Promise<CustomResponse<GetAllRole>> {

    const res = new CustomResponse<GetAllRole>();
    const pool = this.dbService.getPool();
    try{
        const result = await pool.request().input('id', id).execute('sp_Role_GetById');
        res.response = result.recordset[0];
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