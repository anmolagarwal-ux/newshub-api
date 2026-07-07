import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

import { ActivityLogService } from './activityLog.service';
import { Message } from '../decorator/message.decorator';

@Controller('activity-log')
export class ActivityLogController {
  constructor(private readonly service: ActivityLogService) {}

  @Get()
  @Message('activity.Activity_Log_List_Success')
  @ApiQuery({
    name: 'pageNumber',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    example: 10,
  })
  async GetAll(
    @Query('pageNumber') pageNumber = 1,
    @Query('pageSize') pageSize = 10,
  ) {
    return this.service.GetAll(pageNumber, pageSize);
  }
}