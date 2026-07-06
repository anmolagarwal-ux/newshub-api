import { Injectable } from '@nestjs/common';
import { CustomResponse } from 'src/modal/CustomResponse.dto';
import { GetAllDashboard } from './dto/dashboard.dto';
import { DashboardRepository } from './dashboard.repository';


@Injectable()
export class DashboardService {constructor(private readonly repo: DashboardRepository) {}

    async GetAllCategoryDetail(): Promise<CustomResponse<GetAllDashboard>>{

        const response = new CustomResponse<GetAllDashboard>();
        const repoRes = await this.repo.GetAllCategoryDetail()

        if(!repoRes.isSuccess){
            response.isSuccess = false;
            response.message = 'Data fetch failed';
            response.statusCode = 400;
        }
        else{
            
            response.isSuccess = true;
            response.message = 'Successfull created a record';
            response.statusCode = 201;
            response.response = repoRes.response;
        }
        return response
    }

    async GetAllStatusDetail(): Promise<CustomResponse<GetAllDashboard>>{

        const response = new CustomResponse<GetAllDashboard>();
        const repoRes = await this.repo.GetAllStatusDetail()

        if(!repoRes.isSuccess){
            response.isSuccess = false;
            response.message = 'Data fetch failed';
            response.statusCode = 400;
        }
        else{
            
            response.isSuccess = true;
            response.message = 'Successfull created a record';
            response.statusCode = 201;
            response.response = repoRes.response;
        }
        return response
    }


}