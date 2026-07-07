import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { Message } from '../decorator/message.decorator';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RoleService } from './role.service';
import { CreateRoleDTO } from './dto/role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @Message('role.Role_Created')
  async Create(
    @Body() dto: CreateRoleDTO,
    @Req() req: Request,
  ) {
    const request = req as any;

    dto.user_id = request.user.Id;

    return this.service.Create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @Message('role.Role_List_Success')
  async GetAll() {
    return this.service.GetAll();
  }

  @Get(':id')
  @Message('role.Role_Detail_Success')
  @ApiOperation({ summary: 'Get a Role by id' })
  async GetById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.GetById(id);
  }
}