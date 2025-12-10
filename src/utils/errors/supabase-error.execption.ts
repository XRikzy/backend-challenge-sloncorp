import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PostgrestError } from '@supabase/supabase-js';

export class SupabseCustomError {
  static execption(error: PostgrestError): never {
    if (!error) {
      throw new InternalServerErrorException(
        'Unresolve Error Ocurred Please try again',
      );
    }
    switch (error.code) {
      case '23505':
        throw new ConflictException('A record with that data already exists.');
      case '23503': // foreign_key_violation
        throw new BadRequestException(
          'The foreign key reference does not exist.',
        );
      case '22P02': // invalid_text_representation
        throw new BadRequestException('The identifier format is invalid.');
      case 'PGRST116': // registro no encontrado
        throw new NotFoundException('The requested resource does not exist.');
      case 'PGRST102': // registro no encontrado
        throw new BadRequestException('Contains no items to update.');
      default:
        throw new BadRequestException(error.message);
    }
  }
}
