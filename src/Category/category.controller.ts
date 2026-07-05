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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategory, UpdateCategory } from './dto/category.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Category')
@Controller('Category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  getAll() {
    return this.service.GetAll();
  }

  @Get(':id') 
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a category by id' })
  getCategoryId(@Param('id', ParseIntPipe) id: number,
) {
    return this.service.GetById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a category' })
  create(@Body() createDto: CreateCategory, @Req() req: Request) {
    try{

        const request = req as any;
        createDto.created_by = request.user.user_id;

        if (!createDto.category_name) {
            return { error: 'Category name is required' };
        }
        else if (!createDto.created_by) {
            return { error: 'Created by is required' };
        }
        else if (typeof createDto.category_description !== 'string') {
            return { error: 'Category description must be a string' };
        }
        else if (typeof createDto.category_slug !== 'string') {
            return { error: 'Category slug must be a string' };
        }
        else{
            return this.service.Create(createDto);
        }
    }
    catch (error) {
        return { error: 'An error occurred while creating the category' };
        }
    }

  @Put(':id')
  @ApiOperation({ summary: 'Update a category by id' })
  update(@Param('id', ParseIntPipe) id: number,@Body() updateDto: UpdateCategory){
  updateDto.id = id;
    try{
        if (!updateDto.category_name) {
            return { error: 'Category name is required' };
        }
        else if (typeof updateDto.category_description !== 'string') {
            return { error: 'Category description must be a string' };
        }
        else if (typeof updateDto.category_slug !== 'string') {
            return { error: 'Category slug must be a string' };
        }
        else{
            return this.service.Update(updateDto);
        }
    }
    catch (error) {
        return { error: 'An error occurred while updating the category' };
        }
    }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by id' })
  delete(@Param('id', ParseIntPipe) id: number) {
    try{
        if (!id) {
            return { error: 'Category id is required' }
        }
        else{
            return this.service.Delete(id);
        }
    }
    catch (error) {
        return { error: 'An error occurred while deleting the category' };
        }
    }
}
