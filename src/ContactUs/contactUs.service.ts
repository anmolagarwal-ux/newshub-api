import { Injectable } from '@nestjs/common';
import { CreateContactUsDTO, GetAllContactUs } from './dto/contactUs.Dto';
import { ContantUsRepository } from './contactUs.repository';
import { ActivityLogService } from '../ActivityLog/activityLog.service';
import { CustomResponse } from '../modal/CustomResponse.dto';

@Injectable()
export class ContactUsService {
    constructor(private readonly repo: ContantUsRepository, 
    private readonly activityLogService: ActivityLogService) {}


    async Create(dto: CreateContactUsDTO): Promise<CustomResponse<any>>{

        const response = new CustomResponse<any>();
        const repoRes = await this.repo.Create(dto);


        if(!repoRes.isSuccess){
            response.isSuccess = false;
            response.message = 'Data not saved';
            response.statusCode = 400;
            response.response = "";
        }
        else{
            await this.activityLogService.CreateActivityLog(1,'CREATE', 'ContactUs', `Created contact request from ${dto.email}`);
            response.isSuccess = true;
            response.message = 'Successfull created a record';
            response.statusCode = 201;
            response.response = 'Created';
        }
        return response
    }

    async GetAll(pageNumber: number, pageSize: number): Promise<CustomResponse<GetAllContactUs>>{

        const response = new CustomResponse<GetAllContactUs>();
        const repoRes = await this.repo.GetAll(pageNumber, pageSize);

        if(!repoRes.isSuccess){
            response.isSuccess = false;
            response.message = 'Data fetch failed';
            response.statusCode = 400;
        }
        else{
            await this.activityLogService.CreateActivityLog(1,'Fetch', 'ContactUs', `Fetch contact request`);

            response.isSuccess = true;
            response.message = 'Successfull created a record';
            response.statusCode = 201;
            response.response = repoRes.response;
        }
        return response
    }

    async GetById(id: number): Promise<CustomResponse<GetAllContactUs>>{

        const response = new CustomResponse<GetAllContactUs>();
        const repoRes = await this.repo.GetById(id)

        if(!repoRes.isSuccess){
            response.isSuccess = false;
            response.message = 'Data fetch failed';
            response.statusCode = 400;
        }
        else{
            await this.activityLogService.CreateActivityLog(1,'Fetch', 'ContactUs', `Fetch contact request`);
            response.isSuccess = true;
            response.message = 'Successfull created a record';
            response.statusCode = 201;
            response.response = repoRes.response;
        }
        return response
    }

}