import {
  MetadataSchema,
  ViewSchema,
  ViewDetailGroupType,
  UnknownSourceModel,
} from '@shukun/schema';
import { useDebounceEffect } from 'ahooks';
import {
  Button,
  Form,
  FormInstance,
  FormProps,
  message,
  Tabs,
  TabsProps,
} from 'antd';
import { useObservableState } from 'observable-hooks';
import { useCallback, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router';

import { DetailMode, detailService, mode$ } from '../../../../services/detail';
import { sourceReferenceService } from '../../../../services/source';
import { RoutePath, useOrgPath } from '../../../../utils/history-provider';
import { DETAIL_FORM_ID } from '../../constant';

import { DEFAULT_GROUP_NAME, DetailGroup } from './DetailGroup';

export interface DetailContentProps {
  form: FormInstance<UnknownSourceModel>;
  metadata: MetadataSchema;
  view: ViewSchema;
  source: UnknownSourceModel | null;
}

export const DetailContent = ({
  form,
  metadata,
  view,
  source,
}: DetailContentProps) => {
  const classes = useStyles();

  const mode = useObservableState(mode$);

  const navigate = useNavigate();

  const viewDetailOrgPath = useOrgPath(RoutePath.ViewDetail);

  const viewFieldGroups = useMemo(() => {
    const groups = view.configurations?.detailGroups || [];

    if (groups.length > 0) {
      return groups;
    } else {
      return [
        {
          name: DEFAULT_GROUP_NAME,
          label: view.label,
          type: ViewDetailGroupType.None,
        },
      ];
    }
  }, [view.configurations?.detailGroups, view.label]);

  const handleFinish = useCallback(
    async (values: UnknownSourceModel) => {
      const result = await detailService.saveOne(metadata, source, values);
      if (result) {
        form.setFieldsValue(result as any);
        message.success('已为您成功保存。');

        if (mode === DetailMode.Create) {
          navigate(
            viewDetailOrgPath
              .replace(':viewName', view.name)
              .replace(':sourceId', result._id),
          );
        }
      }
    },
    [metadata, source, form, mode, navigate, viewDetailOrgPath, view.name],
  );

  const handleFinishFailed = useCallback<
    NonNullable<FormProps['onFinishFailed']>
  >(({ values, errorFields }) => {
    const errorMessage = errorFields
      .map((item) => item.errors.join(','))
      .join(', ');
    message.error(errorMessage);
  }, []);

  useDebounceEffect(
    () => {
      if (source) {
        form.setFieldsValue(source as any);
      }
    },
    [form, source],
    { wait: 300 },
  );

  useDebounceEffect(
    () => {
      if (source) {
        sourceReferenceService.fetchReferences(metadata, [source]);
      }
    },
    [metadata, source],
    { wait: 300 },
  );

  const items: TabsProps['items'] = useMemo(() => {
    return viewFieldGroups.map((group) => ({
      key: group.name,
      label: group.label,
      children: (
        <DetailGroup
          key={group.name}
          metadata={metadata}
          view={view}
          viewFieldGroup={group}
        />
      ),
    }));
  }, [metadata, view, viewFieldGroups]);

  return (
    <Form<UnknownSourceModel>
      id={DETAIL_FORM_ID}
      form={form}
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      initialValues={source ?? undefined}
      style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      className="global-view-detail"
    >
      <Tabs className={classes.tabs} items={items} />
      <Button htmlType="submit" style={{ display: 'none' }} />
    </Form>
  );
};

const useStyles = createUseStyles(() => ({
  tabs: {
    background: '#fff',
    '& .ant-tabs-nav': {
      paddingLeft: 24,
    },
  },
}));
