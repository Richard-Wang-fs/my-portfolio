"use client";

import React, { useState } from "react";
import { Layout, Avatar, Typography, Button, theme } from "antd";
import { GithubOutlined, LinkedinOutlined, CopyOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const { Text, Title } = Typography;
const { Sider } = Layout;
const { useToken } = theme;

const Sidebar = () => {
  const email = "jingpeng.one@gmail.com";
  const [isCopied, setIsCopied] = useState(false);

  const { token } = useToken();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Sider
      width={300}
      style={{
        backgroundColor: "transparent", // 移除背景色
        borderRight: "1px solid #ccc", // 添加右侧分割线
        padding: "100px 20px 20px 20px", // 增加顶部留白
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: token.colorText
      }}
    >
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar size={200} src="/avatar.jpeg" />
        <Title level={3} style={{ marginTop: 10 }}>Wang Jingpeng</Title>
        <Text type="secondary">Full-Stack Developer</Text>
        <Text type="secondary">UNSW Master of Artificial Intelligence</Text>
          <Text strong>{email}</Text>
          <Button
            icon={<CopyOutlined />}
            style={{margin: 'center' }}
            type={isCopied ? "primary" : "default"} // 变色指示复制状态
            disabled={isCopied} // 复制后短暂禁用按钮
            onClick={copyToClipboard}
          >
            {isCopied ? "Copied!" : "Copy Email"}
          </Button>
        <div style={{ marginTop: 10, display: "flex", gap: "10px" }}>
          <Button icon={<LinkedinOutlined />} href="https://www.linkedin.com/in/richard-one/" target="_blank" />
          <Button icon={<GithubOutlined />} href="https://github.com/Richard-Wang-fs/" target="_blank" />
        </div>
      </motion.div>
    </Sider>
  );
};

export default Sidebar;
