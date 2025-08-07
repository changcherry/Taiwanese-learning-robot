import React from "react";
import "./Home.css";
import bearImage from "../assets/bear.png";
import pencilIcon from "../assets/pencil.png";
import profileIcon from "../assets/profile.png";
import bellIcon from "../assets/icon-bell.png";
import gearIcon from "../assets/icon-gear.png";
import userIcon from "../assets/icon-user.png";
import chevronIcon from "../assets/icon-chevron.png";
import learningIcon from "../assets/icon-learning.png";

const Home: React.FC = () => {
  return (
    <div className="page-wrapper">
      {/* Header */}
      <header className="site-header">
        <div className="header-left">
          <img src={profileIcon} alt="Profile" className="profile-icon" />
          <h1 className="greeting-title">阿琪哩賀！</h1>
        </div>
        <nav className="main-navigation">
          <button className="nav-button">
            <img src={learningIcon} alt="學習模式" className="nav-icon" />
            <span className="nav-label">學習模式</span>
            <img src={chevronIcon} alt="Chevron" className="chevron-icon" />
          </button>
          <button className="nav-button">
            <img src={bellIcon} alt="通知" className="nav-icon" />
            <span className="nav-label">通知提醒</span>
          </button>
          <button className="nav-button">
            <img src={gearIcon} alt="設定" className="nav-icon" />
            <span className="nav-label">設定</span>
          </button>
          <button className="nav-button">
            <img src={userIcon} alt="登入" className="nav-icon" />
            <span className="nav-label">登入</span>
            <img src={chevronIcon} alt="Chevron" className="chevron-icon" />
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="character-area">
          <img src={bearImage} alt="小熊" className="character-image" />
          <p className="character-caption">點選小熊開始聊天</p>
        </div>

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
            <img src={pencilIcon} alt="pencil" className="input-icon" />
            <input type="text" placeholder="請輸入..." />
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
