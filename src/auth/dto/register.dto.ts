import { IsEmail, IsString, MinLength } from 'class-validator';
export class RegisterDTO {
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6, { message: 'Must be content 6 letters' })
  password: string;
  @IsString()
  nickname?: string;
}
