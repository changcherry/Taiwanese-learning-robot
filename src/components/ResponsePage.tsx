import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/ResponsePage.css";
import "../App.css";

interface Message {
  id: number;
  type: 'sent' | 'received';
  sender: string;
  content: string;
}

const ResponsePage: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: 'received', sender: '小熊', content: '你好！這是示例訊息。' },
    { id: 2, type: 'sent', sender: '阿琪', content: '嗨！' },
    { id: 3, type: 'received', sender: '小熊', content: '請問有什麼需要幫忙的嗎？' },
  ]);

  const [input, setInput] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: Date.now(),
      type: 'sent',
      sender: '阿琪',
      content: input,
    };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  // 自動滾到底部
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [messages]);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="page-bg">
      {/* 頁首 */}
      <header className="game-header">
        <button className="back-button" onClick={handleBack} aria-label="返回上一頁">
          <img src="/images/back.png" alt="Back" />
        </button>
        <h1 className="header-title">問題反映</h1>
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











