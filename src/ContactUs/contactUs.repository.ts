import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../Database/database.service';
import { CreateContactUsDTO, GetAllContactUs } from './dto/contactUs.Dto';
import { CustomResponse, DBCustomResponse } from 'src/Modal/CustomResponse.dto';

@Injectable()
export class ContantUsRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async Create(dto: CreateContactUsDTO): Promise<DBCustomResponse> {

    const res = new DBCustomResponse();
    const pool = this.dbService.getPool();
    try{
        const result = await pool
            .request()
            .input('name', dto.name)
            .input('email', dto.email)
            .input('subject', dto.subject)
            .input('message', dto.body)
            .execute('sp_ContactUs_Create');
        result.recordset.map((data) => {
        res.isSuccess = data.isSuccess;
        res.message = data.message;
      });
      return res;
    }
    catch (exception) {
      console.log(exception)
        return res;
    }
  }

  async GetAll(pageNumber, pageSize): Promise<CustomResponse<GetAllContactUs>> {

    const res = new CustomResponse<GetAllContactUs>();
    const pool = this.dbService.getPool();
    try{
        const result = await pool.request()
        .input('pageNumber',pageNumber).input('pageSize',pageSize)
        .execute('sp_ContactUs_GetAll');
        res.response = result.recordset;
      res.isSuccess = true;
      res.statusCode = 200;
      res.message = 'Successful';
      return res;
    }
    catch (exception) {
      console.log(exception)
      return res;
    }
  }

  async GetById(id: number): Promise<CustomResponse<GetAllContactUs>> {

    const res = new CustomResponse<GetAllContactUs>();
    const pool = this.dbService.getPool();
    try{
        const result = await pool.request().input('id', id).execute('sp_ContactUs_GetById');
        res.response = result.recordset[0];
        res.isSuccess = true;
        res.statusCode = 200;
        res.message = 'Successful';
        return res;
    }
    catch (exception) {
      console.log(exception)
      return res;
    }
  }

}