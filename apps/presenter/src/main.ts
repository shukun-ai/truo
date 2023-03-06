import { render } from 'react-dom';

import { AppController } from './controllers/app.controller';
import { injector } from './injector';

async function main() {
  const appController = new AppController(injector);

  await appController.registerRepositories();
  const AppElement = await appController.assembleWidgets();

  render(AppElement, document.getElementById('root'));
}

main();
