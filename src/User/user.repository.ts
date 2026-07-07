import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CustomResponse, DBCustomResponse } from '../modal/CustomResponse.dto';
import { CreateUserDto, GetAllUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async Create(dto: CreateUserDto): Promise<DBCustomResponse> {

    const res = new DBCustomResponse();
    const pool = this.dbService.getPool();
    try{
        const result = await pool
            .request()
            .input('full_name', dto.full_name)
            .input('email', dto.email)
            .input('roleid', dto.role_id)
            .input('password', dto.password)
            .execute('sp_User_Create');
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

  async GetAll(): Promise<CustomResponse<GetAllUserDto>> {

    const res = new CustomResponse<GetAllUserDto>();
    const pool = this.dbService.getPool();
    try{
        const result = await pool.request().execute('sp_User_GetAll');
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

  async GetById(id: number): Promise<CustomResponse<GetAllUserDto>> {

    const res = new CustomResponse<GetAllUserDto>();
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

  async Update(dto: UpdateUserDto): Promise<DBCustomResponse> {

    const res = new DBCustomResponse();
    const pool = this.dbService.getPool();
    try{
        const result = await pool
            .request()
            .input('full_name', dto.full_name)
            .input('email', dto.email)
            .input('roleid', dto.role_id)
            .input('password', dto.password)
            .input('id', dto.id)
            .execute('sp_User_Update');
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

  async Delete(id: number): Promise<DBCustomResponse> {

    const res = new DBCustomResponse();
    const pool = this.dbService.getPool();
    try{
        const result = await pool
            .request()
            .input('id', id)
            .execute('sp_User_Delete');
        result.recordset.map((data) => {
        res.isSuccess = data.isSuccess;
        res.message = data.message;
      });
    }
    catch (exception) {
    }

    return res;
  }

}