import { Injectable } from '@nestjs/common';
import {
  randomBytes,
  scrypt as nodeScrypt,
  timingSafeEqual,
} from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(nodeScrypt);

@Injectable()
export class PasswordService {
  async hash(password: string): Promise<string> {
    const salt = randomBytes(16).toString('base64url');
    const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
    return `scrypt$${salt}$${derivedKey.toString('base64url')}`;
  }

  async verify(password: string, storedHash: string): Promise<boolean> {
    const [algorithm, salt, encodedHash] = storedHash.split('$');

    if (algorithm !== 'scrypt' || !salt || !encodedHash) {
      return false;
    }

    const expected = Buffer.from(encodedHash, 'base64url');
    const actual = (await scrypt(password, salt, expected.length)) as Buffer;
    return (
      expected.length === actual.length && timingSafeEqual(expected, actual)
    );
  }
}
