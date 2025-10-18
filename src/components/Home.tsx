import { Button, Card, Space, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <Title level={2}>Welcome to Kaiburr Task Runner </Title>
      <Paragraph style={{ fontSize: "16px", color: "#555" }}>
        Manage, execute, and monitor your tasks efficiently with real-time output.
      </Paragraph>

      <Space direction="vertical" size="large" style={{ marginTop: "40px", width: "100%" }}>
        <Card
          style={{
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Title level={4}>Your task automation hub</Title>
          <Paragraph>View all tasks and explore detailed execution insights.</Paragraph>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/view-tasks")}
          >
            View All Tasks
          </Button>
        </Card>
      </Space>
    </div>
  );
};

export default Home;
