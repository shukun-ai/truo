import { useEffect } from 'react';
import { useReactFlow } from 'reactflow';

export type AutoFitViewProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: any;
};

export const AutoFitView = ({ state }: AutoFitViewProps) => {
  const { fitView } = useReactFlow();

  useEffect(() => {
    setTimeout(() => fitView(), 0);
  }, [state, fitView]);

  return null;
};
