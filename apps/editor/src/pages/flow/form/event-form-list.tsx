import { LegacyFunctionComponent } from '@shukun/component';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent } from 'react';

import { flowQuery } from '../../../services/flow';

import { EventForm } from './event-form';

export interface EventFormListProps {}

export const EventFormList: LegacyFunctionComponent<
  EventFormListProps
> = () => {
  const flow = useObservableState(flowQuery.activeFlow$);

  return (
    <div
      style={{
        display: 'flex',
        height: 'calc(100vh - 33px)',
        flexDirection: 'column',
      }}
    >
      <div style={{ fontSize: 16, paddingLeft: 8, paddingRight: 8 }}>
        Event List
      </div>

      {flow && (
        <div style={{ flex: 1, overflowY: 'scroll' }}>
          {Object.entries(flow.events).map(([eventName, event]) => {
            return (
              <div
                style={{
                  border: 'solid 1px rgba(0,0,0,.5)',
                  margin: 8,
                  marginBottom: 12,
                  borderRadius: 4,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingTop: 8,
                    fontWeight: 'bold',
                  }}
                >
                  {eventName}
                </div>
                <EventForm eventName={eventName} event={event} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
