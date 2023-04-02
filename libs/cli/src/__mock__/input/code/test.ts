import { CodeResolver } from '@shukun/code-resolver';

export default async function main(
  scope: CodeResolver,
  parameters: { hello: string },
) {
  const value = await scope.source.findAll<{ username: string }>(
    'system__users',
    { select: { username: true }, filter: {} },
  );

  return {
    name: `${parameters.hello} ${value[0].username}`,
  };
}
