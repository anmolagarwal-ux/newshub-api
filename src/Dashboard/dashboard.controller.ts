import {
 Controller,
 Get,
 UseGuards
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('Dashboard')
export class DashboardController {
    constructor(private readonly service: DashboardService){}

    @Get('Category')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async GetAllCategoryDetail(){
        return this.service.GetAllCategoryDetail();
    }

    @Get('Status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async GetAllStatusDetail(){
        return this.service.GetAllStatusDetail();
    }

}