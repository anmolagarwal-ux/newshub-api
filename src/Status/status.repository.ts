import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'Database/database.service';
import { Status } from './dto/staus.dto';
import { CustomResponse } from 'src/Modal/CustomResponse.dto';
@Injectable()
export class StatusRepository {

    constructor(
        private readonly dbService: DatabaseService
    ) { }


    async GetAll() {
        const res = new CustomResponse<Status>();
        const pool = this.dbService.getPool();
        try {
            const result = await pool.request().execute('sp_Status_GetAll');
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
}