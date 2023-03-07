import { createElement } from 'react';
import { render } from 'react-dom';

import { createBrowserEffect } from './effects/browser-effect';

import { ButtonWidget } from './effects/integrate-testing/widgets/button.widget';
import { CodeWidget } from './effects/integrate-testing/widgets/code.widget';
import { InputWidget } from './effects/integrate-testing/widgets/input.widget';
import { TextWidget } from './effects/integrate-testing/widgets/text.widget';
import { createEffectApp } from './providers/effect-context';
import { createObservable } from './providers/observable';

import { App } from './ui/app';
import { AppProps } from './ui/app.interface';

async function main() {
  // const appController = new AppController(injector);
  // await appController.registerRepositories();
  // render(createElement(createApp(injector)), document.getElementById('root'));

  const appProps: AppProps = {
    context: {
      appName: 'pda',
      orgName: 'pactl',
    },
    router: {
      page: 'home',
      search: {},
    },
    containers: {
      home: {
        w1: {
          value: 'hello world.',
        },
      },
    },
    player: {
      title: 'PDA',
      entry: 'home',
      containers: {
        about: {
          type: 'page',
          repositories: {
            form2: {
              type: 'Simple',
            },
          },
          events: {},
          widgets: {
            w1: {
              tag: 'sk-text',
              properties: {
                value: 'It is about page {{$.form2.value}}.',
              },
              events: {},
            },
          },
          root: ['w1'],
          tree: {},
        },
        home: {
          type: 'page',
          repositories: {
            form1: {
              type: 'Simple',
            },
          },
          events: {
            w2Click1: {
              action: 'setRepository',
              target: 'form1',
              path: ['deviceNumber'],
            },
          },
          widgets: {
            w1: {
              tag: 'sk-text',
              properties: {
                value: '{{$.form1.deviceNumber}}',
              },
              events: {},
            },
            w2: {
              tag: 'sk-input',
              properties: {
                value: '{{$.form1.deviceNumber}}',
              },
              events: {
                onChange: ['w2Click1'],
              },
            },
            w3: {
              tag: 'sk-code',
              properties: {
                value: '{{$.form1}}',
              },
              events: {},
            },
          },
          root: ['w1', 'w2', 'w3'],
          tree: {},
        },
        'sign-in': {
          type: 'page',
          repositories: {
            simple: {
              type: 'Simple',
            },
          },
          events: {
            changeUsername: {
              action: 'setRepository',
              target: 'simple',
              path: ['username'],
            },
            changePassword: {
              action: 'setRepository',
              target: 'simple',
              path: ['password'],
            },
          },
          widgets: {
            'submit-button': {
              tag: 'sk-button',
              properties: {
                text: 'Sign In',
              },
              events: {},
            },
            title: {
              tag: 'sk-text',
              properties: {
                value: 'Sign In',
              },
              events: {},
            },
            username: {
              tag: 'sk-input',
              properties: {
                value: '{{$.simple.username}}',
              },
              events: {
                onChange: ['changeUsername'],
              },
            },
            password: {
              tag: 'sk-input',
              properties: {
                value: '{{$.simple.password}}',
              },
              events: {
                onChange: ['changePassword'],
              },
            },
          },
          root: ['title', 'username', 'password', 'submit-button'],
          tree: {},
        },
      },
    },
    eventCallback: () => {
      return;
    },
    widgets: {
      'sk-input': InputWidget,
      'sk-text': TextWidget,
      'sk-code': CodeWidget,
      'sk-button': ButtonWidget,
    },
  };

  // render(createElement(App, appProps), document.getElementById('root'));

  const injector = await createBrowserEffect();
  const observable = createObservable(injector);
  render(
    createElement(createEffectApp(injector, observable)),
    document.getElementById('root'),
  );

  setTimeout(() => {
    // (appProps as any).containers.home.w1.value = 'hello world222.';
    // render(createElement(App, appProps), document.getElementById('root'));
    injector.repositoryManager.setValue('form1', ['deviceNumber'], 'Bob');
  }, 3000);
}

main();
