import { getStorePath } from '@shukun/util-functions';
import { useEffect, useState } from 'react';

import { LifecycleWidgetProps } from '../lifecycle.props';

export const useStateChanged = ({
  stateChanged,
  onRun,
  ...props
}: Pick<LifecycleWidgetProps, 'stateChanged' | 'onRun'>) => {
  const state = extractState(props);
  const [previousToken, setPreviousToken] = useState<string | null>(null);
  const identifier = getIdentifier(extractWatched(state, stateChanged));

  useEffect(() => {
    if (identifier) {
      if (previousToken !== identifier) {
        onRun && onRun(undefined);
        setPreviousToken(identifier);
      }
    }
  }, [identifier, onRun, previousToken]);
};

const extractState = (props: any): any => {
  const state = props?.app?.state;
  return state;
};

const extractWatched = (
  state: any,
  stateChanged: string[][] | undefined,
): any[] | null => {
  if (!stateChanged) {
    return null;
  }
  const partialState = stateChanged.map((watchPath) => {
    return getStorePath(state, watchPath);
  });
  return partialState;
};

const getIdentifier = (watchedState: any[] | null): string | null => {
  if (!watchedState) {
    return null;
  }
  return JSON.stringify(watchedState);
};
