import { Injectable } from '@nestjs/common';
import { CustomResponse } from 'src/Modal/CustomResponse.dto';
import { CreateCategory, UpdateCategory } from './dto/category.dto';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
constructor(private readonly repo: CategoryRepository) {}
  async GetAll(): Promise<CustomResponse<any>> {
    return await this.repo.GetAll();
  }

  async GetById(id:number): Promise<CustomResponse<any>> {
    return await this.repo.GetById(id);
  }

  async Create(dto:CreateCategory): Promise<CustomResponse<any>> {

    const response = new CustomResponse<any>();
    const repoRes = await this.repo.Create(dto);

    if(repoRes.isSuccess){
      response.isSuccess = true;
      response.message = "Category created";
      response.statusCode = 201;
      response.response = repoRes.message;

    }
    else {
      response.isSuccess = false;
      response.message = repoRes.message;
      response.statusCode = 400;
      response.response = repoRes.message;
    }
    return response;
  }

  async Update(dto:UpdateCategory): Promise<CustomResponse<any>> {

    const response = new CustomResponse<any>();
    const repoRes = await this.repo.Update(dto);

    if(repoRes.isSuccess){
      response.isSuccess = true;
      response.message = "Category updated";
      response.statusCode = 200;
      response.response = repoRes.message;
    }
    else {
      response.isSuccess = false;
      response.message = repoRes.message;
      response.statusCode = 400;
      response.response = repoRes.message;
    }
    return response;
  }

  async Delete(id:number): Promise<CustomResponse<any>> {

    const response = new CustomResponse<any>();
    const repoRes = await this.repo.Delete(id);

    if(repoRes.isSuccess){
      response.isSuccess = true;
      response.message = "Category deleted";
      response.statusCode = 201;
      response.response = repoRes.message;
    }
    else {
      response.isSuccess = false;
      response.message = repoRes.message;
      response.statusCode = 400;
      response.response = repoRes.message;
    }
    return response;
  }
}