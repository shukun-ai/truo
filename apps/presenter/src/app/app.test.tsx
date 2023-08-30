import { PresenterSchema } from '@shukun/schema';
import { render, screen } from '@testing-library/react';

import presenterJson from '../assets/presenter.json';

import { App } from './app';

describe('app', () => {
  it('render', () => {
    const injector = {} as any;
    const presenter = presenterJson as unknown as PresenterSchema;

    render(
      <App
        injector={injector}
        presenter={presenter}
        widgets={{}}
        repositories={{}}
        state={{} as any}
      />,
    );

    screen.debug();
  });
});
