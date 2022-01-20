import { Routes } from 'nest-router';

import { ApiModule } from './api/api.module';

export const routes: Routes = [
  {
    path: '/apis/v1',
    module: ApiModule,
  },
];
