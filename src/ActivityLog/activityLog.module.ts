import { Module } from '@nestjs/common';
import { DatabaseModule } from 'Database/database.module';
import { ActivityLogController } from './activityLog.controller';
import { ActivityLogService } from './activityLog.service';
import { ActivityLogRepository } from './activityLog.repository';

@Module({

  imports:[
    DatabaseModule
  ],

  controllers:[
    ActivityLogController
  ],

  providers:[
    ActivityLogService,
    ActivityLogRepository
  ],

  exports:[
    ActivityLogService
  ]

})
export class ActivityLogModule {}