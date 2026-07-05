import {
 Controller,
 Post,
 Body
} from '@nestjs/common';

import { LoginService } from './login.service';
import { loginRequest } from './dto/login.dto';

@Controller('login')
export class LoginController {
    constructor(private readonly service:LoginService){}

    @Post()async login(@Body() dto: loginRequest){
        
        return this.service.login(dto);
    }

}