import { RepositoryContext } from '@shukun/presenter/definition';

import z from 'zod';

export class RouterRepository {
  constructor(private readonly context: RepositoryContext) {}

  go(payload: unknown) {
    const schema = z.object({
      page: z.string().optional(),
      search: z.record(z.unknown()).optional(),
    });
    const { success } = schema.safeParse(payload);

    if (success) {
      this.context.router.go(payload as z.infer<typeof schema>);
    }
  }

  back() {
    this.context.router.back();
  }
}
