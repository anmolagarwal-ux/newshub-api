import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  CreateUserDto,
  UpdateUserDto,
} from './dto/user.dto';

import { UserRepository } from './user.repository';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly repo: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async GetAll() {
    return this.repo.GetAll();
  }

  async GetUserById(id: number) {
    const user = await this.repo.GetById(id);

    if (!user) {
      throw new NotFoundException('user.User_Not_Found');
    }

    return user;
  }

  async Create(dto: CreateUserDto) {
    dto.password = await this.authService.hashPassword(dto.password);

    const result = await this.repo.Create(dto);

    if (!result?.isSuccess) {
      throw new BadRequestException('user.User_Create_Failed');
    }

    return result;
  }

  async Update(dto: UpdateUserDto) {
    dto.password = await this.authService.hashPassword(dto.password);

    const result = await this.repo.Update(dto);

    if (!result?.isSuccess) {
      throw new BadRequestException('user.User_Update_Failed');
    }

    return result;
  }

  async Delete(id: number) {
    const result = await this.repo.Delete(id);

    if (!result?.isSuccess) {
      throw new BadRequestException('user.User_Delete_Failed');
    }

    return result;
  }
}