import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email único del usuario',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña con mínimo 6 caracteres',
    minLength: 6,
  })
  @IsString()
  @MinLength(6, { message: 'Must be content 6 letters' })
  password: string;

  @ApiProperty({
    example: 'john_doe',
    description: 'Nombre de usuario (opcional)',
    required: false,
  })
  @IsString()
  @IsOptional()
  nickname?: string;
}
