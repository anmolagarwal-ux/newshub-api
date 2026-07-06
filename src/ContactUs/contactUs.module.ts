import { Module } from '@nestjs/common';
import { ContactUsController } from './contactUs.controller';
import { ContactUsService } from './contactUs.service';
import { DatabaseModule } from 'database/database.module';
import { ContantUsRepository } from './contactUs.repository';
import { ActivityLogModule } from 'src/ActivityLog/activityLog.module';

@Module({

  imports:[
    DatabaseModule,
    ActivityLogModule
  ],

  controllers:[
    ContactUsController
  ],

  providers:[
    ContactUsService,
    ContantUsRepository
  ],

  exports:[
    ContactUsService
  ]

})
export class ContactUsModule {}