import { CheckCircleOutlined, ClockCircleOutlined, CodeOutlined, DeleteOutlined, EditOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Col, List, Modal, Row, Space, Spin, Tag, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DELETE_TASK, GET_TASK_BY_ID, RUN_TASK, UPDATE_TASK } from "../api/taskApi";
import TaskForm from "./TaskForm";

const { Title, Text, Paragraph } = Typography;

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
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [pageMessage, setPageMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const navigate = useNavigate();

  const fetchTask = async () => {
    setLoading(true);
    try {
      const data = await GET_TASK_BY_ID(id!);
      setTask(data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.status === 404 ? "Task not found (404)" : "Failed to fetch task details");
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
      await fetchTask();
      setPageMessage({ type: "success", text: "Task executed successfully!" });
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to run task. Command may be unsafe.";
      setTerminalOutput(msg);
      setPageMessage({ type: "error", text: msg });
    } finally {
      setRunning(false);
    }
  };

  const handleDeleteTask = () => {
    if (!task) return;
    console.log("delete in ViewTask called - opening modal");
    setIsDeleteModalVisible(true);
  };

  const confirmDeleteTask = async () => {
    if (!task) return;
    console.log("confirmDeleteTask called - About to call DELETE_TASK with id:", task.id);
    setDeleting(true);
    try {
      await DELETE_TASK(task.id);
      console.log("DELETE_TASK completed successfully");
      setIsDeleteModalVisible(false);
      setPageMessage({ type: "success", text: `Task "${task.name}" deleted successfully!` });
      setTimeout(() => {
        navigate('/view-tasks');
      }, 1500);
    } catch (err: any) {
      console.error("Delete task error:", err);
      setIsDeleteModalVisible(false);
      setPageMessage({ type: "error", text: err.response?.data?.message || "Failed to delete task." });
    } finally {
      setDeleting(false);
    }
  };

  const handleUpdateTask = async (values: any) => {
    if (!task) return;
    try {
      await UPDATE_TASK(task.id, values);
      setPageMessage({ type: "success", text: "Task updated successfully!" });
      setIsUpdateModalVisible(false);
      fetchTask();
    } catch {
      setPageMessage({ type: "error", text: "Failed to update task" });
    }
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: 80 }}>
        <Spin size="large" />
      </div>
    );

  if (error)
    return (
      <div style={{ textAlign: "center", padding: 80 }}>
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );

  if (!task)
    return (
      <div style={{ textAlign: "center", padding: 80 }}>
        {pageMessage && (
          <div
            style={{
              padding: "12px 20px",
              borderRadius: 10,
              textAlign: "center",
              backgroundColor: pageMessage.type === "success" ? "#f6ffed" : "#fff1f0",
              color: pageMessage.type === "success" ? "#52c41a" : "#ff4d4f",
              fontWeight: 500,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              display: "inline-block",
            }}
          >
            {pageMessage.type === "success" ? <CheckCircleOutlined style={{ marginRight: 8 }} /> : <DeleteOutlined style={{ marginRight: 8 }} />}
            {pageMessage.text}
          </div>
        )}
      </div>
    );

  return (
    <div style={{ padding: "40px 60px", background: "#f9f9f9", minHeight: "100vh" }}>
      {/* Page message */}
      {pageMessage && task && (
        <div
          style={{
            padding: "12px 20px",
            borderRadius: 10,
            textAlign: "center",
            backgroundColor: pageMessage.type === "success" ? "#f6ffed" : "#fff1f0",
            color: pageMessage.type === "success" ? "#52c41a" : "#ff4d4f",
            fontWeight: 500,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            marginBottom: 20,
          }}
        >
          {pageMessage.type === "success" ? <CheckCircleOutlined style={{ marginRight: 8 }} /> : <DeleteOutlined style={{ marginRight: 8 }} />}
          {pageMessage.text}
        </div>
      )}

      <Card style={{ borderRadius: 16, boxShadow: "0 2px 10px rgba(0,0,0,0.08)", marginBottom: 24 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={3} style={{ margin: 0 }}>
              {task.name}
            </Title>
            <Text type="secondary">Owned by: {task.owner}</Text>
          </Col>
          <Col>
            <Space>
              <Button type="primary" icon={<PlayCircleOutlined />} onClick={handleRunTask} loading={running}>
                Run
              </Button>
              <Button icon={<EditOutlined />} onClick={() => setIsUpdateModalVisible(true)}>
                Edit
              </Button>
              <Button danger icon={<DeleteOutlined />} onClick={handleDeleteTask}>
                Delete
              </Button>
            </Space>
          </Col>
        </Row>
        <Paragraph style={{ marginTop: 12 }}>
          <CodeOutlined /> <b>Command:</b> <Text code>{task.command}</Text>
        </Paragraph>
      </Card>

      <Row gutter={[24, 24]}>
        {/* Terminal Output Section */}
        <Col xs={24} md={12}>
          <Card title="Terminal Output" style={{ borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <pre style={{ background: "#000", color: "#0f0", minHeight: 220, padding: "12px", borderRadius: 8, overflow: "auto" }}>
              {terminalOutput || "Output will appear here after running the task..."}
            </pre>
          </Card>
        </Col>

        {/* Executions Section */}
        <Col xs={24} md={12}>
          <Card title="Execution History" style={{ borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            {task.taskExecutions.length > 0 ? (
              <List
                dataSource={task.taskExecutions}
                renderItem={(exe, index) => (
                  <List.Item key={index}>
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Space>
                        <Tag color={exe.status === "SUCCESS" ? "green" : exe.status === "FAILED" ? "red" : "blue"}>{exe.status}</Tag>
                        <Text type="secondary">
                          <ClockCircleOutlined /> {new Date(exe.startTime).toLocaleString()} → {new Date(exe.endTime).toLocaleString()}
                        </Text>
                      </Space>
                      <Text>{exe.output}</Text>
                    </Space>
                  </List.Item>
                )}
              />
            ) : (
              <Text type="secondary">No executions yet.</Text>
            )}
          </Card>
        </Col>
      </Row>

      {/* Update Task Modal */}
      <Modal 
        title="Update Task" 
        open={isUpdateModalVisible} 
        onCancel={() => setIsUpdateModalVisible(false)} 
        footer={null}
      >
        <TaskForm initialValues={{ name: task.name, owner: task.owner, command: task.command }} onFinish={handleUpdateTask} mode="update" />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        open={isDeleteModalVisible}
        onOk={confirmDeleteTask}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Yes, Delete"
        okType="danger"
        cancelText="Cancel"
        confirmLoading={deleting}
      >
        <p>Are you sure you want to delete task "<strong>{task.name}</strong>"?</p>
      </Modal>
    </div>
  );
};

export default ViewTask;