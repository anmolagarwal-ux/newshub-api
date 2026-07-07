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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { Message } from '../decorator/message.decorator';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

import {
  CreateUserDto,
  UpdateUserDto,
} from './dto/user.dto';

import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly service: UsersService,
  ) {}

  @Get()
  @Message('user.User_List_Success')
  @ApiOperation({ summary: 'Get all users' })
  GetAll() {
    return this.service.GetAll();
  }

  @Get(':id')
  @Message('user.User_Detail_Success')
  @ApiOperation({ summary: 'Get a user by id' })
  GetById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.GetUserById(id);
  }

  @Post()
  @Message('user.User_Created')
  @ApiOperation({ summary: 'Create a user' })
  Create(
    @Body() createDto: CreateUserDto,
  ) {
    return this.service.Create(createDto);
  }

  @Put(':id')
  @Message('user.User_Updated')
  @ApiOperation({ summary: 'Update a user by id' })
  Update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateUserDto,
  ) {
    updateDto.id = id;

    return this.service.Update(updateDto);
  }

  @Delete(':id')
  @Message('user.User_Deleted')
  @ApiOperation({ summary: 'Delete a user by id (soft delete)' })
  Delete(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.Delete(id);
  }
}