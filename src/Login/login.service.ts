import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginRequest } from './dto/login.dto';
import { loginRepository } from './login.respository';
import { AuthService } from '../../auth/auth.service';
import { ActivityLogService } from '../ActivityLog/activityLog.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly loginRepo: loginRepository,
    private readonly authService: AuthService,
    private readonly activityLogService: ActivityLogService,
  ) {}

  async login(login: loginRequest) {
    const userData = await this.loginRepo.login(login);

    if (!userData?.email) {
      throw new UnauthorizedException('login.Invalid_User');
    }

    const isSuccess = await this.authService.validatePassword(
      login.password,
      userData.password,
    );

    if (!isSuccess) {
      throw new UnauthorizedException('login.Invalid_User');
    }

    const token = await this.authService.login(
      userData.fullName,
      userData.roleName,
      userData.id,
    );

    await this.activityLogService.CreateActivityLog(
      1,
      'Login',
      'LoginModule',
      `Login request from ${login.email}`,
    );

    return token;
  }
}