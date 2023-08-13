import { Repository } from '@shukun/presenter/definition';

import z from 'zod';

export const routerRepository: Repository = {
  go: (payload, event, injector) => {
    const schema = z.object({
      page: z.string().optional(),
      search: z.record(z.unknown()).optional(),
    });
    const { success } = schema.safeParse(payload);

    if (success) {
      injector.router.go(payload as z.infer<typeof schema>);
    } else {
      injector.logger.error('routerRepository.go', payload);
    }
  },

  back: (payload, event, injector) => {
    injector.router.back();
  },
};
