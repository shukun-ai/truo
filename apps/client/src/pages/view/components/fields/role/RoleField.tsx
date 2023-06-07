import { LegacyFunctionComponent } from '@shukun/component';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useMemo } from 'react';

import { roles$ } from '../../../../../services/role/query';
import { ColumnFieldProps } from '../interfaces';
import { TagSelect } from '../single-select/TagSelect';

export const RoleField: LegacyFunctionComponent<ColumnFieldProps> = ({
  row,
  electronName,
}) => {
  const roles = useObservableState(roles$);

  const options = useMemo(() => {
    return (roles || []).map((item) => ({
      key: item.name,
      label: item.label,
    }));
  }, [roles]);

  const value = useMemo<string[]>(() => {
    const value = row?.[electronName];
    return Array.isArray(value) ? value : [];
  }, [electronName, row]);

  return (
    <>
      {value.map((key) => (
        <TagSelect key={key} keyName={key} options={options} />
      ))}
    </>
  );
};
