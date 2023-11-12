import { Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { EditorTabWrapper } from '@shukun/component';

import { ViewEntity, TabEntity, useEditorContext } from '../../editor-context';
import { useDebounceSave } from '../../hooks/use-debounce-save';

import { Schema } from './internal/schema';
import { SaveButton } from './save/save-button';

export type ViewDetailProps = {
  tab: TabEntity;
  viewEntity: ViewEntity;
  viewId: string;
};

export const ViewDetail = ({ tab, viewEntity, viewId }: ViewDetailProps) => {
  const { dispatch } = useEditorContext();

  const form = useForm<ViewEntity>({
    initialValues: structuredClone(viewEntity),
  });

  useDebounceSave(form.values, (debounced) => {
    dispatch.view.update(debounced);
  });

  return (
    <EditorTabWrapper>
      <SaveButton viewName={viewEntity.name} />
      <form>
        <Title order={3} mb="md">
          {viewEntity.label}
        </Title>
        <Schema
          value={form.values}
          onChange={(newValue) => form.setValues(newValue)}
        />
      </form>
    </EditorTabWrapper>
  );
};
