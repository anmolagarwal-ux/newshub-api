import { Injectable } from '@nestjs/common';
import { CustomResponse } from 'src/modal/CustomResponse.dto';
import { StatusRepository } from './status.repository';

@Injectable()
export class StatusService {

    constructor(
        private readonly repo: StatusRepository
    ) {}


    async GetAll() {

        const response = new CustomResponse<any>();

        try {

            const result = await this.repo.GetAll();

            response.isSuccess = true;
            response.message = 'Status fetched successfully';
            response.statusCode = 200;
            response.response = result;

        }
        catch(error){

            response.isSuccess = false;
            response.message = 'Status fetch failed';
            response.statusCode = 400;
            response.response = error;

        }

        return response;
    }
}