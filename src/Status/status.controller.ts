import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StatusService } from './status.service';

@ApiTags('Status')
@Controller('status')
export class StatusController {

    constructor(
        private readonly service: StatusService
    ) {}


    @Get()
    async GetAll(){

        return this.service.GetAll();

    }
}