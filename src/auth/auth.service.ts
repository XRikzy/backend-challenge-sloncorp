import { Injectable } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
  create(register: RegisterDTO) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
