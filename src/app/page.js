"use client";

import React from "react";
import { Layout, ConfigProvider, theme, Switch } from "antd";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import useDarkMode from "@/components/useDarkMode";

const { Content } = Layout;

export default function Home() {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout style={{ minHeight: "100vh", display: "flex", justifyContent: "center" }}>
        <Sidebar />
        <Content
          style={{
            width: "60%",
            minWidth: "600px",
            maxWidth: "1200px",
            padding: "40px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              checkedChildren="🌙"
              unCheckedChildren="☀️"
            />
          </div>
          <MainContent />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
