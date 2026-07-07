import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth } from '@nestjs/swagger';

import { Message } from '../decorator/message.decorator';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly service: DashboardService,
  ) {}

  @Get('category')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Message('dashboard.Category_Detail_Success')
  async GetAllCategoryDetail() {
    return this.service.GetAllCategoryDetail();
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Message('dashboard.Status_Detail_Success')
  async GetAllStatusDetail() {
    return this.service.GetAllStatusDetail();
  }
}