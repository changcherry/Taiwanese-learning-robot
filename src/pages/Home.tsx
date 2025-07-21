import React from "react";
import "./Home.css";
import bearImage from "../assets/bear.png";

const Home: React.FC = () => {
  return (
    <div className="page-wrapper">
      {/* 頂部標題 */}
      <header className="site-header">
        <div className="header-left">
          <h1 className="greeting-title">阿琪哩賀！</h1>
        </div>
        <nav className="main-navigation">
          <ul>
            <li><a href="#learning-mode">學習模式</a></li>
            <li><a href="#notifications">通知提醒</a></li>
            <li><a href="#settings">設定</a></li>
            <li><a href="#login">登入</a></li>
          </ul>
        </nav>
      </header>

      {/* 主內容 */}
      <main className="main-content">
        {/* 左邊大熊 */}
        <div className="character-area">
          <img src={bearImage} alt="小熊" className="character-image" />
          <p className="character-caption">點選小熊開始聊天</p>
        </div>

        {/* 右邊聊天區 */}
        <div className="chat-area">
          <div className="chat-log">
            <div className="message-group incoming">
              <span className="sender-name">小熊</span>
              <div className="message-bubble bubble-style-1"></div>
            </div>
            <div className="message-group outgoing">
              <div className="message-bubble bubble-style-2"></div>
            </div>
            <div className="message-group incoming">
              <span className="sender-name">小熊</span>
              <div className="message-bubble bubble-style-1 large"></div>
            </div>
          </div>

          <form className="chat-input-form">
            <input type="text" placeholder="請輸入..." />
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
