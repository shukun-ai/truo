import { ConnectorEditor } from '../../components/connector-editor/connector-editor';

export type ConnectorContainerProps = {
  //
};

export const ConnectorContainer = () => {
  return (
    <ConnectorEditor
      value={{
        label: 'realWorldConnector',
        start: 'findAirline',
        tasks: {
          findAirline: {
            type: 'sourceQuery',
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
        },
      }}
      onChange={(value) => console.log('connector changed', value)}
    />
  );
};
