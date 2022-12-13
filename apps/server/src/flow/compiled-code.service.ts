import { Injectable } from '@nestjs/common';
import { FlowEventCompiledCodes } from '@shukun/schema';

@Injectable()
export class CompiledCodeService {
  async getCompiledCodes(orgName: string, flowName: string) {
    // TODO: implement this method.
    const eventCompiledCodes: FlowEventCompiledCodes = {
      first: 'async function main($){return{id:$.input}};exports.default=main;',
      repeat:
        'async function main($){return $.input.count;};exports.default=main;',
      'repeat->second':
        'async function main($){return{id:$.index}};exports.default=main;',
    };

    return eventCompiledCodes;
  }
}
