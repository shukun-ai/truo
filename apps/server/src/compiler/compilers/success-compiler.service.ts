import { Injectable } from '@nestjs/common';
import { FlowEventSuccess } from '@shukun/schema';

import { CompilerHelperService } from '../compiler-helper.service';

import { BaseCompiler } from './base-compiler.interface';

@Injectable()
export class SuccessCompilerService implements BaseCompiler {
  constructor(private readonly compilerHelperService: CompilerHelperService) {}

  async compile(event: FlowEventSuccess) {
    return `
        async function main($){
            const output = ${this.compilerHelperService.compileJsonTemplate(
              event.output,
            )};
            return output;
        };
        exports.default=main;
    `;
  }
}
