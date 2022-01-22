import { MetadataSchema } from '@shukun/schema';

import { UnknownSourceModel } from '../../models/source';
import { MetadataRequest } from '../../utils/axios';
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
    const request = new MetadataRequest(metadata);
    const response = await request.findOne({ filter: { _id: sourceId } });
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
      const request = new MetadataRequest(metadata);
      await request.updateOne(source._id, newSource);
      detailStore.update(({ source }) => ({
        source: { ...source, ...newSource },
      }));
      detailStore.update(() => ({ mode: DetailMode.Show }));
      return { ...source, ...newSource };
    }

    if (mode === DetailMode.Create) {
      const request = new MetadataRequest(metadata);
      const response = await request.createAndFindOne(newSource);
      detailStore.update(({ source }) => ({
        source: { ...source, ...response.data.value },
      }));
      detailStore.update(() => ({ mode: DetailMode.Show }));
      return { ...source, ...response.data.value };
    }
  }

  async removeOne(sourceId: IDString, metadata: MetadataSchema) {
    detailStore.setLoading(true);
    const request = new MetadataRequest(metadata);
    await request.removeOne(sourceId);
    detailStore.setLoading(false);
    return true;
  }

  reset() {
    detailStore.reset();
  }
}

export const detailService = new DetailService();
