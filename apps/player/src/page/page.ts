import { map, tap } from 'rxjs';

import { StoreContainer } from '../store/store-container';

export class Page {
  ref: any;

  constructor(private readonly storeContainer: StoreContainer) {}

  create(definition: PageDefinition) {
    this.ref = document.createElement('time-counter');
    this.createSubscriptions(definition);

    this.ref.addEventListener('title-changed', (event: any) => {
      console.log(event, this.ref.title);
    });

    return this.ref;
  }

  createSubscriptions(definition: PageDefinition) {
    for (const [key, binding] of Object.entries(definition)) {
      this.createSubscription(key, binding);
    }
  }

  createSubscription(keyName: string, binding: string) {
    const subscription = this.storeContainer
      .createObservable(`customQuery.title`)
      .pipe(
        map((value) => {
          return `Hello ${value}`;
        }),
        tap((value) => {
          // this.ref.title = value;
          this.ref.setAttribute('title', value);
        }),
      )
      .subscribe();
  }
}

export interface PageDefinition {
  [keyName: string]: string;
}
