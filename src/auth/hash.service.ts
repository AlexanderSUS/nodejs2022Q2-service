import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashService {
  hash(value: string) {
    return bcrypt.hash(value, parseInt(process.env.CRYPT_SALT));
  }

  compare(plainValue: string, hash: string) {
    return bcrypt.compare(plainValue, hash);
  }
}
