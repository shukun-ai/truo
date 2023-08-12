import { createContext, useContext, useState } from 'react';

export type ConnectorEditorContextProps = {
  selectedTaskName: string | null;
  setSelectedTaskName: (taskName: string | null) => void;
  taskOptions: { value: string; label: string }[];
};

const ConnectorEditorContext =
  createContext<ConnectorEditorContextProps | null>(null);

export const ConnectorEditorProvider = ({
  children,
  taskOptions,
}: {
  children: JSX.Element;
  taskOptions: ConnectorEditorContextProps['taskOptions'];
}) => {
  const [selectedTaskName, setSelectedTaskName] =
    useState<ConnectorEditorContextProps['selectedTaskName']>(null);

  return (
    <ConnectorEditorContext.Provider
      value={{
        selectedTaskName,
        setSelectedTaskName,
        taskOptions,
      }}
    >
      {children}
    </ConnectorEditorContext.Provider>
  );
};

export const useConnectorEditorContext = (): ConnectorEditorContextProps => {
  const connectorEditorContext = useContext(ConnectorEditorContext);
  if (!connectorEditorContext) {
    throw new Error('The connectorEditorContext is not initialize.');
  }
  return connectorEditorContext;
};
