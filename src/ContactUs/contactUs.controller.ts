import {
 Controller,
 Post,
 Body,
 Get,
 Param,
 ParseIntPipe,
 Query
} from '@nestjs/common';
import { CreateContactUsDTO } from './dto/contactUs.Dto';
import { ContactUsService } from './contactUs.service';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CustomResponse } from '../modal/CustomResponse.dto';


@Controller('contact-us')
export class ContactUsController {
    constructor(private readonly service: ContactUsService){}


    @Post() async Create(@Body() dto: CreateContactUsDTO) {
        const response = new CustomResponse<any>();
        response.isSuccess = false;
        response.response = {};
        response.statusCode = 400;
        try {
            if (dto.name == '') {
                response.message = 'name is required';
                return response;
            }
            else if (dto.email == '') {
                response.message = 'email is required';
                return response;
            }
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dto.email)) {
                response.message = 'invalid email format';
                return response;
            }
            else if (dto.body == '') {
                response.message = 'body is required';
                return response;
            }
            else if (dto.subject == '') {
                response.message = 'subject is required';
                return response;
            }
            else {
                return this.service.Create(dto);
            }
        }
        catch (ex) {
        }
        return response;

    }

    @Get()
        @ApiQuery({
            name: 'pageNumber',
            required: false,
            example: 1
        })
        @ApiQuery({
            name: 'pageSize',
            required: false,
            example: 10
        })
        async GetAll(
            @Query('pageNumber') pageNumber: number = 1,
            @Query('pageSize') pageSize: number = 10
        ){
        return this.service.GetAll(pageNumber, pageSize);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a contactus by id' })
    getById(@Param('id', ParseIntPipe) id: number){
        return this.service.GetById(id);
    }

}