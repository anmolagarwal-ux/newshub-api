import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PublishArticleRepository } from './publishArticle.repository';
import {
  CreateArticleDTO,
  UpdateArticleDTO,
} from './dto/publishArticle.dto';

@Injectable()
export class PublishArticleService {

  constructor(
    private readonly repo: PublishArticleRepository,
  ) {}


  async Create(dto: CreateArticleDTO) {

    const response = await this.repo.Create(dto);

    if (!response.isSuccess) {
      throw new BadRequestException(
        'publish-article.Create_Failed'
      );
    }

    response.message = 'publish-article.Created';

    return response;
  }


  async GetAll(
    pageNumber: number,
    pageSize: number,
    status_id: number,
    category_id: number,
    search: string = '',
    userId: number,
  ) {

    const response = await this.repo.GetAll(
      pageNumber,
      pageSize,
      status_id,
      category_id,
      search,
      userId,
    );

    if (!response.isSuccess) {
      throw new BadRequestException(
        'publish-article.List_Failed'
      );
    }

    response.message = 'publish-article.List_Success';

    return response;
  }


  async GetById(id: number) {

    const response = await this.repo.GetById(id);

    if (!response.isSuccess || !response.response) {
      throw new NotFoundException(
        'publish-article.Not_Found'
      );
    }

    response.message = 'publish-article.Found';

    return response;
  }


  async Update(dto: UpdateArticleDTO) {

    const response = await this.repo.Update(dto);

    if (!response.isSuccess) {
      throw new BadRequestException(
        'publish-article.Update_Failed'
      );
    }

    response.message = 'publish-article.Updated';

    return response;
  }


  async Delete(id: number) {

    const response = await this.repo.Delete(id);

    if (!response.isSuccess) {
      throw new BadRequestException(
        'publish-article.Delete_Failed'
      );
    }

    response.message = 'publish-article.Deleted';

    return response;
  }

}