import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { Message } from '../decorator/message.decorator';
import { CategoryService } from './category.service';
import { CreateCategory, UpdateCategory } from './dto/category.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(
    private readonly service: CategoryService,
  ) {}


  @Get()
  @ApiOperation({
    summary: 'Get all categories',
  })
  @Message('category.List_Success')
  getAll() {
    return this.service.GetAll();
  }


  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get a category by id',
  })
  @Message('category.Detail_Success')
  getCategoryId(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.GetById(id);
  }


  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a category',
  })
  @Message('category.Created')
  create(
    @Body() createDto: CreateCategory,
    @Req() req: Request,
  ) {

    const request = req as any;

    createDto.created_by = request.user.user_id;

    if (!createDto.category_name) {
      throw new BadRequestException(
        'category.Name_Required',
      );
    }

    if (!createDto.created_by) {
      throw new BadRequestException(
        'category.Created_By_Required',
      );
    }

    if (
      typeof createDto.category_description !== 'string'
    ) {
      throw new BadRequestException(
        'category.Description_Invalid',
      );
    }

    if (
      typeof createDto.category_slug !== 'string'
    ) {
      throw new BadRequestException(
        'category.Slug_Invalid',
      );
    }

    return this.service.Create(createDto);
  }


  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a category by id',
  })
  @Message('category.Updated')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCategory,
  ) {

    updateDto.id = id;

    if (!updateDto.category_name) {
      throw new BadRequestException(
        'category.Name_Required',
      );
    }

    if (
      typeof updateDto.category_description !== 'string'
    ) {
      throw new BadRequestException(
        'category.Description_Invalid',
      );
    }

    if (
      typeof updateDto.category_slug !== 'string'
    ) {
      throw new BadRequestException(
        'category.Slug_Invalid',
      );
    }

    return this.service.Update(updateDto);
  }


  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a category by id',
  })
  @Message('category.Deleted')
  delete(
    @Param('id', ParseIntPipe) id: number,
  ) {

    if (!id) {
      throw new BadRequestException(
        'category.Id_Required',
      );
    }

    return this.service.Delete(id);
  }
}