import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class loginRequest {

    @ApiProperty({
        example: 'admin@gmail.com'
    })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email!: string;


    @ApiProperty({
        example: 'password123'
    })
    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password!: string;
}

export class loginUser{
    id! : number;
    fullName!: string;
    email!: string;
    roleName!: string;
    password!: string;
}