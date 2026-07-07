import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Message } from '../decorator/message.decorator';
import { StatusService } from './status.service';

@ApiTags('status')
@Controller('status')
export class StatusController {
  constructor(
    private readonly service: StatusService,
  ) {}

  @Get()
  @Message('status.Status_List_Success')
  async GetAll() {
    return this.service.GetAll();
  }
}