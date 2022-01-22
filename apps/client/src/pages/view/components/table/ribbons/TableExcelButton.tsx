import { ViewSchema } from '@shukun/schema';
import React, { FunctionComponent } from 'react';
import { AiOutlineFileExcel } from 'react-icons/ai';

import { RibbonButton } from '../../../../../components/ribbon/RibbonButton';

export interface TableExcelButtonProps {
  view: ViewSchema;
}

export const TableExcelButton: FunctionComponent<TableExcelButtonProps> = ({
  view,
}) => {
  return (
    <RibbonButton
      name="excel"
      label="导出 Excel"
      icon={<AiOutlineFileExcel />}
      confirmedTip="你确定要导出成 Excel 吗？"
    />
  );
};
