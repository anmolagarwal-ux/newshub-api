import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PublishArticleService } from './publishArticle.service';
import { CreateArticleDTO, UpdateArticleDTO } from './dto/publishArticle.dto';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import {
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('PublishArticle')
@Controller('publish-article')
export class PublishArticleController {
    constructor(private readonly service: PublishArticleService) { }
    


@Post()
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@UseInterceptors(
  FileInterceptor('image', {
    storage: diskStorage({
      destination:
        'C:/Users/user/Desktop/Website/news-hub/public/Images',
      filename: (req, file, cb) => {
        const uniqueName =
          Date.now() +
          '-' +
          Math.round(Math.random() * 1e9) +
          extname(file.originalname);

        cb(null, uniqueName);
      },
    }),
  }),
)
Create(
  @UploadedFile() file: any,
  @Body() dto: CreateArticleDTO,
  @Req() req: any,
) {
  dto.author_id = req.user.Id;

  if (file) {
    dto.featured_image = `./Images/${file.filename}`;
  }

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