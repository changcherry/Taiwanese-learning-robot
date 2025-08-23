import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SettingsPage.css";
import "../App2.css";
import BackIcon from "../assets/Back.svg";
import  avartBg from"../assets/avatar_bg.png";
import avatar from"../assets/avatar.png";
import edit from "../assets/edit.png";
import instructions from"../assets/instructions.png";
import response from"../assets/response.png";
import enter from"../assets/enter.png";


const SettingsPage: React.FC = () => {
  // React Router 導航 Hook
  const navigate = useNavigate();

  return (
    <div className="page-bg">
      {/* ===== 頁首（Header 區） ===== */}
      <header className="game-header">
        {/* 返回上一頁按鈕 */}
        <button
          type="button"
          className="back-button"
          aria-label="返回"
          onClick={() => navigate("/Learn")}
        >
          <img src={BackIcon} alt="返回" />
        </button>
        {/* 頁面標題 */}
        <h1 className="header-title">設定</h1>
      </header>

      {/* ===== 主要內容區（Main Content） ===== */}
      <main className="page-container">
        <section className="profile-content">

          {/* --- 使用者資訊區（頭像 + 名稱） --- */}
          <div className="user-info">
            <div className="avatar">
              <img
                src={avartBg} 
                className="avatar-background"
                alt="頭像背景"
              />
              <img
                src={avatar}
                className="avatar-icon"
                alt="使用者頭像"
              />
            </div>
            <p className="username">Cherry</p>
          </div>

          {/* --- 設定功能選單（編輯資料 / 使用說明 / 問題反應） --- */}
          <nav className="settings-menu" aria-label="設定功能選單">
            <ul>
              {/* 編輯資料 */}
              <li>
                <div
                  className="menu-item"
                  onClick={() => navigate("/profile-edit")}
                  role="button"
                >
                  <div className="menu-icon-container">
                    <img
                      src={edit}
                      alt="編輯資料圖示"
                    />
                  </div>
                  <span className="menu-text">編輯資料</span>
                  <img
                    src= {enter}
                    className="menu-arrow"
                    alt="進入"
                  />
                </div>
              </li>

              {/* 使用說明 */}
              <li>
                <div
                  className="menu-item"
                  onClick={() => navigate("/instructions")}
                  role="button"
                >
                  <div className="menu-icon-container">
                    <img
                      src={instructions}
                      alt="使用說明圖示"
                    />
                  </div>
                  <span className="menu-text">使用說明</span>
                  <img
                    src= {enter}
                    className="menu-arrow"
                    alt="進入"
                  />
                </div>
              </li>

              {/* 問題反應 */}
              <li>
                <div
                  className="menu-item"
                  onClick={() => navigate("/response")}
                  role="button"
                >
                  <div className="menu-icon-container">
                    <img
                      src={response}
                      alt="問題反應圖示"
                    />
                  </div>
                  <span className="menu-text">問題反應</span>
                  <img
                    src= {enter}
                    className="menu-arrow"
                    alt="進入"
                  />
                </div>
              </li>
            </ul>
          </nav>
        </section>
      </main>

      {/* ===== 開發用快捷按鈕（非 production 顯示） =====
          這個按鈕方便開發階段快速進入通知頁，正式版會自動隱藏 */}
      {import.meta.env.MODE !== "production" && (
        <button
          type="button"
          onClick={() => navigate("/notifications")}
          aria-label="前往通知頁（開發用）"
          style={{
            position: "fixed",
            right: 20,
            bottom: 100,
            zIndex: 2000,
            padding: "8px 12px",
            background: "#333",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            opacity: 0.7,
          }}
        >
          通知頁（開發）
        </button>
      )}

    </div>
  );
};

export default SettingsPage;
