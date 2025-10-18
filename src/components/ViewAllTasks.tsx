import { Button, Card, List, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VIEW_ALL_TASKS } from "../api/taskApi";

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

const ViewAllTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await VIEW_ALL_TASKS();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 50 }}>
        <Spin size="large" tip="Loading tasks..." />
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: 50 }}>
        <Title level={4}>No tasks available</Title>
        <Text>Please create some tasks to see them here.</Text>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <Title level={3}> All Tasks</Title>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item>
            <Card title={task.name || "Untitled Task"} style={{ borderRadius: 10 }}>
              <Text strong>Owner:</Text> {task.owner || "N/A"} <br />
              <Text strong>Command:</Text> {task.command || "N/A"} <br />
              <Button
                type="primary"
                style={{ marginTop: 10 }}
                onClick={() => navigate(`/view-task/${task.id}`)}
              >
                See More Details
              </Button>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ViewAllTasks;
