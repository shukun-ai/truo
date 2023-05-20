import { select } from '@ngneat/elf';

import { ApiRequester } from '../apis/requester';

import { authStore } from './auth-store';

export class AuthRepository {
  authStore = authStore;

  currentUser$ = this.authStore.pipe(select((state) => state.currentUser));

  constructor(private readonly apiRequester: ApiRequester) {}

  async signIn({
    orgName,
    username,
    password,
  }: {
    orgName: string;
    username: string;
    password: string;
  }) {
    const response = await this.apiRequester.publicRequester.signIn(orgName, {
      username,
      password,
    });
    this.authStore.update(() => ({
      currentUser: response.data.value,
    }));
  }
}
