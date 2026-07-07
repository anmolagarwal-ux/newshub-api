import { Module } from '@nestjs/common';
import { ActivityLogController } from './activityLog.controller';
import { ActivityLogService } from './activityLog.service';
import { ActivityLogRepository } from './activityLog.repository';
import { DatabaseModule } from '../../database/database.module';

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