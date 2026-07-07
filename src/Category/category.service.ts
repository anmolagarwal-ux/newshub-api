import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CustomResponse } from 'src/modal/CustomResponse.dto';
import { CreateCategory, UpdateCategory } from './dto/category.dto';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly repo: CategoryRepository) {}

  async GetAll(){
    return this.repo.GetAll();
  }

  async GetById(id: number){
    const response = await this.repo.GetById(id);

    if (!response.isSuccess) {
      throw new NotFoundException('category.Not_Found');
    }

    return response;
  }

  async Create(dto: CreateCategory){
    const response = await this.repo.Create(dto);

    if (!response.isSuccess) {
      throw new BadRequestException('category.Create_Failed');
    }

    response.message = 'category.Created';

    return response;
  }

  async Update(dto: UpdateCategory){
    const response = await this.repo.Update(dto);

    if (!response.isSuccess) {
      throw new BadRequestException('category.Update_Failed');
    }

    response.message = 'category.Updated';

    return response;
  }

  async Delete(id: number){
    const response = await this.repo.Delete(id);

    if (!response.isSuccess) {
      throw new BadRequestException('category.Delete_Failed');
    }

    response.message = 'category.Deleted';

    return response;
  }
}