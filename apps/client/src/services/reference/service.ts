import { MetadataSchema, ViewSchema, ViewType } from '@shukun/schema';

import { createSourceRequester } from '../../apis/requester';

import { sourceReferenceService } from '../source';
import { viewsStore } from '../view/store';

import { ReferenceModalError } from './classes/ReferenceModalError';
import { initialState, ReferenceState, referenceStore } from './store';

class ReferenceService {
  set(options: Partial<ReferenceState>) {
    referenceStore.update(options);
  }

  openModal(
    options: Required<
      Pick<
        ReferenceState,
        | 'modalVisible'
        | 'modalLabel'
        | 'electronReferenceTo'
        | 'selectionType'
        | 'excludedIds'
        | 'onFinish'
      >
    > & { viewName?: string },
  ) {
    const { viewName, electronReferenceTo } = options;

    if (!viewName) {
      throw new ReferenceModalError(
        '未配置 referenceViewName，请联系管理员或客服。',
      );
    }

    if (!electronReferenceTo) {
      throw new ReferenceModalError(
        '未配置 electronReferenceTo，请联系管理员或客服。',
      );
    }

    const { entities } = viewsStore.getValue();

    let view: ViewSchema | undefined;

    if (!entities) {
      throw new ReferenceModalError('视图未成功加载。');
    }

    Object.keys(entities).forEach((name) => {
      if (entities[name].name === viewName) {
        view = entities[name];
      }
    });

    if (!view) {
      throw new ReferenceModalError('配置的视图不存在，请联系管理员或客服。');
    }

    if (view.atomName !== electronReferenceTo) {
      throw new ReferenceModalError(
        '配置的视图与外键模型不匹配，请联系管理员或客服。',
      );
    }

    if (view.type !== ViewType.Simple) {
      throw new ReferenceModalError(
        '配置的视图的类型不支持关联操作，请联系管理员或客服。',
      );
    }

    referenceStore.update(() => ({ ...options, view }));
  }

  async findMany(
    metadata: MetadataSchema,
    options?: { limit?: number; skip?: number },
  ) {
    referenceStore.setLoading(true);
    const { excludedIds } = referenceStore.getValue();

    const requester = createSourceRequester(metadata.name);
    const response = await requester.query({
      ...options,
      filter: { _id: { $nin: excludedIds } },
      count: true,
    });
    referenceStore.set(response.data.value);
    referenceStore.update({ totalPages: response.data.count });

    // fetch reference
    // @todo it's not best practice, should use Dependency Injection or extract into hooks for Unit Test
    await sourceReferenceService.fetchReferences(metadata, response.data.value);

    referenceStore.setLoading(false);
  }

  resetFilters() {
    referenceStore.update(() => ({
      active: initialState.active,
      pageSize: initialState.pageSize,
      totalPages: initialState.totalPages,
      currentPage: initialState.currentPage,
    }));
  }

  reset() {
    referenceStore.reset();
  }
}

export const referenceService = new ReferenceService();
