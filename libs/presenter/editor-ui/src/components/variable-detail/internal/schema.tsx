import { Alert, Box, List, Title } from '@mantine/core';

import { SchemaEditor } from '@shukun/component';
import { PresenterVariable } from '@shukun/schema';

export type SchemaProps = {
  value: PresenterVariable;
  onChange: (newValue: PresenterVariable) => void;
};

export const Schema = ({ value, onChange }: SchemaProps) => {
  return (
    <Box>
      <Title order={5} mb="md">
        定义变量类型表（Schema）
      </Title>
      <Alert mb="md">
        <List>
          <List.Item>如果要设置为字符串，则将根节点设为字符串</List.Item>
          <List.Item>
            如果要设置为对象，则将根节点设为对象，然后添加新的属性
          </List.Item>
          <List.Item>
            所有属性均为选填（optional），不支持设置为必填（required）
          </List.Item>
        </List>
      </Alert>
      <SchemaEditor
        value={value.schema ?? {}}
        onChange={(newValue) => {
          onChange({
            ...value,
            schema: newValue ? (newValue as any) : undefined,
          });
        }}
      />
    </Box>
  );
};
