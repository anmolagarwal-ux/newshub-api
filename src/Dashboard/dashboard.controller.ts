import {
 Controller,
 Get,
 UseGuards
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly service: DashboardService){}

    @Get('category')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async GetAllCategoryDetail(){
        return this.service.GetAllCategoryDetail();
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async GetAllStatusDetail(){
        return this.service.GetAllStatusDetail();
    }

}