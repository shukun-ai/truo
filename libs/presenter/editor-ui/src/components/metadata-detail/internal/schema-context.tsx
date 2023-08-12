import { ReactNode, createContext, useContext } from 'react';

import { MetadataEntity } from '../../../editor-context';

export type SchemaContextProps = {
  metadatas: Record<string, MetadataEntity>;
};

const SchemaContext = createContext<SchemaContextProps | null>(null);

export const SchemaProvider = ({
  metadatas,
  children,
}: {
  metadatas: Record<string, MetadataEntity>;
  children: ReactNode;
}) => (
  <SchemaContext.Provider value={{ metadatas }}>
    {children}
  </SchemaContext.Provider>
);

export const useSchemaContext = (): SchemaContextProps => {
  const schemaContext = useContext(SchemaContext);
  if (!schemaContext) {
    throw new Error('The schemaContext is not initialize.');
  }
  return schemaContext;
};
