import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDTO {

    @ApiProperty({
        example: "Super Admin",
        description: "Role Name"
    })
    role_name!: string;

    @ApiProperty({
        example: "1",
        description: "created by"
    })
    user_id!: string;

}

export class GetAllRole {
  role_id!: number;
  role_name!: string;
  created_at!: Date;
}