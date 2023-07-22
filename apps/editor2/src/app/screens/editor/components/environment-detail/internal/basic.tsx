import { Card, Switch, TextInput } from '@mantine/core';

import { UseFormReturnType } from '@mantine/form';

import { EnvironmentEntity } from '../../../../../../repositories/environment/environment-ref';

export type BasicProps = {
  form: UseFormReturnType<
    EnvironmentEntity,
    (values: EnvironmentEntity) => EnvironmentEntity
  >;
  disabled?: boolean;
};

export const Basic = ({ form, disabled }: BasicProps) => {
  return (
    <Card withBorder mt={12} mb={6}>
      <TextInput
        label="默认值"
        {...form.getInputProps('value')}
        description="环境变量的默认值允许被运行时系统覆盖"
        mb={12}
        disabled={disabled}
      />
      <Switch
        label="是否公开"
        description="非公开的环境变量仅服务器内部可访问，用于保护安全，密钥请设置为非公开。前端访问数据必须设置为公开，否则无法被使用，公钥请设置为公开。"
        {...form.getInputProps('isPublic', { type: 'checkbox' })}
        disabled={disabled}
      />
      <TextInput
        label="描述"
        {...form.getInputProps('description')}
        description="用于备注的描述性文本"
        disabled={disabled}
      />
    </Card>
  );
};
