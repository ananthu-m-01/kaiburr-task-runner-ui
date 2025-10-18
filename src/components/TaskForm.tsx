import { Button, Form, Input } from "antd";
import React from "react";

interface TaskFormProps {
  initialValues?: {
    name?: string;
    owner?: string;
    command?: string;
  };
  onFinish: (values: any) => void;
  mode?: "create" | "update";
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialValues,
  onFinish,
  mode = "create",
}) => {
  const [form] = Form.useForm();

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      initialValues={initialValues}
    >
      <Form.Item
        label="Task Name"
        name="name"
        rules={[
          { required: true, message: "Please enter a task name" },
          { max: 100, message: "Task name cannot exceed 100 characters" },
        ]}
      >
        <Input placeholder="Enter task name" />
      </Form.Item>

      <Form.Item
        label="Owner"
        name="owner"
        rules={[{ required: true, message: "Please enter owner name" }]}
      >
        <Input placeholder="Enter owner name" />
      </Form.Item>

      <Form.Item
        label="Command"
        name="command"
        rules={[{ required: true, message: "Please enter command" }]}
      >
        <Input placeholder="Enter command (e.g., ping google.com)" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          style={{ borderRadius: 6 }}
        >
          {mode === "create" ? "Create Task" : "Update Task"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
