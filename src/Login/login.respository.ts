import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../Database/database.service';
import { loginRequest, loginUser } from './dto/login.dto';


@Injectable()
export class loginRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async login(login: loginRequest): Promise<loginUser> {
    const user = new loginUser();
    const pool = this.dbService.getPool();
    try{
        const result = await pool
            .request()
            .input('email', login.email)
            .input('password', login.password)
            .execute('sp_LoginUser');
        result.recordset.map((data) => {
        user.id       =   data.id;
        user.fullName =   data.full_name;
        user.email    =   data.email;
        user.roleName =   data.role_name;
      });
      return user;
    }
    catch (exception) {
        return user;
    }
  }

}