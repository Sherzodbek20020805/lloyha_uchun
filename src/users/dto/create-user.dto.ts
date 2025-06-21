import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name' })
  @IsNotEmpty() full_name: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email address' })
  @IsEmail() email: string;

  @ApiProperty({ example: 'strongP4ss', minLength: 6, description: 'Password' })
  @MinLength(6) password: string;
}
