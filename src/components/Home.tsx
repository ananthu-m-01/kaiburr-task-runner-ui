import { PlusOutlined, RocketOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f5ff, #ffffff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <Card
        style={{
          maxWidth: 700,
          width: "100%",
          textAlign: "center",
          borderRadius: 20,
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          padding: "40px 30px",
        }}
      >
        <RocketOutlined style={{ fontSize: 48, color: "#1677ff", marginBottom: 20 }} />
        <Title level={2} style={{ marginBottom: 10 }}>
          Kaiburr Task Runner
        </Title>

        <Paragraph style={{ fontSize: 16, color: "#555", marginBottom: 30 }}>
          Manage, execute, and monitor your automation tasks with real-time insights.
        </Paragraph>

        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12}>
            <Card
              hoverable
              bordered={false}
              style={{
                borderRadius: 12,
                backgroundColor: "#f6f9ff",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <PlusOutlined style={{ fontSize: 36, color: "#1677ff" }} />
              <Title level={4} style={{ marginTop: 10 }}>
                Add Task
              </Title>
              <Paragraph style={{ color: "#666", fontSize: 14 }}>
                Create a new task with command execution and monitoring.
              </Paragraph>
              <Button
                type="primary"
                size="middle"
                shape="round"
                onClick={() => navigate("/create-task")}
              >
                Create Task
              </Button>
            </Card>
          </Col>

          <Col xs={24} sm={12}>
            <Card
              hoverable
              bordered={false}
              style={{
                borderRadius: 12,
                backgroundColor: "#f6f9ff",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <UnorderedListOutlined style={{ fontSize: 36, color: "#1677ff" }} />
              <Title level={4} style={{ marginTop: 10 }}>
                View All Tasks
              </Title>
              <Paragraph style={{ color: "#666", fontSize: 14 }}>
                Browse and manage all your existing automated tasks.
              </Paragraph>
              <Button
                type="primary"
                size="middle"
                shape="round"
                onClick={() => navigate("/view-tasks")}
              >
                View Tasks
              </Button>
            </Card>
          </Col>
        </Row>

        <Text type="secondary" style={{ display: "block", marginTop: 30 }}>
          © 2025 Kaiburr Task Runner | Built with React & Ant Design
        </Text>
      </Card>
    </div>
  );
};

export default Home;
