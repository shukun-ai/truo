import { Injectable } from '@nestjs/common';
import { FlowEventSourceQuery } from '@shukun/schema';

import { CompilerHelperService } from '../compiler-helper.service';

@Injectable()
export class SourceQueryCompilerService {
  constructor(private readonly compilerHelperService: CompilerHelperService) {}

  compile(event: FlowEventSourceQuery) {
    return `
        async function main($){
            const orgName = $.orgName;
            const atomName = "${event.atomName}";
            const query = ${this.compilerHelperService.compileJsonTemplate(
              event.query,
            )};
            return await $.sourceResolver.query($.orgName, atomName, query);
        };
        exports.default=main;
    `;
  }
}
