import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateCategory, UpdateCategory } from './dto/category.dto';
import { CustomResponse, DBCustomResponse } from 'src/modal/CustomResponse.dto';

@Injectable()
export class CategoryRepository {

  constructor(private readonly dbService: DatabaseService) {}

    async GetAll(): Promise<CustomResponse<any>> {

        const res = new CustomResponse();
        const pool = this.dbService.getPool();

        try {
            const result = await pool.request().execute('sp_Category_GetAll');

            res.isSuccess = true;
            res.message = "Category list fetched successfully";
            res.response = result.recordset;
            res.statusCode = 200;

            return res;
        } 
        catch (exception) {

            res.statusCode = 400;
            res.isSuccess = false;
            res.message = "An error occurred while fetching categories";

            return res;
        }
    }

    async GetById(id: number): Promise<CustomResponse<any>> {

        const res = new CustomResponse();
        const pool = this.dbService.getPool();

        try {

            const result = await pool
            .request()
            .input('category_id', id)
            .execute('sp_Category_GetById');


            res.isSuccess = result.recordset.length > 0;
            res.message = result.recordset.length > 0 ? "Category found" : "Category not found";
            res.response = result.recordset[0];
            res.statusCode = 200;

            return res;

        } catch(exception) {

            res.isSuccess = false;
            res.message = "Error while fetching category";
            res.statusCode = 400;

            return res;
        }
    }

    async Create(dto: CreateCategory): Promise<DBCustomResponse> {

        const res = new DBCustomResponse();
        const pool = this.dbService.getPool();

        try {

            const result = await pool
            .request()
            .input('category_name', dto.category_name)
            .input('category_description', dto.category_description)
            .input('category_slug', dto.category_slug)
            .input('created_by', dto.created_by)
            .execute('sp_Category_Create');


            result.recordset.map((data) => {
            res.isSuccess = data.isSuccess;
            res.message = data.message;
            });


            return res;

        } catch(exception) {

            res.isSuccess = false;
            res.message = "An error occurred while creating category";

            return res;
        }
    }

    async Update(dto: UpdateCategory): Promise<DBCustomResponse> {

        const res = new DBCustomResponse();
        const pool = this.dbService.getPool();

        try {

            const result = await pool
            .request()
            .input('category_name', dto.category_name)
            .input('category_description', dto.category_description)
            .input('category_slug', dto.category_slug)
            .input('category_id', dto.id)
            .execute('sp_Category_Update');

            result.recordset.map((data) => {
            res.isSuccess = data.isSuccess;
            res.message = data.message;
            });

            return res;

        } catch(exception) {

            res.isSuccess = false;
            res.message = "An error occurred while updating category";

            return res;
        }
    }

    async Delete(id:number): Promise<DBCustomResponse> {

        const res = new DBCustomResponse();
        const pool = this.dbService.getPool();
        try {

            const result = await pool.request().input('category_id', id).execute('sp_Category_Delete');

            result.recordset.map((data) => {
                res.isSuccess = data.isSuccess;
                res.message = data.message;
            });
            return res;

        } catch(exception) {

            res.isSuccess = false;
            res.message = "An error occurred while deleting category";

            return res;
        }
    }

}