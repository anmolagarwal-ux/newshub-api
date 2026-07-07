import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';

import { PublishArticleService } from './publishArticle.service';
import {
  CreateArticleDTO,
  UpdateArticleDTO,
} from './dto/publishArticle.dto';

import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


@ApiTags('PublishArticle')
@Controller('publish-article')
export class PublishArticleController {

  constructor(
    private readonly service: PublishArticleService,
  ) { }


  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination:
          'C:/Users/user/Desktop/Website/news-hub/public/Images',

        filename: (req, file, cb) => {

          const fileName =
            Date.now() +
            '-' +
            Math.round(Math.random() * 1e9) +
            extname(file.originalname);

          cb(null, fileName);
        },
      }),
    }),
  )
  async Create(
    @UploadedFile() file: any,
    @Body() dto: CreateArticleDTO,
    @Req() req: any,
  ) {

    dto.author_id = req.user.Id;

    if (file) {
      dto.featured_image =
        `./Images/${file.filename}`;
    }


    if (!dto.title) {
      throw new BadRequestException(
        'publish-article.Title_Required'
      );
    }

    if (!dto.category_id) {
      throw new BadRequestException(
        'publish-article.Category_Required'
      );
    }


    return this.service.Create(dto);
  }



  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async GetAll(

    @Query('pageNumber') pageNumber: number = 1,

    @Query('pageSize') pageSize: number = 10,

    @Query('status_id') status_id: number = 0,

    @Query('category_id') category_id: number = 0,

    @Query('search') search: string = '',

    @Req() req: any,

  ) {


    const userId = req.user.Id;


    return this.service.GetAll(
      pageNumber,
      pageSize,
      status_id,
      category_id,
      search,
      userId,
    );

  }



  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async GetById(
    @Param('id', ParseIntPipe) id: number,
  ) {

    return this.service.GetById(id);

  }



  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async Update(

    @Param('id', ParseIntPipe) id: number,

    @Body() dto: UpdateArticleDTO,

  ) {

    dto.id = id;

    return this.service.Update(dto);

  }



  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async Delete(

    @Param('id', ParseIntPipe) id: number,

  ) {

    return this.service.Delete(id);

  }

}