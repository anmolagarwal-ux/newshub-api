import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../Database/database.service';
import { CustomResponse, DBCustomResponse } from 'src/Modal/CustomResponse.dto';
import { CreateArticleDTO, UpdateArticleDTO } from './dto/publishArticle.dto';

@Injectable()
export class PublishArticleRepository {

    constructor(
        private readonly dbService: DatabaseService
    ) { }



    async Create(dto: CreateArticleDTO): Promise<DBCustomResponse> {

        const res = new DBCustomResponse();

        const pool = this.dbService.getPool();

        try {

            const result = await pool.request()

                .input('title', dto.title)
                .input('slug', dto.slug)
                .input('short_description', dto.short_description)
                .input('content', dto.content)
                .input('featured_image', dto.featured_image)
                .input('category_id', dto.category_id)
                .input('author_id', dto.author_id)
                .input('status_id', dto.status_id)
                .input('is_featured', dto.is_featured)
                .input('is_breaking', dto.is_breaking)
                .input('is_draft', dto.is_draft)

                .execute('sp_PublishArticle_Create');


            result.recordset.map(data => {
                res.isSuccess = data.isSuccess;
                res.message = data.message;
            })


            return res;


        } catch (e) {

            console.log(e);
            return res;

        }

    }

    async GetAll(pageNumber: number, pageSize: number, status_id: number, category_id: number, search: string | '', userId: number): Promise<CustomResponse<any>> {

        const res = new CustomResponse<any>();

        const pool = this.dbService.getPool();

        try {

            const result = await pool.request()
                .input('pageNumber', pageNumber)
                .input('pageSize', pageSize)
                .input('status_id', status_id)
                .input('category_id', category_id)
                .input('search', search)
                .input('user_Id', userId)
                .execute('sp_PublishArticle_GetAll');
            res.response = result.recordset;
            res.isSuccess = true;
            res.statusCode = 200;
            res.message = 'Successful';


            return res;


        } catch (e) {

            console.log(e);
            return res;

        }

    }

    async GetById(id: number): Promise<CustomResponse<any>> {

        const res = new CustomResponse<any>();
        const pool = this.dbService.getPool();

        try {

            const result = await pool.request()
                .input('id', id)
                .execute('sp_PublishArticle_GetById');


            res.response = result.recordset[0];
            res.isSuccess = true;
            res.statusCode = 200;
            res.message = 'Successful';

            return res;


        } catch (e) {

            console.log(e);
            return res;

        }

    }

    async Update(dto: UpdateArticleDTO): Promise<DBCustomResponse> {

        const res = new DBCustomResponse();

        const pool = this.dbService.getPool();


        try {

            const result = await pool.request()

                .input('id', dto.id)
                .input('title', dto.title)
                .input('slug', dto.slug)
                .input('short_description', dto.short_description)
                .input('content', dto.content)
                .input('featured_image', dto.featured_image)
                .input('category_id', dto.category_id)
                .input('status_id', dto.status_id)
                .input('is_featured', dto.is_featured)
                .input('is_breaking', dto.is_breaking)
                .input('is_draft', dto.is_draft)

                .execute('sp_PublishArticle_Update');


            result.recordset.map(data => {
                res.isSuccess = data.isSuccess;
                res.message = data.message;
            })


            return res;


        } catch (e) {

            console.log(e);
            return res;

        }

    }





    async Delete(id: number): Promise<DBCustomResponse> {

        const res = new DBCustomResponse();

        const pool = this.dbService.getPool();

        try {

            const result = await pool.request()
                .input('id', id)
                .execute('sp_PublishArticle_Delete');


            result.recordset.map(data => {
                res.isSuccess = data.isSuccess;
                res.message = data.message;
            })


            return res;


        } catch (e) {

            console.log(e);
            return res;

        }

    }

}