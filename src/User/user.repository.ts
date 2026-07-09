import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DatabaseService } from '../../database/database.service';
import {
  CreateUserDto,
  UpdateUserDto,
} from './dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async Create(dto: CreateUserDto) {
    try {
      const pool = this.dbService.getPool();

      const result = await pool
        .request()
        .input('full_name', dto.full_name)
        .input('email', dto.email)
        .input('roleid', dto.role_id)
        .input('password', dto.password)
        .execute('sp_User_Create');

      return result.recordset[0];
    } catch {
      throw new NotFoundException('user.Database_Error');
    }
  }

  async GetAll() {
    try {
      const pool = this.dbService.getPool();

      const result = await pool
        .request()
        .execute('sp_User_GetAll');

      return result.recordset;
    } catch {
      throw new NotFoundException('user.Database_Error');
    }
  }

  async GetById(id: number) {
    try {
      const pool = this.dbService.getPool();

      const result = await pool
        .request()
        .input('id', id)
        .execute('sp_User_GetById');

      return result.recordset[0] ?? null;
    } catch {
      throw new NotFoundException('user.Database_Error');
    }
  }

  async Update(dto: UpdateUserDto) {
    try {
      const pool = this.dbService.getPool();

      const result = await pool
        .request()
        .input('full_name', dto.full_name)
        .input('email', dto.email)
        .input('roleid', dto.role_id)
        .input('password', dto.password)
        .input('id', dto.id)
        .execute('sp_User_Update');

      return result.recordset[0];
    } catch {
      throw new NotFoundException('user.Database_Error');
    }
  }

  async Delete(id: number) {
    try {
      const pool = this.dbService.getPool();

      const result = await pool
        .request()
        .input('id', id)
        .execute('sp_User_Delete');

      return result.recordset[0];
    } catch {
      throw new NotFoundException('user.Database_Error');
    }
  }
}