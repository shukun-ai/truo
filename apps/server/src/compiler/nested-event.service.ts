import { Injectable } from '@nestjs/common';

@Injectable()
export class NestedEventService {
  separator = '->';

  combinePrefix(parentEventNames: string | undefined, startEventName: string) {
    return parentEventNames
      ? `${parentEventNames}${this.separator}${startEventName}`
      : startEventName;
  }
}
