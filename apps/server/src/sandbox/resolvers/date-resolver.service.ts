import { Injectable } from '@nestjs/common';

@Injectable()
export class DateResolverService {
  now() {
    return new Date().toISOString();
  }
}
