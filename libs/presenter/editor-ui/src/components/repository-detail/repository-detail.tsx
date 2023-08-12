import { useForm } from '@mantine/form';
import { EditorTabWrapper } from '@shukun/component';
import { PresenterRepository, RepositorySchema } from '@shukun/schema';

import {
  RepositoryEntity,
  TabEntity,
  useEditorContext,
} from '../../editor-context';
import { useDebounceSave } from '../../hooks/use-debounce-save';

import { Schema } from './internal/schema';

export type RepositoryDetailProps = {
  tab: TabEntity;
  repositoryEntity: RepositoryEntity;
  definition: RepositorySchema;
};

export const RepositoryDetail = ({
  tab,
  repositoryEntity,
  definition,
}: RepositoryDetailProps) => {
  const { dispatch } = useEditorContext();

  const form = useForm<PresenterRepository>({
    initialValues: structuredClone(repositoryEntity),
  });

  useDebounceSave(form.values, (debounced) => {
    dispatch.repository.update(repositoryEntity.id, debounced);
  });

  return (
    <EditorTabWrapper>
      <form>
        <Schema
          value={form.values}
          onChange={(newValue) => form.setValues(newValue)}
          definition={definition}
        />
      </form>
    </EditorTabWrapper>
  );
};
