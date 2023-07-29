import { select } from '@ngneat/elf';

import { ApiRequester } from '../../apis/requester';

import { IAuthRepository } from './auth-repository.interface';
import { authStore } from './auth-store';

export class AuthRepository implements IAuthRepository {
  authStore = authStore;

  currentUser$ = this.authStore.pipe(select((state) => state.currentUser));

  constructor(private readonly apiRequester: ApiRequester) {}

  getOrgName(): string | null {
    const { currentUser } = this.authStore.getValue();
    return currentUser?.orgName ?? null;
  }

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

  signOut(): void {
    this.authStore.update(() => ({
      currentUser: null,
    }));
  }
}
