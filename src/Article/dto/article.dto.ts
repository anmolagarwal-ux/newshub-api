import { Type } from 'class-transformer';
import {
    IsInt,
    IsOptional,
    IsString
} from 'class-validator';

export class ArticleQueryDto {

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    pageSize?: number;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    categoryId?: number;

}

export class ArticleBySlugDto {

    @IsString()
    slug!: string;

}

export class BreakingArticleDto {

    id?: number;
    title?: string;
    slug?: string;
    short_description?: string;
    featured_image?: string;
    category_name?: string;
    created_at?: Date;

}

export class FeaturedArticleDto {

    id?: number;
    title?: string;
    slug?: string;
    short_description?: string;
    featured_image?: string;
    category_name?: string;
    created_at?: Date;

}

export class TopArticleDto {

    id?: number;
    title?: string;
    slug?: string;
    featured_image?: string;
    category_name?: string;

}

export class ArticleListDto {

    id?: number;
    title?: string;
    slug?: string;
    short_description?: string;
    featured_image?: string;
    category_id?: number;
    category_name?: string;
    status_id?: number;
    status_name?: string;
    created_at?: Date;
    total_records?: number;
}

export class ArticleDetailDto {

    id?: number;
    title?: string;
    slug?: string;
    short_description?: string;
    content?: string;
    featured_image?: string;
    category_id?: number;
    category_name?: string;
    status_id?: number;
    status_name?: string;
    is_featured?: boolean;
    is_breaking?: boolean;
    is_draft?: boolean;
    created_at?: Date;
    updated_at?: Date;

}

