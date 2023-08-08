import { RouterRepositoryStates } from '@shukun/presenter/definition';

import z from 'zod';

import { BaseRepository } from '../base-repository';

export class RouterRepository extends BaseRepository<RouterRepositoryStates> {
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
