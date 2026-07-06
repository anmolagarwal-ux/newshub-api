import { Injectable } from '@nestjs/common';
import { loginRepository } from './login.respository';
import { AuthService } from 'auth/auth.service';
import { CustomResponse } from 'src/modal/CustomResponse.dto';
import { loginRequest } from './dto/login.dto';
import { ActivityLogService } from 'src/ActivityLog/activityLog.service';

@Injectable()
export class LoginService {
    constructor(
    private readonly loginRepo:loginRepository,
    private readonly authService: AuthService,
    private readonly activityLogService: ActivityLogService) {}


    async login(login: loginRequest): Promise<CustomResponse<any>>{

        const userData = await this.loginRepo.login(login)
        const response = new CustomResponse<any>();

        if(!userData.email){
            response.isSuccess = false;
            response.message = 'Invalid User';
            response.statusCode = 400;
            response.response = userData;
        }
        else{
            const isSucess = await this.authService.validatePassword(login.password, userData.password);
            if(isSucess)
                {
                    const token =  await this.authService.login(userData.fullName,userData.roleName,userData.id)
                    await this.activityLogService.CreateActivityLog(1,'Login', 'LoginModule', `Login request from ${login.email}`);

                    response.isSuccess = true;
                    response.message = 'Login Successful';
                    response.statusCode = 200;
                    response.response = token;
                }
            else{
                return response
            } 
        } 
    return response;
    }

}