import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { StatusRepository } from './status.repository';
import { DatabaseModule } from 'Database/database.module';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    StatusController
  ],
  providers: [
    StatusService,
    StatusRepository
  ],
  exports: [
    StatusService
  ]
})
export class StatusModule {}