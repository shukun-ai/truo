import {
  MetadataSchema,
  ViewSchema,
  ViewV2FieldGroup,
  ViewV2FieldGroupType,
} from '@shukun/schema';
import { Card, Col, Row } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useMemo } from 'react';
import { CustomMode } from '@shukun/api';

import { DetailMode, mode$ } from '../../../../services/detail';

import { DetailField } from './DetailField';
import { CustomTab } from './DetailCustomTab';

export const DEFAULT_GROUP_NAME = '$$$_DEFAULT';

export interface DetailGroupProps {
  metadata: MetadataSchema;
  view: ViewSchema;
  viewFieldGroup: ViewV2FieldGroup;
}

export const DetailGroup: FunctionComponent<DetailGroupProps> = ({
  metadata,
  view,
  viewFieldGroup,
}) => {
  const mode = useObservableState(mode$, DetailMode.Show);

  const viewFields = useMemo(() => {
    return (view.configurations?.v2Fields || []).filter(
      (field) =>
        field.belongToGroup === viewFieldGroup.name ||
        viewFieldGroup.name === DEFAULT_GROUP_NAME,
    );
  }, [view.configurations?.v2Fields, viewFieldGroup.name]);

  return (
    <Card bordered={false}>
      <Row>
        {viewFields.map((field) => (
          <Col key={field.name} span={8}>
            <DetailField
              metadata={metadata}
              viewField={field}
              detailMode={mode}
            />
          </Col>
        ))}
      </Row>

      {viewFieldGroup.type === ViewV2FieldGroupType.CustomTab && (
        <CustomTab
          metadata={metadata}
          view={view}
          viewFieldGroup={viewFieldGroup}
        />
      )}
    </Card>
  );
};
