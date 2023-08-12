import { useForm } from '@mantine/form';
import { EditorTabWrapper } from '@shukun/component';
import { PresenterWidget, WidgetSchema } from '@shukun/schema';

import {
  TabEntity,
  WidgetEntity,
  useEditorContext,
} from '../../editor-context';
import { useDebounceSave } from '../../hooks/use-debounce-save';

import { Schema } from './internal/schema';

export type WidgetDetailProps = {
  tabEntity: TabEntity;
  widgetEntity: WidgetEntity;
  widgetDefinition: WidgetSchema;
};

export const WidgetDetail = ({
  tabEntity,
  widgetEntity,
  widgetDefinition,
}: WidgetDetailProps) => {
  const { dispatch } = useEditorContext();
  const { widget } = dispatch;

  const form = useForm<PresenterWidget>({
    initialValues: structuredClone(widgetEntity),
  });

  useDebounceSave(form.values, (debounced) => {
    widget.update(widgetEntity.id, debounced);
  });

  if (tabEntity.tabType !== 'widget') {
    return null;
  }

  return (
    <EditorTabWrapper>
      <form>
        <Schema form={form} definition={widgetDefinition} />
      </form>
    </EditorTabWrapper>
  );
};
