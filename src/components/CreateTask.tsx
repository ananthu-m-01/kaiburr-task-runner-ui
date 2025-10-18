import { Alert, Button, Card, Form, Input, message, Typography } from "antd";
import { useState } from "react";
import { CREATE_TASK } from "../api/taskApi";

const { Title, Text } = Typography;

const CreateTask = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [savedTask, setSavedTask] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onFinish = async (values: any) => {
    setLoading(true);
    setErrorMessage(null);
    setSavedTask(null);

    try {
      const response = await CREATE_TASK(values);

      message.success("Task saved successfully to database!");

      setSavedTask(response);

      form.resetFields();

    } catch (error: any) {
      console.error("Error creating task:", error);

      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong while saving the task.";

      setErrorMessage(backendMessage);
      message.error(`${backendMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "50px 20px",
        minHeight: "100vh",
        background: "#f5f5f5",
      }}
    >
      <Card
        title={<Title level={3}> Create New Task</Title>}
        style={{
          width: "100%",
          maxWidth: 600,
          borderRadius: 12,
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
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
              loading={loading}
              block
              style={{ borderRadius: 6 }}
            >
              Create Task
            </Button>
          </Form.Item>
        </Form>

        {/*Show success or error message below form */}
        {savedTask && (
          <Alert
            message="Task Saved Successfully!"
            description={
              <div>
                <p><b>Name:</b> {savedTask.name}</p>
                <p><b>Owner:</b> {savedTask.owner}</p>
                <p><b>Command:</b> {savedTask.command}</p>
              </div>
            }
            type="success"
            showIcon
            style={{ marginTop: 20 }}
          />
        )}

        {errorMessage && (
          <Alert
            message="Failed to Save Task"
            description={errorMessage}
            type="error"
            showIcon
            style={{ marginTop: 20 }}
          />
        )}

        <Text type="secondary" style={{ display: "block", marginTop: 20 }}>
          After creation, the task will appear in the “View All Tasks” section.
        </Text>
      </Card>
    </div>
  );
};

export default CreateTask;
