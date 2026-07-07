import { Injectable } from '@nestjs/common';

import { ContantUsRepository } from './contactUs.repository';
import { CreateContactUsDTO } from './dto/contactUs.Dto';
import { ActivityLogService } from '../ActivityLog/activityLog.service';

@Injectable()
export class ContactUsService {
  constructor(
    private readonly repo: ContantUsRepository,
    private readonly activityLogService: ActivityLogService,
  ) {}

  async Create(dto: CreateContactUsDTO) {
    const result = await this.repo.Create(dto);

    if (result.isSuccess) {
      await this.activityLogService.CreateActivityLog(
        1,
        'CREATE',
        'ContactUs',
        `Created contact request from ${dto.email}`,
      );
    }

    return result;
  }

  async GetAll(pageNumber: number, pageSize: number) {
    const result = await this.repo.GetAll(
      pageNumber,
      pageSize,
    );

    await this.activityLogService.CreateActivityLog(
      1,
      'FETCH',
      'ContactUs',
      'Fetched contact requests',
    );

    return result;
  }

  async GetById(id: number) {
    const result = await this.repo.GetById(id);

    await this.activityLogService.CreateActivityLog(
      1,
      'FETCH',
      'ContactUs',
      `Fetched contact request ${id}`,
    );

    return result;
  }
}