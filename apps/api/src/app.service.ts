import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { service: string; status: string } {
    return {
      service: 'bodyscan-api',
      status: 'ok',
    };
  }
}
