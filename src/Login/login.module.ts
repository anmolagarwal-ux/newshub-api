import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { loginRepository } from './login.respository';
import { DatabaseModule } from 'database/database.module';
import { AuthModule } from 'auth/auth.module';
import { ActivityLogModule } from 'src/ActivityLog/activityLog.module';


@Module({

  imports:[
    DatabaseModule,AuthModule,ActivityLogModule
  ],

  controllers:[
    LoginController
  ],

  providers:[
    LoginService,
    loginRepository
  ],

  exports:[
    LoginService
  ]
})
export class LoginModule {}