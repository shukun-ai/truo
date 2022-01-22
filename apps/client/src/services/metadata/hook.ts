import { MetadataSchema } from '@shukun/schema';
import { useObservableState } from 'observable-hooks';
import { useMemo } from 'react';

import { metadata$ } from './query';

// @todo should be refactor by rxjs
export function useMetadataByAtom(
  atomName: string | undefined,
): [MetadataSchema | undefined] {
  const metadata = useObservableState(metadata$, []);

  const data = useMemo(() => {
    return metadata.find((data) => data.name === atomName);
  }, [metadata, atomName]);

  return [data];
}
