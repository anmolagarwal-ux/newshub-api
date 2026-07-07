import { Injectable } from '@nestjs/common';
import { CustomResponse } from '../modal/CustomResponse.dto';
import { CreateRoleDTO, GetAllRole } from './dto/role.dto';
import { RoleRepository } from './role.repository';


@Injectable()
export class RoleService {constructor(private readonly repo: RoleRepository) {}


    async Create(dto: CreateRoleDTO): Promise<CustomResponse<any>>{

        const response = new CustomResponse<any>();
        const repoRes = await this.repo.Create(dto)

        if(!repoRes.isSuccess){
            response.isSuccess = false;
            response.message = 'Data not saved';
            response.statusCode = 400;
            response.response = "";
        }
        else{
            
            response.isSuccess = true;
            response.message = 'Successfull created a record';
            response.statusCode = 201;
            response.response = 'Created';
        }
        return response
    }

    async GetAll(): Promise<CustomResponse<GetAllRole>>{

        const response = new CustomResponse<GetAllRole>();
        const repoRes = await this.repo.GetAll()

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

    async GetById(id: number): Promise<CustomResponse<GetAllRole>>{

        const response = new CustomResponse<GetAllRole>();
        const repoRes = await this.repo.GetById(id)

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