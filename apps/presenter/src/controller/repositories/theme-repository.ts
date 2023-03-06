import { lightTheme } from '@shukun/widget';
import { cloneDeep, set } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';

import { IRepository } from '../../repository/repository.interface';

export type ThemeRepositoryState = Record<string, string>;

export class ThemeRepository implements IRepository {
  private states = new BehaviorSubject<ThemeRepositoryState>(lightTheme);

  constructor() {
    this.states.subscribe((states) => {
      for (const [state, value] of Object.entries(states)) {
        document.documentElement.style.setProperty(state, value);
      }
    });
  }

  query(): Observable<ThemeRepositoryState> {
    return this.states;
  }

  getValue(): ThemeRepositoryState {
    return this.states.getValue();
  }

  setValue(path: (string | number)[], value: unknown): void {
    const target = cloneDeep(this.states.getValue());
    set(target, path, value);
    this.states.next(target);
  }

  resetValue(): void {
    this.states.next(lightTheme);
  }

  destroy(): void {
    this.states.unsubscribe();
  }

  trigger(): void {
    //
  }
}
