import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Query,
  BadRequestException,
} from '@nestjs/common';

import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Message } from '../decorator/message.decorator';
import { CreateContactUsDTO } from './dto/contactUs.Dto';
import { ContactUsService } from './contactUs.service';

@ApiTags('contact-us')
@Controller('contact-us')
export class ContactUsController {
  constructor(
    private readonly service: ContactUsService,
  ) {}

  @Post()
  @Message('contactUs.Contact_Created')
  async Create(
    @Body() dto: CreateContactUsDTO,
  ) {

    if (!dto.name) {
      throw new BadRequestException('contactUs.Name_Required');
    }

    if (!dto.email) {
      throw new BadRequestException('contactUs.Email_Required');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dto.email)) {
      throw new BadRequestException('contactUs.Invalid_Email');
    }

    if (!dto.body) {
      throw new BadRequestException('contactUs.Message_Required');
    }

    if (!dto.subject) {
      throw new BadRequestException('contactUs.Subject_Required');
    }

    return this.service.Create(dto);
  }


  @Get()
  @Message('contactUs.Contact_List_Success')
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
    @Query('pageNumber') pageNumber: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.service.GetAll(
      pageNumber,
      pageSize,
    );
  }


  @Get(':id')
  @Message('contactUs.Contact_Detail_Success')
  @ApiOperation({
    summary: 'Get a contact us by id',
  })
  async GetById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.GetById(id);
  }
}