import { ConnectorEditor } from '../../components/connector-editor/connector-editor';

export type ConnectorContainerProps = {
  //
};

export const ConnectorContainer = () => {
  return (
    <ConnectorEditor
      value={{
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
      }}
      onChange={(value) => console.log('connector changed', value)}
    />
  );
};
