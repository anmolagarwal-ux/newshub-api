import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PublishArticleService } from './publishArticle.service';
import { CreateArticleDTO, UpdateArticleDTO } from './dto/publishArticle.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@ApiTags('PublishArticle')
@Controller('publish-article')
export class PublishArticleController {
    constructor(private readonly service: PublishArticleService) { }
    
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    Create(
        @Body() dto: CreateArticleDTO,
        @Req() req: Request
    ) {

        const request = req as any;
        dto.author_id = request.user.Id;

        return this.service.Create(dto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    GetAll(
    @Query('pageNumber') pageNumber: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('status_id') status_id: number,
    @Query('category_id') category_id: number,
    @Query('search') search: string = '',
    @Req() req: Request){

        const request = req as any;
        const userId = request.user.Id
        
        if(!status_id) {
            status_id = 0;
        }
        if(!category_id) {
            category_id = 0;
        }
        if(!search) {
            search = '';
        }
        return this.service.GetAll(pageNumber,pageSize,status_id,category_id,search,userId);   
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    GetById(
        @Param('id') id: number
    ) {
        return this.service.GetById(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    Update(
        @Param('id') id: number,
        @Body() dto: UpdateArticleDTO
    ) {
        dto.id = id;
        return this.service.Update(dto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    Delete(
        @Param('id') id: number
    ){
        return this.service.Delete(id);
    }

}