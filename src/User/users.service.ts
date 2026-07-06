import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateUserDto, GetAllUserDto, UpdateUserDto } from './dto/user.dto';
import { CustomResponse } from 'src/modal/CustomResponse.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repo: UserRepository) {}
  
  async GetAll() {
    const response = new CustomResponse<GetAllUserDto>();
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

  async GetUserById(id: number) {
    const response = new CustomResponse<GetAllUserDto>();
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

  async Create(dto: CreateUserDto) {
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

  async Update(dto: UpdateUserDto) {
    const response = new CustomResponse<any>();
    const repoRes = await this.repo.Update(dto);
      if(!repoRes.isSuccess){
        response.isSuccess = false;
        response.message = 'Data not saved';
        response.statusCode = 400;
        response.response = "";
      }
      else{
        response.isSuccess = true;
        response.message = 'Successfull updated a record';
        response.statusCode = 201;
        response.response = 'Updated';
      }
    return response;
  }

  async Delete(id: number) {
    const response = new CustomResponse<any>();
    const repoRes = await this.repo.Delete(id);
      if(!repoRes.isSuccess){
        response.isSuccess = false;
        response.message = 'Data not saved';
        response.statusCode = 400;
        response.response = "";
      }
      else{
        response.isSuccess = true;
        response.message = 'Successfull deleted a record';
        response.statusCode = 201;
        response.response = 'Deleted';
      }
      return response;
    }
}