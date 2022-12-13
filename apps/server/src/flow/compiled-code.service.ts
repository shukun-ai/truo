import { Injectable } from '@nestjs/common';

@Injectable()
export class CompiledCodeService {
  async getCompiledCodes(orgName: string, flowName: string) {
    // TODO: implement this method.
    const compiledCode: Record<string, string> = {
      first:
        'async function main($){return{id:$.input.id}};exports.default=main;',
    };

    return compiledCode;
  }
}
