import { Alert, Button, Card, List, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_TASK_BY_ID, RUN_TASK } from "../api/taskApi";


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
  const [running, setRunning] = useState<boolean>(false);
  const [terminalOutput, setTerminalOutput] = useState<string>("");

  const fetchTask = async () => {
    setLoading(true);
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

  useEffect(() => {
    fetchTask();
  }, [id]);

  const handleRunTask = async () => {
    if (!task) return;
    setRunning(true);
    setTerminalOutput("");
    try {
      const execution = await RUN_TASK(task.id);
      setTerminalOutput(execution.output);
      // Refresh task executions
      await fetchTask();
    } catch (err: any) {
      const msg =
        err.response?.data?.message || "Failed to run task. Command may be unsafe.";
      setTerminalOutput(msg);
    } finally {
      setRunning(false);
    }
  };

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

      <Card style={{ borderRadius: 10, marginBottom: 20 }}>
        <Text strong>Name:</Text> {task.name || "N/A"} <br />
        <Text strong>Owner:</Text> {task.owner || "N/A"} <br />
        <Text strong>Command:</Text> {task.command || "N/A"} <br />
        <Button
          type="primary"
          onClick={handleRunTask}
          loading={running}
          style={{ marginTop: 10 }}
        >
          Run Task
        </Button>
      </Card>

      <Card style={{ borderRadius: 10, marginBottom: 20 }}>
        <Text strong>Terminal Output:</Text>
        <pre
          style={{
            backgroundColor: "#000",
            color: "#0f0",
            minHeight: 150,
            padding: 10,
            overflow: "auto",
            borderRadius: 6,
            marginTop: 5,
          }}
        >
          {terminalOutput || "Output will appear here after running the task..."}
        </pre>
      </Card>

      <Card style={{ borderRadius: 10 }}>
        <Text strong>Previous Executions:</Text>
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
