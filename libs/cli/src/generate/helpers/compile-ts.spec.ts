import { compileTs } from './compile-ts';

describe('compileTs', () => {
  it('compileTs get minify code.', async () => {
    const text = await compileTs(`
            import { CodeResolver } from '@shukun/code-resolver';
            import { IDString } from '@shukun/api';

            export default async function main(
                scope: CodeResolver,
                parameters: { taskId: IDString }
            ) {
                await scope.source.updateOne(parameters.taskId, 'receive_tasks', {
                status: 'finished',
                });

                return {
                value: null,
                };
            }
    `);

    expect(text).toEqual(
      `\\"use strict\\";Object.defineProperty(exports,\\"__esModule\\",{value:true});async function main(scope,parameters){await scope.source.updateOne(parameters.taskId,\\"receive_tasks\\",{status:\\"finished\\"});return{value:null}}exports.default=main;`,
    );
  });
});
