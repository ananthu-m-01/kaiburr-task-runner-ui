import { Card, List, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await VIEW_ALL_TASKS();
      setTasks(data);
      setLoading(false);
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
      <Title level={3}>📋 All Tasks</Title>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item>
            <Card title={task.name || "Untitled Task"} style={{ borderRadius: 10 }}>
              <Text strong>Owner:</Text> {task.owner || "N/A"} <br />
              <Text strong>Command:</Text> {task.command || "N/A"} <br />
              <Text strong>Executions:</Text>{" "}
              {task.taskExecutions.length > 0
                ? task.taskExecutions.map((exe, index) => (
                    <div key={index} style={{ marginTop: 5 }}>
                      <Text type={exe.status === "SUCCESS" ? "success" : "danger"}>
                        [{exe.status}]
                      </Text>{" "}
                      {new Date(exe.startTime).toLocaleString()} -{" "}
                      {new Date(exe.endTime).toLocaleString()}
                    </div>
                  ))
                : "No executions yet."}
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ViewAllTasks;
