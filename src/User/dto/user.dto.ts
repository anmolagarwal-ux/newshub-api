import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {

    @ApiProperty({ example: 'John Doe' })
    @IsNotEmpty()
    @IsString()
    full_name?: string;


    @ApiProperty({ example: 'john@gmail.com' })
    @IsNotEmpty()
    @IsEmail()
    email?: string;


    @ApiProperty({ example: 'password123' })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password!: string;


    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    role_id?: number;
}

export class UpdateUserDto {

    @ApiPropertyOptional({ example: "John Doe" })
    @IsOptional()
    @IsString()
    full_name?: string;

    @ApiPropertyOptional({ example: "john@example.com" })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({ example: "strongPassword123" })
    @IsOptional()
    @IsString()
    @MinLength(6)
    password!: string;

    @ApiPropertyOptional({ example: 2, description: "Role ID of the user" })
    @IsOptional()
    @IsInt()
    role_id?: number;

    id?: number;
}

export class GetAllUserDto{
    full_name?: string;
    email?: string;
    role_id?: number;
    id? : number;
    role_name?: string;
    password? : string;

}