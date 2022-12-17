import { Form } from 'antd';
import React, { FunctionComponent } from 'react';

export interface EventNodeFormProps {
  initialValues: any;
}

export const EventNodeForm: FunctionComponent<EventNodeFormProps> = ({
  initialValues,
  children,
}) => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelAlign="left"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {children}
    </Form>
  );
};
