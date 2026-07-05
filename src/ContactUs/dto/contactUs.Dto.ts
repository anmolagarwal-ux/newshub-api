import { ApiProperty } from '@nestjs/swagger';

export class CreateContactUsDTO {

    @ApiProperty({
        example: "John Doe",
        description: "Contact person name"
    })
    name!: string;


    @ApiProperty({
        example: "test@gmail.com",
        description: "Email address"
    })
    email!: string;


    @ApiProperty({
        example: "Need help",
        description: "Contact subject"
    })
    subject!: string;


    @ApiProperty({
        example: "I want to know more about your service",
        description: "Message body"
    })
    body!: string;

}

export class GetAllContactUs {
  id!: number;
  name!: string;
  email!: string;
  subject!: string;
  message!: string;
  created_at!: Date;
}