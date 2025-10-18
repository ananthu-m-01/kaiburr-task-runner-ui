import { ConfigProvider, Layout, theme } from "antd";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import ViewAllTasks from "./components/ViewAllTasks";

const { Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: { colorPrimary: "#1890ff", borderRadius: 8 },
      }}
    >
      <Router>
        <Layout
          style={{
            minHeight: "100vh",
            backgroundColor: "#f0f2f5",
            display: "flex",
            flexDirection: "column",
          }}
        >
        
        
          <Content
            style={{
              flex: 1,
              padding: "40px 50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
      

              {/* setting routes for the task api */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/view-tasks" element={<ViewAllTasks />} />
              </Routes>

      
          </Content>

          <Footer
            style={{
              textAlign: "center",
              backgroundColor: "#f0f2f5",
              padding: "10px 0",
            }}
          >
            Task Runner © 
            <a
              href="https://github.com/ananthu-m-01"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Footer>

        
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default App;
