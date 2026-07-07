import { Injectable } from '@nestjs/common';

import { StatusRepository } from './status.repository';

@Injectable()
export class StatusService {
  constructor(
    private readonly repo: StatusRepository,
  ) {}

  async GetAll() {
    return this.repo.GetAll();
  }
}