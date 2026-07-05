import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';

import { DatabaseService } from '../../Database/database.service';
import {
    ArticleDetailDto,
    ArticleListDto,
    BreakingArticleDto,
    FeaturedArticleDto,
    TopArticleDto,
} from './dto/article.dto';

@Injectable()
export class ArticleRepository {

    constructor(
        private readonly db: DatabaseService,
    ) { }

    private getPool() {

        const pool = this.db.getPool();

        if (!pool) {
            throw new Error('Database pool not initialized');
        }

        return pool;

    }

    async getBreakingArticles(): Promise<BreakingArticleDto[]> {

        const pool = this.getPool();

        const result = await pool
            .request()
            .execute('sp_Article_GetBreakingNews');

        return result.recordset.map((row) => ({

            id: row.id,
            title: row.title,
            slug: row.slug,
            short_description: row.short_description,
            featured_image: row.featured_image,
            category_name: row.category_name,
            created_at: row.created_at,

        }));

    }

    async getFeaturedArticles(): Promise<FeaturedArticleDto[]> {

        const pool = this.getPool();

        const result = await pool
            .request()
            .execute('sp_Article_GetFeaturedNews');

        return result.recordset.map((row) => ({

            id: row.id,
            title: row.title,
            slug: row.slug,
            short_description: row.short_description,
            featured_image: row.featured_image,
            category_name: row.category,
            created_at: row.created_at,

        }));

    }

    async getTopArticles(): Promise<TopArticleDto[]> {

        const pool = this.getPool();

        const result = await pool
            .request()
            .execute('usp_GetTopTrendingArticlesByCategory');

        return result.recordset.map((row) => ({

            id: row.id,
            title: row.title,
            slug: row.slug,
            featured_image: row.featured_image,
            category_name: row.category_name,

        }));

    }

    async getArticles(
        page?: number,
        pageSize?: number,
        search?: string,
        categoryId?: number,
    ): Promise<ArticleListDto[]> {

        const pool = this.getPool();

        const result = await pool
            .request()
            .input('PageNumber', sql.Int, page ?? 1)
            .input('PageSize', sql.Int, pageSize ?? 10)
            .input('Search', sql.NVarChar, search ?? '')
            .input('CategoryId', sql.Int, categoryId ?? null)
            .execute('sp_GetArticlesPaged');
        return result.recordset.map((row) => ({

            id: row.id,
            title: row.title,
            slug: row.slug,
            short_description: row.short_description,
            featured_image: row.featured_image,
            category_id: row.category_id,
            category_name: row.category_name,
            status_id: row.status_id,
            status_name: row.status_name,
            created_at: row.created_at,
            total_records: row.total_records,


        }));

    }

    async getArticleBySlug(
        slug?: string,
    ): Promise<ArticleDetailDto> {

        const pool = this.getPool();

        const result = await pool
            .request()
            .input('Slug', sql.NVarChar, slug)
            .execute('sp_GetArticleBySlug');

        const row = result.recordset[0];

        return {

            id: row.id,
            title: row.title,
            slug: row.slug,
            short_description: row.short_description,
            content: row.content,
            featured_image: row.featured_image,
            category_id: row.category_id,
            category_name: row.category_name,
            status_id: row.status_id,
            status_name: row.status_name,
            is_featured: row.is_featured,
            is_breaking: row.is_breaking,
            is_draft: row.is_draft,
            created_at: row.created_at,
            updated_at: row.updated_at,

        };

    }

}