import { Module } from '@nestjs/common';
import { DatabaseModule } from 'database/database.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './user.repository';
import { AuthModule } from 'auth/auth.module';

@Module({

  imports:[
    DatabaseModule,
    AuthModule
  ],

  controllers:[
    UsersController
  ],

  providers:[
    UsersService,
    UserRepository
  ],

  exports:[
    UsersService
  ]

})
export class UserModule {}