import { Module } from '@nestjs/common';
import { DatabaseModule } from 'database/database.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { AuthModule } from 'auth/auth.module';

@Module({

  imports:[
    DatabaseModule,
    AuthModule
  ],

  controllers:[
    CategoryController
  ],

  providers:[
    CategoryService,
    CategoryRepository
  ],

  exports:[
    CategoryService
  ]

})
export class CategoryModule {}