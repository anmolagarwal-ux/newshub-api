import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateRoleDTO } from './dto/role.dto';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly repo: RoleRepository) {}

  async Create(dto: CreateRoleDTO) {
    const result = await this.repo.Create(dto);

    if (!result?.isSuccess) {
      throw new BadRequestException('role.Role_Create_Failed');
    }

    return result;
  }

  async GetAll() {
    return await this.repo.GetAll();
  }

  async GetById(id: number) {
    const role = await this.repo.GetById(id);

    if (!role) {
      throw new NotFoundException('role.Role_Not_Found');
    }

    return role;
  }
}