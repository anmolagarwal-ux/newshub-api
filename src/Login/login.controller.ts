import {
 Controller,
 Post,
 Body
} from '@nestjs/common';

import { LoginService } from './login.service';
import { loginRequest } from './dto/login.dto';
import { Message } from '../decorator/message.decorator';

@Controller('login')
export class LoginController {
    constructor(private readonly service:LoginService){}

    @Message('login.Login_Success')
    @Post()async login(@Body() dto: loginRequest){
        
        return this.service.login(dto);
    }

}