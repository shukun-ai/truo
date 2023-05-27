import { Box } from '@mantine/core';

import { useForm } from '@mantine/form';
import { PresenterWidget, WidgetSchema } from '@shukun/schema';

import { cloneDeep, isEqual } from 'lodash';
import { useEffect, useState } from 'react';

import { PresenterTabEntity } from '../../../../../repositories/presenter/tab-ref';
import { PresenterWidgetEntity } from '../../../../../repositories/presenter/widget-ref';
import { useAppContext } from '../../../../contexts/app-context';
import { WidgetFormProvider } from '../widget/widget-context';
import { WidgetField } from '../widget/widget-field';

export type WidgetFormProps = {
  tab: PresenterTabEntity;
  widget: PresenterWidgetEntity;
  definition: WidgetSchema;
};

export const WidgetForm = ({ tab, widget, definition }: WidgetFormProps) => {
  const app = useAppContext();

  const form = useForm<PresenterWidget['properties']>({
    initialValues: cloneDeep(widget.properties),
  });

  const [fixedCache, setFixedCache] = useState(false);

  useEffect(() => {
    if (!isEqual(form.values, widget.properties) && !fixedCache) {
      app.repositories.presenterRepository.tabRepository.fixTab(tab.id);
      setFixedCache(true);
    }
  }, [
    app.repositories.presenterRepository.tabRepository,
    fixedCache,
    form.values,
    tab.id,
    widget.properties,
  ]);

  return (
    <Box>
      <WidgetFormProvider form={form}>
        <form>
          {Object.entries(definition.properties).map(
            ([propertyId, property]) => (
              <WidgetField
                key={propertyId}
                propertyId={propertyId}
                property={property}
              />
            ),
          )}
        </form>
      </WidgetFormProvider>
    </Box>
  );
};
