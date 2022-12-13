import { Injectable } from '@nestjs/common';

@Injectable()
export class CompiledCodeService {
  async getCompiledCodes(orgName: string, flowName: string) {
    // TODO: implement this method.
    const compiledCode: Record<string, string> = {
      first: 'async function main($){return{id:$.input}};exports.default=main;',
      repeat:
        'async function main($){return $.input.count;};exports.default=main;',
      'repeat->second':
        'async function main($){return{id:$.index}};exports.default=main;',
    };

    return compiledCode;
  }
}
