import { Module } from '@nestjs/common';
import { DatabaseModule } from 'Database/database.module';
import { RoleController } from './role.controller';
import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({

  imports:[
    DatabaseModule,
    AuthModule
  ],

  controllers:[
    RoleController
  ],

  providers:[
    RoleService,
    RoleRepository
  ],

  exports:[
    RoleService
  ]

})
export class RoleModule {}