import { Injectable } from '@nestjs/common';

import { DashboardRepository } from './dashboard.repository';

@Injectable()
export class DashboardService {
  constructor(
    private readonly repo: DashboardRepository,
  ) {}

  async GetAllCategoryDetail() {
    return this.repo.GetAllCategoryDetail();
  }

  async GetAllStatusDetail() {
    return this.repo.GetAllStatusDetail();
  }
}