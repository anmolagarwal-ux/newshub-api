import {
    Controller,
    Get,
    Query
} from '@nestjs/common';
import { ActivityLogService } from './activityLog.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('activity-log')
export class ActivityLogController {
    constructor(private readonly service: ActivityLogService) { }

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

}