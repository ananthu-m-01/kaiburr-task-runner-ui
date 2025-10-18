import { Alert, Card, List, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_TASK_BY_ID } from "../api/taskApi";

const { Title, Text } = Typography;

interface TaskExecution {
  startTime: string;
  endTime: string;
  output: string;
  status: string;
}

interface Task {
  id: string;
  name: string;
  owner: string;
  command: string;
  taskExecutions: TaskExecution[];
}

const ViewTask: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await GET_TASK_BY_ID(id!);
        setTask(data);
        setError(null);
      } catch (err: any) {
        if (err.response && err.response.status === 404) {
          setError("Task not found (404)");
        } else {
          setError("Failed to fetch task details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 50 }}>
        <Spin size="large" tip="Loading task details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: 50 }}>
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  if (!task) return null;

  return (
    <div style={{ padding: 20 }}>
      <Title level={3}>Task Details</Title>
      <Card style={{ borderRadius: 10 }}>
        <Text strong>Name:</Text> {task.name || "N/A"} <br />
        <Text strong>Owner:</Text> {task.owner || "N/A"} <br />
        <Text strong>Command:</Text> {task.command || "N/A"} <br />
        <Text strong>Executions:</Text>
        {task.taskExecutions.length > 0 ? (
          <List
            dataSource={task.taskExecutions}
            renderItem={(exe, index) => (
              <List.Item key={index}>
                <Text
                  type={
                    exe.status === "SUCCESS"
                      ? "success"
                      : exe.status === "FAILED"
                      ? "danger"
                      : "secondary"
                  }
                >
                  [{exe.status}]
                </Text>{" "}
                {new Date(exe.startTime).toLocaleString()} -{" "}
                {new Date(exe.endTime).toLocaleString()} <br />
                <Text>{exe.output}</Text>
              </List.Item>
            )}
          />
        ) : (
          <Text type="secondary">No executions yet.</Text>
        )}
      </Card>
    </div>
  );
};

export default ViewTask;
