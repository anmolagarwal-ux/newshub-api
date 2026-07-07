import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { DatabaseService } from '../../database/database.service';
import { CreateRoleDTO } from './dto/role.dto';

@Injectable()
export class RoleRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async Create(dto: CreateRoleDTO) {
    try {
      const pool = this.dbService.getPool();

      const result = await pool
        .request()
        .input('name', dto.role_name)
        .input('user_id', dto.user_id)
        .execute('sp_Role_Create');

      return result.recordset[0];
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async GetAll() {
    try {
      const pool = this.dbService.getPool();

      const result = await pool
        .request()
        .execute('sp_Role_GetAll');

      return result.recordset;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async GetById(id: number) {
    try {
      const pool = this.dbService.getPool();

      const result = await pool
        .request()
        .input('id', id)
        .execute('sp_Role_GetById');

      return result.recordset[0] ?? null;
    } catch {
      throw new InternalServerErrorException();
    }
  }
}