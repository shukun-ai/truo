import { ViewSchema } from '@shukun/schema';
import React, { FunctionComponent } from 'react';
import { AiOutlineCloudServer } from 'react-icons/ai';

import { RibbonButton } from '../../../../../components/ribbon/RibbonButton';

export interface TableCsvButtonProps {
  view: ViewSchema;
}

export const TableCsvButton: FunctionComponent<TableCsvButtonProps> = ({
  view,
}) => {
  return (
    <RibbonButton
      name="csv"
      label="导出 CSV"
      icon={<AiOutlineCloudServer />}
      disabled
      disabledTip="很抱歉，暂未开放该导出功能。"
    />
  );
};
