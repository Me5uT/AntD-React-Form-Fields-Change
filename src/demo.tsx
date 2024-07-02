import './index.css';
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [showSaveButton, setShowSaveButton] = useState(false);

  const initialValues = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  const onValuesChange = (changedValues, allValues) => {
    const isAnyFieldChanged = Object.keys(initialValues).some(
      (key) => initialValues[key] !== allValues[key]
    );
    const areAllFieldsValid = form
      .getFieldsError()
      .every((field) => field.errors.length === 0);

    setShowSaveButton(isAnyFieldChanged && areAllFieldsValid);
  };

  const onFieldsChange = (changedFields, allFields) => {
    const isAnyFieldChanged = Object.keys(initialValues).some(
      (key) => initialValues[key] !== form.getFieldValue(key)
    );
    const areAllFieldsValid = allFields.every(
      (field) => field.errors.length === 0
    );

    setShowSaveButton(isAnyFieldChanged && areAllFieldsValid);
  };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onValuesChange={onValuesChange}
      onFieldsChange={onFieldsChange}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { type: 'email', message: 'The input is not valid E-mail!' },
          { required: true, message: 'Please input your E-mail!' },
        ]}
      >
        <Input />
      </Form.Item>

      {showSaveButton && (
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default App;
