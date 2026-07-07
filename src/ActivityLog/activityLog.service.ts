import { BadRequestException, Injectable } from '@nestjs/common';
import { ActivityLog } from './dto/activityLog.dto';
import { ActivityLogRepository } from './activityLog.repository';

@Injectable()
export class ActivityLogService {
  constructor(private readonly repo: ActivityLogRepository) {}

  async CreateActivityLog(
    user_id: number,
    action_type: string,
    module_name: string,
    description: string,
  ): Promise<boolean> {
    const dto = new ActivityLog();

    dto.user_id = user_id;
    dto.action_type = action_type;
    dto.module_name = module_name;
    dto.description = description;

    const result = await this.repo.CreateActivityLog(dto);

    if (!result.isSuccess) {
      throw new BadRequestException('activity.Create_Failed');
    }

    return true;
  }

  async GetAll(pageNumber: number, pageSize: number) {
    return await this.repo.GetAll(pageNumber, pageSize);
  }
}