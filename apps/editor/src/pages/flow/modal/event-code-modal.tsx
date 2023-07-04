import { json } from '@codemirror/lang-json';
import { LegacyFunctionComponent } from '@shukun/component';
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
      <textarea
        value={store?.value ?? ''}
        onChange={(event) => handleChange(event.target.value)}
        style={{ height: 600 }}
      />
    </Drawer>
  );
};
