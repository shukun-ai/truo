import { useForm } from '@mantine/form';
import { RepositorySchema } from '@shukun/schema';

import { PresenterRepositoryEntity } from '../../../../../repositories/presenter/repository-ref';
import { TabEntity } from '../../../../../repositories/tab/tab-ref';
import { EditorTabWrapper } from '../../../../components/editor-tabs/editor-tab-wrapper';
import { useAppContext } from '../../../../contexts/app-context';

import { useDebounceSave } from '../../hooks/use-debounce-save';

import { Schema } from './internal/schema';

export type RepositoryDetailProps = {
  tab: TabEntity;
  repositoryEntity: PresenterRepositoryEntity;
  definition: RepositorySchema;
};

export const RepositoryDetail = ({
  tab,
  repositoryEntity,
  definition,
}: RepositoryDetailProps) => {
  const form = useForm<PresenterRepositoryEntity>({
    initialValues: structuredClone(repositoryEntity),
  });

  const app = useAppContext();

  useDebounceSave(form.values, (debounced) => {
    app.repositories.presenterRepository.repositoryRepository.update(
      repositoryEntity.id,
      debounced,
    );
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
