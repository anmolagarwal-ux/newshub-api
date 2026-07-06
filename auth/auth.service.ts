import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService
  ) {}

  async login(fullName:string, roleName:string, Id:number){
    const payload = {
      Name:fullName,
      Role:roleName,
      Id:Id,
    };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token
    };
  }

  async hashPassword(password:string){
    return bcrypt.hash(
      password,
      10
    );
  }

  async validatePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

}