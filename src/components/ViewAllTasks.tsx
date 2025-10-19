import {
  CodeOutlined,
  EyeOutlined,
  SearchOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Empty,
  Input,
  List,
  Row,
  Space,
  Spin,
  Tag,
  Typography,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_TASK_BY_NAME, VIEW_ALL_TASKS } from "../api/taskApi";

const { Title, Text } = Typography;
const { Search } = Input;

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
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Load all tasks initially
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await VIEW_ALL_TASKS();
        setTasks(data);
        setFilteredTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        message.error("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // 🔍 Handle search only when user presses Enter or clicks search button
  const handleSearch = async (value: string) => {
    if (!value.trim()) {
      setFilteredTasks(tasks); // reset if search is cleared
      return;
    }

    try {
      setLoading(true);
      const data = await GET_TASK_BY_NAME(value);
      setFilteredTasks(data);
    } catch (error) {
      message.error("Error fetching tasks by name");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 80 }}>
        <Spin size="large" tip="Loading tasks..." />
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px 60px",
        background: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <Row justify="space-between" align="middle" style={{ marginBottom: 30 }}>
        <Col>
          <Title level={3} style={{ margin: 0 }}>
            <ThunderboltOutlined style={{ color: "#1677ff" }} /> All Tasks
          </Title>
          <Text type="secondary">
            Browse through all created tasks and view detailed executions.
          </Text>
        </Col>

        <Col>
          <Search
            placeholder="Search tasks..."
            allowClear
            enterButton={<SearchOutlined />}
            onSearch={handleSearch} // only triggers on Enter or button click
            style={{
              width: 280,
              borderRadius: 8,
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
          />
        </Col>
      </Row>

      {filteredTasks.length === 0 ? (
        <Empty
          description={
            <span>
              <Text strong>No tasks found</Text>
              <br />
              Try adjusting your search or create a new task.
            </span>
          }
        />
      ) : (
        <List
          grid={{ gutter: 24, column: 3 }}
          dataSource={filteredTasks}
          renderItem={(task) => (
            <List.Item>
              <Card
                title={
                  <Space>
                    <ThunderboltOutlined style={{ color: "#1677ff" }} />
                    <Text strong>{task.name || "Untitled Task"}</Text>
                  </Space>
                }
                bordered={false}
                hoverable
                style={{
                  borderRadius: 14,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                  transition: "0.3s",
                }}
              >
                <Space direction="vertical" size="small" style={{ width: "100%" }}>
                  <Text>
                    <UserOutlined style={{ color: "#1677ff" }} /> <b>Owner:</b>{" "}
                    {task.owner || "N/A"}
                  </Text>
                  <Text>
                    <CodeOutlined style={{ color: "#fa8c16" }} /> <b>Command:</b>{" "}
                    <Text code>{task.command}</Text>
                  </Text>

                  {task.taskExecutions && task.taskExecutions.length > 0 ? (
                    <Tag
                      color={
                        task.taskExecutions[0].status === "SUCCESS"
                          ? "green"
                          : task.taskExecutions[0].status === "FAILED"
                          ? "red"
                          : "blue"
                      }
                      style={{ marginTop: 8 }}
                    >
                      Last Run: {task.taskExecutions[0].status}
                    </Tag>
                  ) : (
                    <Tag color="default" style={{ marginTop: 8 }}>
                      Never Executed
                    </Tag>
                  )}

                  <Button
                    type="primary"
                    icon={<EyeOutlined />}
                    onClick={() => navigate(`/view-task/${task.id}`)}
                    style={{ marginTop: 10 }}
                  >
                    View Details
                  </Button>
                </Space>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default ViewAllTasks;