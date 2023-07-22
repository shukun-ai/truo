import { ReactNode, createContext, useContext } from 'react';

import { MetadataEntity } from '../../../../../../repositories/metadata/metadata-ref';

export type SchemaContextProps = {
  metadatas: MetadataEntity[];
};

const SchemaContext = createContext<SchemaContextProps | null>(null);

export const SchemaProvider = ({
  metadatas,
  children,
}: {
  metadatas: MetadataEntity[];
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
