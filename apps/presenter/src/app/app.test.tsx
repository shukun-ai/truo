import { Injector } from '@shukun/presenter/definition';
import { PresenterSchema } from '@shukun/schema';
import { render, screen } from '@testing-library/react';

import presenterJson from '../assets/presenter.json';

import { App } from './app';

describe('app', () => {
  it('render', () => {
    const devtool: Injector['devtool'] = {
      logState: () => null,
      logWidget: () => null,
    };
    const injector = { devtool } as any;
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
