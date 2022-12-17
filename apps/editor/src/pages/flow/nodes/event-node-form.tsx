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
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {children}
    </Form>
  );
};
