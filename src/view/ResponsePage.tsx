//問題反應
//還有bug

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/ResponsePage.css";
import "../App2.css";

import BackIcon from "../assets/Back.svg";

interface Message {
  id: number;
  type: 'sent' | 'received';
  sender: string;
  content: string;
}

const ResponsePage: React.FC = () => {
const navigate = useNavigate();
const [input, setInput] = useState('');
const [messages, setMessages] = useState<Message[]>([]);
const contentRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    // 添加使用者發送的訊息
    const userMessage: Message = {
      id: Date.now()+1,
      type: 'sent',
      sender: '阿琪', // 使用者名稱
      content: input,
    };

    // 添加自動回覆的訊息
    const systemResponse: Message = {
      id: Date.now() + 1, // 確保 ID 唯一
      type: 'received',
      sender: '小熊',
      content: '已收到您的回覆',
    };

    setMessages(prevMessages => [...prevMessages, userMessage, systemResponse]);
    setInput('');
  };

  // 自動滾到底部
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className=".selection-bg">
      {/* 頁首 */}
      <header className="game-header">
         <button
          type="button"
          className="back-button"
          aria-label="返回"
          onClick={() => navigate("/SettingsPage")}
        >
          <img src={BackIcon} alt="返回" />
        </button>
        <h1 className="header-title">問題反應</h1>
      </header>

      {/* 聊天區 */}
      <main className="page-container">
        <div className="response-page">
          <div className="response-content" ref={contentRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`message-group ${msg.type}`}>
                <div className="sender-name">{msg.sender}</div>
                <div className="message-bubble">{msg.content}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 固定底部輸入列 */}
      <div className="input-bar-fixed">
        <input
          type="text"
          className="input-placeholder"
          placeholder="輸入訊息..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
        />
        <button className="send-button" onClick={handleSend}>送出</button>
      </div>
    </div>
  );
};

export default ResponsePage;