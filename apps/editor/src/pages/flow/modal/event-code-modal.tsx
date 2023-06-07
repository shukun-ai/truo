import { json } from '@codemirror/lang-json';
import { LegacyFunctionComponent } from '@shukun/component';
import { githubDark } from '@uiw/codemirror-theme-github';
import ReactCodeMirror from '@uiw/react-codemirror';
import { Button, Drawer } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useCallback, useMemo } from 'react';
import { distinctUntilChanged } from 'rxjs';

import {
  closeEventCodeModal,
  eventCodeModalStoreQuery,
  updateValue,
} from './event-code-modal-service';

export interface EventCodeModalProps {}

export const EventCodeModal: LegacyFunctionComponent<
  EventCodeModalProps
> = () => {
  const store = useObservableState(eventCodeModalStoreQuery);

  const handleChange = useCallback((newValue: string) => {
    updateValue(newValue);
  }, []);

  const handleCancel = useCallback(() => {
    closeEventCodeModal();
  }, []);

  const handleClick = useCallback(() => {
    if (store?.onFinish) {
      store.onFinish(store.value ?? '');
    }
  }, [store]);

  return (
    <Drawer
      forceRender
      destroyOnClose
      title="Edit the code"
      open={store?.visible ?? false}
      onClose={handleCancel}
      mask
      maskClosable={false}
      footer={
        <div>
          <Button onClick={handleClick}>Save</Button>
        </div>
      }
      width={600}
    >
      <ReactCodeMirror
        value={store?.value ?? ''}
        theme={githubDark}
        extensions={[json()]}
        onChange={handleChange}
        height="600px"
      />
    </Drawer>
  );
};
