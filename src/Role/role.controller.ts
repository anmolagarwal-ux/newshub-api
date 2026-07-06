import {
 Controller,
 Post,
 Body,
 Get,
 Param,
 ParseIntPipe,
 UseGuards,
 Req
} from '@nestjs/common';
import { CustomResponse } from 'src/modal/CustomResponse.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDTO } from './dto/role.dto';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';


@Controller('Role')
export class RoleController {
    constructor(private readonly service: RoleService){}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post()async Create(
        @Body()dto: CreateRoleDTO,
        @Req() req: Request){
        
        const request = req as any;
        const response = new CustomResponse<any>();
        
        dto.user_id = request.user.Id

        response.isSuccess = false;
        response.response = {};
        response.statusCode = 400;
        
        try{
        if (dto.role_name == '') {
            response.message = 'name is required';
            return response;
        }
        else{
            return this.service.Create(dto);
        }
    }
    catch(ex){

    }
        
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async GetAll(){
        
        return this.service.GetAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a Role by id' })
    getById(@Param('id', ParseIntPipe) id: number){
        return this.service.GetById(id);
    }

}