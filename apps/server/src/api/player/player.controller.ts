import { Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { PlayerSchema, RoleResourceType } from '@shukun/schema';

import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../util/query/interfaces';

@Controller(`${RoleResourceType.Public}/:orgName`)
@UseInterceptors(QueryResponseInterceptor)
export class PlayerController {
  @Post('players/:playerName')
  async show(
    @Param('orgName') orgName: string,
    @Param('playerName') playerName: string,
  ): Promise<QueryResponse<PlayerSchema>> {
    const player: PlayerSchema = {
      title: '',
      entry: 'home',
      containers: {
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
                'value-changed': ['w2Click1'],
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
      },
    };

    return {
      value: player,
    };
  }
}
