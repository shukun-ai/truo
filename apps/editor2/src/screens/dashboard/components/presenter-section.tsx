import { Table } from '@mantine/core';

export type PresenterSectionProps = {
  //
};

export const PresenterSection = () => {
  return (
    <Table>
      <thead>
        <tr>
          <th>应用标识</th>
          <th>应用名称</th>
          <th>最后编辑时间</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>admin</td>
          <td>管理后台</td>
          <td>2023-03-03 08:00:00</td>
        </tr>
      </tbody>
    </Table>
  );
};
