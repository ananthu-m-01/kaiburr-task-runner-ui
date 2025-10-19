import { CheckCircleOutlined, FileAddOutlined } from "@ant-design/icons";
import { Alert, Button, Card, message, Space, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_TASK } from "../api/taskApi";
import TaskForm from "./TaskForm";

const { Title, Text, Paragraph } = Typography;

const CreateTask: React.FC = () => {
  const [savedTask, setSavedTask] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFinish = async (values: any) => {
    setLoading(true);
    setSavedTask(null);
    setErrorMessage(null);

    try {
      const response = await CREATE_TASK(values);
      setSavedTask(response);
      message.success("✅ Task created successfully!");
    } catch (error: any) {
      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong while saving the task.";
      setErrorMessage(backendMessage);
      message.error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background: "linear-gradient(135deg, #f0f5ff, #ffffff)",
        padding: "60px 20px",
      }}
    >
      <Card
        bordered={false}
        style={{
          width: "100%",
          maxWidth: 700,
          borderRadius: 20,
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          padding: "30px 40px",
        }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div style={{ textAlign: "center" }}>
            <FileAddOutlined style={{ fontSize: 48, color: "#1677ff" }} />
            <Title level={2} style={{ marginTop: 10 }}>
              Create a New Task
            </Title>
            <Paragraph style={{ color: "#666" }}>
              Fill out the form below to add a new automation task.
            </Paragraph>
          </div>

          <Card
            bordered={false}
            style={{
              backgroundColor: "#f9fbff",
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              padding: "24px",
            }}
          >
            <TaskForm mode="create" onFinish={handleFinish} loading={loading} />
          </Card>

          {savedTask && (
            <Alert
              icon={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
              message={
                <Text strong style={{ fontSize: 16 }}>
                  Task Created Successfully!
                </Text>
              }
              description={
                <div style={{ marginTop: 8 }}>
                  <Paragraph style={{ marginBottom: 0 }}>
                    <b>Name:</b> {savedTask.name} <br />
                    <b>Owner:</b> {savedTask.owner} <br />
                    <b>Command:</b> {savedTask.command}
                  </Paragraph>
                  <Button
                    type="primary"
                    shape="round"
                    onClick={() => navigate(`/view-task/${savedTask.id}`)}
                    style={{ marginTop: 10 }}
                  >
                    View Task Details
                  </Button>
                </div>
              }
              type="success"
              showIcon
              style={{
                borderRadius: 10,
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              }}
            />
          )}

          {errorMessage && (
            <Alert
              message="Failed to Save Task"
              description={errorMessage}
              type="error"
              showIcon
              style={{
                borderRadius: 10,
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              }}
            />
          )}

          <Text type="secondary" style={{ display: "block", textAlign: "center" }}>
            Once created, the task will appear in the “View All Tasks” section.
          </Text>
        </Space>
      </Card>
    </div>
  );
};

export default CreateTask;
