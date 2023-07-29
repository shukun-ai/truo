import { ConnectorSchema } from '@shukun/schema';

import { EditorState, toEditorState } from './data-transfer';

describe('data-transfer', () => {
  describe('toEditorState', () => {
    it('should ', () => {
      const connector: ConnectorSchema = {
        label: 'realWorldConnector',
        start: '获得机场数据',
        tasks: {
          获得机场数据: {
            type: 'sourceQuery',
            next: '检查机场数据长度',
            parameters: {
              atomName: 'airports',
              query: {
                filter: {
                  code: {
                    $eq: '$$_js:return $.input.code;',
                  },
                },
              },
            },
          },
          检查机场数据长度: {
            type: 'either',
            next: '重映射数据',
            parameters: {
              condition: '$$__js:return $.input.data.length > 0;',
              right: '提示用户失败',
            },
          },
          重映射数据: {
            type: 'repeat',
            parameters: {
              connectorName: '映射机场数据',
              connectorInput: '$$__js:return {index: $.index}',
              repeatCount: '$.input.data.length',
            },
          },
          提示用户失败: {
            type: 'fail',
            parameters: {
              code: 'NotFoundException',
              message: '错误信息',
            },
          },
        },
      };

      const state = toEditorState(connector);

      const expected: EditorState = {
        nodes: [
          {
            id: '$$__start',
            type: 'start',
            position: { x: 0, y: 0 },
            data: {
              taskName: null,
              task: null,
              ui: { width: 150, height: 50 },
            },
          },
          {
            id: '$$__end',
            type: 'end',
            position: { x: 0, y: 0 },
            data: {
              taskName: null,
              task: null,
              ui: { width: 150, height: 50 },
            },
          },
          {
            id: '获得机场数据',
            type: 'resource',
            position: { x: 0, y: 0 },
            data: {
              task: connector.tasks['获得机场数据'],
              taskName: '获得机场数据',
              ui: { width: 280, height: 67 },
            },
          },
          {
            id: '检查机场数据长度',
            type: 'either',
            position: { x: 0, y: 0 },
            data: {
              task: connector.tasks['检查机场数据长度'],
              taskName: '检查机场数据长度',
              ui: { width: 280, height: 67 },
            },
          },
          {
            id: '重映射数据',
            type: 'repeat',
            position: { x: 0, y: 0 },
            data: {
              task: connector.tasks['重映射数据'],
              taskName: '重映射数据',
              ui: { width: 280, height: 67 },
            },
          },
          {
            id: '提示用户失败',
            type: 'fail',
            position: { x: 0, y: 0 },
            data: {
              task: connector.tasks['提示用户失败'],
              taskName: '提示用户失败',
              ui: { width: 280, height: 67 },
            },
          },
        ],
        edges: [
          {
            id: '$$__start>获得机场数据',
            type: 'smoothstep',
            source: '$$__start',
            target: '获得机场数据',
          },
          {
            id: '获得机场数据>检查机场数据长度',
            type: 'smoothstep',
            source: '获得机场数据',
            target: '检查机场数据长度',
          },
          {
            id: '检查机场数据长度>重映射数据',
            label: '是',
            type: 'smoothstep',
            source: '检查机场数据长度',
            target: '重映射数据',
          },
          {
            id: '检查机场数据长度>提示用户失败',
            label: '否',
            type: 'smoothstep',
            source: '检查机场数据长度',
            target: '提示用户失败',
          },
          {
            id: '重映射数据>$$__end',
            type: 'smoothstep',
            source: '重映射数据',
            target: '$$__end',
          },
          {
            id: '提示用户失败>$$__end',
            type: 'smoothstep',
            source: '提示用户失败',
            target: '$$__end',
          },
        ],
      };

      expect(state).toEqual(expected);
    });
  });
});
