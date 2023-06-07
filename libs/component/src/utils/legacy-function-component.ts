import { ReactNode, ReactElement } from 'react';

export interface LegacyFunctionComponent<P = Record<string, unknown>> {
  (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
}

type PropsWithChildren<P> = P & { children?: ReactNode | undefined };
