import { useForm } from '@mantine/form';

import { PresenterWatchEntity } from '../../../../../repositories/presenter/watch-ref';
import { TabEntity } from '../../../../../repositories/tab/tab-ref';
import { EditorTabWrapper } from '../../../../components/editor-tabs/editor-tab-wrapper';
import { useAppContext } from '../../../../contexts/app-context';

import { useDebounceSave } from '../../hooks/use-debounce-save';

import { Schema } from './internal/schema';

export type WatchDetailProps = {
  tab: TabEntity;
  watchEntity: PresenterWatchEntity;
};

export const WatchDetail = ({ tab, watchEntity }: WatchDetailProps) => {
  const form = useForm<PresenterWatchEntity>({
    initialValues: structuredClone(watchEntity),
  });

  const app = useAppContext();

  useDebounceSave(form.values, (debounced) => {
    app.repositories.presenterRepository.watchRepository.update(
      watchEntity.id,
      debounced,
    );
  });

  return (
    <EditorTabWrapper>
      <form>
        <Schema
          watchEntity={watchEntity}
          value={form.values}
          onChange={(newValue) => {
            form.setValues(newValue);
          }}
        />
      </form>
    </EditorTabWrapper>
  );
};
