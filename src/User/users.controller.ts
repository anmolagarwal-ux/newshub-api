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
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    GetAll() {
    return this.service.GetAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a user by id' })
    GetById(@Param('id', ParseIntPipe) id: number) {
    return this.service.GetUserById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a user' })
    Create(@Body() createDto: CreateUserDto) {
    return this.service.Create(createDto as any);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a user by id' })
    Update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateUserDto,
    ) {
        updateDto.id = id;
    return this.service.Update(updateDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user by id (soft delete)' })
    Delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.Delete(id);
    }
}
