export async function compileCommonWrapper(
  contentCode: string,
): Promise<string> {
  return `
        async function main($, $$, $$$){
          ${contentCode}
        };
        exports.default=main;
    `;
}
