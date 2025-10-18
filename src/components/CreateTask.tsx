import { Alert, Button, Card, message, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_TASK } from "../api/taskApi";
import TaskForm from "./TaskForm";

const { Title, Text } = Typography;

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
      message.success("Task saved successfully to database!");
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
        display: "flex",
        justifyContent: "center",
        padding: "50px 20px",
        minHeight: "100vh",
        background: "#f5f5f5",
      }}
    >
      <Card
        title={<Title level={3}>Create New Task</Title>}
        style={{
          width: "100%",
          maxWidth: 600,
          borderRadius: 12,
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <TaskForm mode="create" onFinish={handleFinish} loading={loading} />

        {savedTask && (
          <Alert
            message="Task Saved Successfully!"
            description={
              <div>
                <p><b>Name:</b> {savedTask.name}</p>
                <p><b>Owner:</b> {savedTask.owner}</p>
                <p><b>Command:</b> {savedTask.command}</p>
                <Button
                  type="primary"
                  onClick={() => navigate(`/view-task/${savedTask.id}`)}
                  style={{ marginTop: 10 }}
                >
                  See More Details
                </Button>
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
