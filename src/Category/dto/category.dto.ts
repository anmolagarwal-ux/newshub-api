import {
    IsInt,
    IsOptional,
    IsString,
    MaxLength
} from 'class-validator';

export class CreateCategory {

    @IsOptional()
    @IsString()
    @MaxLength(200)
    category_name?: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    category_description?: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    category_slug?: string;

    @IsOptional()
    @IsInt()
    created_by?: number;

}

export class UpdateCategory {

    @IsOptional()
    @IsString()
    @MaxLength(200)
    category_name?: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    category_description?: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    category_slug?: string;

    
    id? : number;
}