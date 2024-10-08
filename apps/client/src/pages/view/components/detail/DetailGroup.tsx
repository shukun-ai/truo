import { LegacyFunctionComponent } from '@shukun/component';
import {
  MetadataSchema,
  ViewSchema,
  ViewDetailGroup,
  ViewDetailGroupType,
} from '@shukun/schema';
import { Card, Col, Row } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useMemo } from 'react';

import { DetailMode, mode$ } from '../../../../services/detail';

import { CustomTab } from './DetailCustomTab';
import { DetailField } from './DetailField';

export const DEFAULT_GROUP_NAME = '$$$_DEFAULT';

export interface DetailGroupProps {
  metadata: MetadataSchema;
  view: ViewSchema;
  viewFieldGroup: ViewDetailGroup;
}

export const DetailGroup: LegacyFunctionComponent<DetailGroupProps> = ({
  metadata,
  view,
  viewFieldGroup,
}) => {
  const mode = useObservableState(mode$, DetailMode.Show);

  const viewFields = useMemo(() => {
    return (view.configurations?.detailFields || []).filter(
      (field) =>
        field.belongToGroup === viewFieldGroup.name ||
        viewFieldGroup.name === DEFAULT_GROUP_NAME,
    );
  }, [view.configurations?.detailFields, viewFieldGroup.name]);

  return (
    <Card bordered={false}>
      <Row>
        {viewFields.map((field) => (
          <Col key={field.name} span={8}>
            <DetailField
              metadata={metadata}
              viewDetailField={field}
              detailMode={mode}
            />
          </Col>
        ))}
      </Row>

      {viewFieldGroup.type === ViewDetailGroupType.CustomTab && (
        <CustomTab
          metadata={metadata}
          view={view}
          viewFieldGroup={viewFieldGroup}
        />
      )}
    </Card>
  );
};
