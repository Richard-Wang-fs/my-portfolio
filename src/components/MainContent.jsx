"use client";

import React, { useState } from "react";
import { Layout, Typography, Button, Tag, Timeline, theme } from "antd";
import { motion } from "framer-motion";
import { RightOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { useToken } = theme;

// 定义技能分类
const skills = {
  "Backend": ["Go", "Python", "Kratos (Go framework)", "Gorm", "Mock", "JWT", "Protobuf2", "Node.js"],
  "Frontend": ["React", "HTML", "CSS", "JavaScript"],
  "Database": ["MySQL", "Redis"],
  "Game Development": ["Unity3D", "C#"],
  "Augmented Reality": ["ARCore (Android)", "ARKit (iOS)"],
  "Cloud & Infrastructure": ["Oracle Cloud", "Nginx", "Ubuntu"],
  "Artificial Intelligence": ["TensorFlow", "PyTorch", "scikit-learn", "OpenCV", "Numpy", "Pandas"]
};

// 定义时间轴数据，每个阶段对应部分技能
const timelineData = [
  {
    range: "2019/12 - 2022/05",
    description: "Owned and operated Chengdu Peixuan Technology Co.",
    relatedSkills: ["Unity3D", "C#", "Python", "Node.js", "React", "HTML", "CSS", "JavaScript"]
  },
  {
    range: "2021/08 - 2022/07",
    description: "Joined Shenzhen Yuanyu Yuanzhou Technology as Golang backend developer",
    relatedSkills: [
      "Go", "Python", "Kratos (Go framework)", "Gorm", "Mock", "JWT", "Protobuf2",
      "ARCore (Android)", "ARKit (iOS)", "MySQL", "Redis"
    ]
  },
  {
    range: "2022/09 - 2023/08",
    description: "Pre-sales engineer at Chengdu Qiaoban Technology",
    relatedSkills: ["Python", "MySQL", "Redis", "Unity3D", "C#"]
  },
  {
    range: "2024/02 - 2025/12",
    description: "Master of AI at UNSW (expected graduation)",
    relatedSkills: [
      "Python", "TensorFlow", "PyTorch", "scikit-learn", "OpenCV", "Numpy", "Pandas",
      "Oracle Cloud", "Nginx", "Ubuntu", "Node.js", "React", "HTML", "CSS", "JavaScript"
    ]
  }
];

const MainContent = () => {
  // 选中的 timeline 条目索引
  const [selectedTimeline, setSelectedTimeline] = useState(null);
  // 鼠标悬停的技能
  const [hoveredSkill, setHoveredSkill] = useState(null);
  // 获取当前主题
  const { token } = useToken();

  // 如果 skill 在当前选定时间轴相关技能中，则返回 true
  const isSkillHighlighted = (skill) => {
    if (selectedTimeline === null) return false;
    return timelineData[selectedTimeline].relatedSkills.includes(skill);
  };

  // 对于时间轴条目，如果 hoveredSkill 在该条目的 relatedSkills 里，则高亮
  const isTimelineItemHighlighted = (item) => {
    if (!hoveredSkill) return false;
    return item.relatedSkills.includes(hoveredSkill);
  };

  // 构造 Timeline 需要的 items
  const timelineItems = timelineData.map((item, idx) => {
    const isSelected = selectedTimeline === idx;
    const isHover = isTimelineItemHighlighted(item);
    const color = isSelected || isHover ? "red" : "blue";

    return {
      color,
      children: (
        <div
          onMouseEnter={() => setSelectedTimeline(idx)}
          onMouseLeave={() => setSelectedTimeline(null)}
          style={{ cursor: "default" }}
        >
          {item.range}: {item.description}
        </div>
      )
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", staggerChildren: 0.2 }}
      style={{
        flex: 1,
        backgroundColor: token.colorBgContainer,
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color:token.colorText
      }}
    >
      {/* About Me */}
      <motion.div variants={{ hidden: { opacity: 0, y: -20 }, show: { opacity: 1, y: 0 } }}>
        <Title level={2}>Hello there!</Title>
        <Paragraph>
          Welcome to my little corner of the internet! I’m a graduate student in Artificial Intelligence with a solid background in computer science, backend development, and project management. In simpler terms—I spend a lot of time making computers do smart things while ensuring they don’t break in the process. I’m particularly interested in AI-driven solutions and cybersecurity, where every challenge feels like a puzzle waiting to be solved. Whether it’s building efficient systems, securing digital environments, or just making technology a little less frustrating, I’m always eager to learn and improve. I believe in writing clean code, asking too many questions, and occasionally breaking things (for learning purposes, of course). If you’re here to explore, connect, or just say hi—feel free! Let’s build something great together.
        </Paragraph>
      </motion.div>

      {/* Professional Skills */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: -20 }, show: { opacity: 1, y: 0 } }}
        style={{ marginTop: 20, width: "100%" }}
      >
        <Title level={3}>Professional Skills</Title>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
          {Object.entries(skills).map(([category, skillList]) => (
            <div key={category} style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
              <Title level={4} style={{ margin: "0 16px 0 0", width: 220 }}>{category}:</Title>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {skillList.map((skill, index) => {
                  // 如果该技能在选中的 timeline 中，或鼠标悬停为该技能，则高亮
                  const highlight = isSkillHighlighted(skill) || skill === hoveredSkill;
                  return (
                    <Tag
                      key={index}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      style={{
                        borderRadius: 4,
                        padding: "2px 8px",
                        fontSize: 14,
                        lineHeight: "22px",
                        backgroundColor: highlight ? "#ffe58f" : undefined,
                        cursor: "default"
                      }}
                    >
                      {skill}
                    </Tag>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Career Timeline */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: -20 }, show: { opacity: 1, y: 0 } }}
        style={{ marginTop: 20, width: "100%" }}
      >
        <Title level={3}>Career Timeline</Title>
        <Timeline items={timelineItems} />
      </motion.div>

      {/* Blog Button */}
      <motion.div
        variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
        style={{ marginLeft: "auto" }}
      >
        <Button
          type="primary"
          size="large"
          href="http://www.wangjingpeng.me/wordpress/"
          target="_blank"
          icon={<RightOutlined />}
        >
          Visit My Blog
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default MainContent;
