import { Injectable } from '@nestjs/common';
import { PublishArticleRepository } from './publishArticle.repository';
import { CreateArticleDTO, UpdateArticleDTO } from './dto/publishArticle.dto';

@Injectable()
export class PublishArticleService {


    constructor(
        private readonly repo: PublishArticleRepository
    ) { }



    Create(dto: CreateArticleDTO) {
        return this.repo.Create(dto);
    }



    GetAll(pageNumber: number, pageSize: number, status_id: number, category_id: number, search: string | '', userId: number) {
        return this.repo.GetAll(pageNumber, pageSize, status_id, category_id, search, userId);
    }



    GetById(id: number) {
        return this.repo.GetById(id);
    }



    Update(dto: UpdateArticleDTO) {
        return this.repo.Update(dto);
    }



    Delete(id: number) {
        return this.repo.Delete(id);
    }



}