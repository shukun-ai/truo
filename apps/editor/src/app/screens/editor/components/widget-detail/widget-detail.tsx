import { useForm } from '@mantine/form';
import { WidgetSchema } from '@shukun/schema';

import { PresenterWidgetEntity } from '../../../../../repositories/presenter/widget-ref';
import { TabEntity } from '../../../../../repositories/tab/tab-ref';
import { EditorTabWrapper } from '../../../../components/editor-tabs/editor-tab-wrapper';

import { useAppContext } from '../../../../contexts/app-context';

import { useDebounceSave } from '../../hooks/use-debounce-save';

import { Schema } from './internal/schema';

export type WidgetDetailProps = {
  tab: TabEntity;
  widgetEntity: PresenterWidgetEntity;
  definition: WidgetSchema;
};

export const WidgetDetail = ({
  tab,
  widgetEntity,
  definition,
}: WidgetDetailProps) => {
  const app = useAppContext();

  const form = useForm<PresenterWidgetEntity>({
    initialValues: structuredClone(widgetEntity),
  });

  useDebounceSave(form.values, (debounced) => {
    app.repositories.presenterRepository.widgetRepository.update(
      widgetEntity.id,
      debounced,
    );
  });

  if (tab.tabType !== 'widget') {
    return null;
  }

  return (
    <EditorTabWrapper>
      <form>
        <Schema
          form={form}
          definition={definition}
          containerName={tab.containerName}
        />
      </form>
    </EditorTabWrapper>
  );
};
