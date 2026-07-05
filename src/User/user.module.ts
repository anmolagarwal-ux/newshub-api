import { Module } from '@nestjs/common';
import { DatabaseModule } from 'Database/database.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './user.repository';
import { AuthModule } from 'src/auth/auth.module';

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