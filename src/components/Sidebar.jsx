"use client";

import React, { useState, useEffect } from "react";
import { Layout, Avatar, Typography, Button, theme, Switch } from "antd";
import { GithubOutlined, LinkedinOutlined, CopyOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const { Text, Title } = Typography;
const { Sider } = Layout;
const { useToken } = theme;

/**
 * Props:
 * - darkMode: 是否处于暗黑模式
 * - toggleDarkMode: 切换暗黑模式的函数
 */
export default function Sidebar({ darkMode, toggleDarkMode }) {
  const email = "jingpeng.one@gmail.com";
  const { token } = useToken();

  const [isCopied, setIsCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isFolded, setIsFolded] = useState(false);

  // 判断是否移动端
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 监听滚动：当 scrollY > 50 时折叠，否则展开
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // 只有当 isFolded != true 时才 setIsFolded(true)
      if (currentScroll > 50 && !isFolded) {
        setIsFolded(true);
      } 
      // 只有当 isFolded != false 时才 setIsFolded(false)
      else if (currentScroll <= 50 && isFolded) {
        setIsFolded(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // 复制邮箱
  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  /**
   * 移动端：
   * - isFolded = false => 占满全屏
   * - isFolded = true  => 顶部导航栏 (fixed)
   */
  if (isMobile) {
    return (
      <>
        {/* 折叠后：悬浮在顶部 */}
        {isFolded && (
          <motion.div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              height: 80,
              width: "100%",
              zIndex: 999,
              backgroundColor: token.colorBgContainer,
              borderBottom: `1px solid ${token.colorBorder}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 20px",
            }}
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* 左侧：头像 + 三个按钮 */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Avatar size={48} src="/avatar.jpeg" />
              <Button icon={<CopyOutlined />} onClick={copyToClipboard} size="small">
                Copy Email
              </Button>
              <Button
                icon={<LinkedinOutlined />}
                href="https://www.linkedin.com/in/richard-one/"
                target="_blank"
                size="small"
              />
              <Button
                icon={<GithubOutlined />}
                href="https://github.com/Richard-Wang-fs/"
                target="_blank"
                size="small"
              />
            </div>

            {/* 右侧：Dark Mode Switch */}
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              checkedChildren="🌙"
              unCheckedChildren="☀️"
            />
          </motion.div>
        )}

        {/* 未折叠：全屏显示 */}
        {!isFolded && (
          <motion.div
            style={{
              position: "relative",
              height: "100vh",
              width: "100vw",
              overflow: "hidden",
              backgroundColor: token.colorBgContainer,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: 80,
            }}
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Avatar size={200} src="/avatar.jpeg" />
            <Title level={3} style={{ marginTop: 10 }}>Wang Jingpeng</Title>
            <Text type="secondary">Full-Stack Developer</Text>
            <Text type="secondary">UNSW Master of AI</Text>
            <Text strong>{email}</Text>
            <Button
              icon={<CopyOutlined />}
              style={{ margin: "center" }}
              type={isCopied ? "primary" : "default"}
              disabled={isCopied}
              onClick={copyToClipboard}
            >
              {isCopied ? "Copied!" : "Copy Email"}
            </Button>
            <div style={{ marginTop: 10, display: "flex", gap: "10px" }}>
              <Button icon={<LinkedinOutlined />} href="https://www.linkedin.com/in/richard-one/" target="_blank" />
              <Button icon={<GithubOutlined />} href="https://github.com/Richard-Wang-fs/" target="_blank" />
            </div>

            {/* 如果想在全屏模式也有 Dark Mode 开关，可以在这里再加一个 Switch */}
          </motion.div>
        )}
      </>
    );
  }

  // PC 端逻辑保持不变
  return (
    <Sider
      width={300}
      style={{
        backgroundColor: "transparent",
        borderRight: "1px solid #ccc",
        padding: "100px 20px 20px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: token.colorText,
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
        <Text type="secondary">UNSW Master of AI</Text>
        <Text strong>{email}</Text>
        <Button
          icon={<CopyOutlined />}
          style={{ margin: "center" }}
          type={isCopied ? "primary" : "default"}
          disabled={isCopied}
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
}
