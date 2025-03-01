"use client";

import React, { useState, useEffect } from "react";
import { Layout, ConfigProvider, theme, Switch } from "antd";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import useDarkMode from "@/components/useDarkMode";

const { Content } = Layout;

export default function Home() {
  const [darkMode, toggleDarkMode] = useDarkMode();

  // 1. 新增状态 isMobile，用于检测是否移动端
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile(); // 初始化判断
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          // 移动端不需要额外的左右留白
          overflowX: "hidden", // 避免出现水平滚动条
          background: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        {/* 2. 根据 isMobile 切换 Content 宽度，保留 PC 端配置 */}
        <Content
          style={{
            width: isMobile ? "100%" : "60%",
            minWidth: isMobile ? "auto" : "600px",
            maxWidth: isMobile ? "100%" : "1200px",
            padding: isMobile ? "20px" : "40px",
          }}
        >
          {/* 你原先如果有 Dark Mode 切换按钮在这里，可以移除或保留 */}
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
