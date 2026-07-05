import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDTO {

    @ApiProperty()
    title!: string;

    @ApiProperty()
    slug!: string;

    @ApiProperty()
    short_description!: string;

    @ApiProperty()
    content!: string;

    @ApiProperty()
    featured_image!: string;

    @ApiProperty()
    category_id!: number;
    
    @ApiProperty()
    status_id!: number;
    
    @ApiProperty({ required: false })
    is_featured?: boolean;
    
    @ApiProperty({ required: false })
    is_breaking?: boolean;
    
    @ApiProperty({ required: false })
    is_draft?: boolean;
    
    author_id!: number;
}


export class UpdateArticleDTO extends CreateArticleDTO {
    id!: number;

}