import { StoreContainer } from '../store/store-container';
import { Page } from './page';

export class PageContainer {
  constructor(private readonly storeContainer: StoreContainer) {}

  initialize() {
    const page = new Page(this.storeContainer);
    const pageRef = page.create({
      text: 'Hello {customQuery.title}',
    });

    document.body.append(pageRef);
  }
}
