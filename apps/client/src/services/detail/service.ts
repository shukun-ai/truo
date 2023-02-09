import { MetadataSchema, UnknownSourceModel } from '@shukun/schema';

import { createSourceRequester } from '../../apis/requester';

import { IDString } from '../../utils/model-helpers';

import { DetailMode } from './model';
import { DetailState, detailStore } from './store';

class DetailService {
  set(options: Partial<DetailState>) {
    detailStore.update(options);
  }

  setCreateMode() {
    detailStore.update(() => ({ mode: DetailMode.Create }));
  }

  setShowMode() {
    detailStore.update(() => ({ mode: DetailMode.Show }));
  }

  async findOne(sourceId: IDString, metadata: MetadataSchema) {
    detailStore.setLoading(true);
    const requester = createSourceRequester(metadata.name);
    const response = await requester.findIdOrThrow(sourceId);
    detailStore.update({ source: response.data.value });
    detailStore.setLoading(false);
  }

  async saveOne(
    metadata: MetadataSchema,
    source: UnknownSourceModel | null,
    newSource: UnknownSourceModel,
  ) {
    const { mode } = detailStore.getValue();

    if (mode === DetailMode.Edit && source) {
      const requester = createSourceRequester(metadata.name);
      await requester.update(source._id, newSource);
      detailStore.update(({ source }) => ({
        source: { ...source, ...newSource },
      }));
      detailStore.update(() => ({ mode: DetailMode.Show }));
      return { ...source, ...newSource };
    }

    if (mode === DetailMode.Create) {
      const requester = createSourceRequester(metadata.name);
      const { data } = await requester.create(newSource);
      const response = await requester.findIdOrThrow(data.value._id);

      detailStore.update(({ source }) => ({
        source: { ...source, ...response.data.value },
      }));
      detailStore.update(() => ({ mode: DetailMode.Show }));
      return { ...source, ...response.data.value };
    }

    return;
  }

  async removeOne(sourceId: IDString, metadata: MetadataSchema) {
    detailStore.setLoading(true);
    const requester = createSourceRequester(metadata.name);
    await requester.delete(sourceId);
    detailStore.setLoading(false);
    return true;
  }

  reset() {
    detailStore.reset();
  }
}

export const detailService = new DetailService();
