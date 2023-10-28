import { Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { EditorTabWrapper } from '@shukun/component';
import { PresenterVariable } from '@shukun/schema';

import {
  VariableEntity,
  TabEntity,
  useEditorContext,
} from '../../editor-context';
import { useDebounceSave } from '../../hooks/use-debounce-save';

import { Schema } from './internal/schema';

export type VariableDetailProps = {
  tab: TabEntity;
  variableEntity: VariableEntity;
  variableId: string;
};

export const VariableDetail = ({
  tab,
  variableEntity,
  variableId,
}: VariableDetailProps) => {
  const { dispatch } = useEditorContext();

  const form = useForm<PresenterVariable>({
    initialValues: structuredClone(variableEntity),
  });

  useDebounceSave(form.values, (debounced) => {
    dispatch.variable.update(variableEntity.id, debounced);
  });

  return (
    <EditorTabWrapper>
      <form>
        <Title order={3} mb="md">
          $.{variableId}
        </Title>
        <Schema
          value={form.values}
          onChange={(newValue) => form.setValues(newValue)}
        />
      </form>
    </EditorTabWrapper>
  );
};
