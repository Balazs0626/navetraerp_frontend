import React, { useState, useRef, useEffect } from "react";
import { Drawer, Input, Button, List, Typography, Space, Card, Table, Tag, Empty, Spin } from "antd";
import { RobotOutlined, SendOutlined, DatabaseOutlined, MessageOutlined } from "@ant-design/icons";
import axios from "axios";
import { API_URL } from "../../constants/url";
import { useTranslation } from "@refinedev/core";

const { Text, Paragraph } = Typography;

interface Message {
    role: "user" | "ai";
    content: string;
    sql?: string;
    data?: any[];
}

export const AiAssistantDrawer = ({ open, onClose, module }: { open: boolean; onClose: () => void; module: string }) => {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState<Message[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    const { translate } = useTranslation();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSend = async () => {
        if (!prompt.trim()) return;

        const userMsg: Message = { role: "user", content: prompt };
        setChatHistory((prev) => [...prev, userMsg]);
        setLoading(true);
        setPrompt("");

        try {
            const { data } = await axios.post(`${API_URL}/ai/${module}`, { prompt: userMsg.content });
            
            const aiMsg: Message = {
                role: "ai",
                content: data.answer,
                sql: data.query,
                data: data.data
            };
            setChatHistory((prev) => [...prev, aiMsg]);
        } catch (error) {
            setChatHistory((prev) => [...prev, { role: "ai", content: translate("ai.error") }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Drawer
            title={<span><RobotOutlined /> {translate("ai.assistant")}</span>}
            placement="right"
            width={500}
            onClose={onClose}
            open={open}
            bodyStyle={{ display: "flex", flexDirection: "column", padding: 0 }}
        >
            <div style={{ flex: 1, overflowY: "auto", padding: "20px" }} ref={scrollRef}>
                {chatHistory.length === 0 && (
                    <Empty description={translate(`ai.${module}_empty`)} style={{ marginTop: 100 }} />
                )}
                
                <List
                    dataSource={chatHistory}
                    renderItem={(item) => (
                        <div style={{ 
                            textAlign: item.role === "user" ? "right" : "left", 
                            marginBottom: 20 
                        }}>
                            <Tag color={item.role === "user" ? "blue" : "green"}>
                                {item.role === "user" ? translate("ai.you") : "AI"}
                            </Tag>
                            
                            <Card style={{ 
                                marginTop: 8, 
                                borderRadius: 12, 
                                display: "inline-block",
                                maxWidth: "90%"
                            }}>
                                <Paragraph style={{ margin: 0 }}>{item.content}</Paragraph>
                                
                                {item.sql && (
                                    <div style={{ marginTop: 10 }}>
                                        <Space size="small">
                                            <DatabaseOutlined style={{ fontSize: 12, color: "#888" }} />
                                            <Text type="secondary" style={{ fontSize: 10 }} code>{translate("ai.sql")}</Text>
                                        </Space>
                                    </div>
                                )}
                            </Card>

                            {item.data && item.data.length > 0 && (
                                <div style={{ marginTop: 10, overflowX: "auto" }}>
                                    <Table 
                                        size="small" 
                                        dataSource={item.data.slice(0, 5)}
                                        columns={Object.keys(item.data[0]).map(key => ({ title: key, dataIndex: key, key }))}
                                        pagination={false}
                                        bordered
                                        style={{ maxWidth: "100%" }}
                                    />
                                    {item.data.length > 5 && <Text type="secondary">További {item.data.length - 5} sor...</Text>}
                                </div>
                            )}
                        </div>
                    )}
                />
                {loading && <div style={{ textAlign: "center" }}><Spin tip="AI gondolkodik..." /></div>}
            </div>

            <div style={{ padding: "20px", borderTop: "1px solid #f0f0f0" }}>
                <Space.Compact style={{ width: "100%" }}>
                    <Input 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onPressEnter={handleSend}
                        disabled={loading}
                    />
                    <Button type="primary" onClick={handleSend} loading={loading} icon={<SendOutlined />} />
                </Space.Compact>
            </div>
        </Drawer>
    );
};