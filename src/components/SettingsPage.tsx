import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SettingsPage.css";
import "../App.css";

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="page-bg">
      <header className="game-header">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
          aria-label="返回上一頁"
        >
          <img
            src="/images/images_Settings/1077_25412.png"
            alt="返回"
          />
        </button>
        <h1 className="header-title">設定</h1>
      </header>

      <main className="page-container">
        <section className="profile-content">
          <div className="user-info">
            <div className="avatar">
              <img
                src="/images/images_Settings/I1077_25415_74_9107.png"
                className="avatar-background"
                alt="頭像背景"
              />
              <img
                src="/images/images_Settings/I1077_25415_74_9255.png"
                className="avatar-icon"
                alt="使用者頭像"
              />
            </div>
            <p className="username">Cherry</p>
          </div>

          <nav className="settings-menu" aria-label="設定功能選單">
            <ul>
              <li>
                <div
                  className="menu-item"
                  onClick={() => navigate("/profile-edit")}
                  role="button"
                >
                  <div className="menu-icon-container">
                    <img
                      src="/images/images_Settings/I1077_25434_44_4406.png"
                      alt="編輯資料圖示"
                    />
                  </div>
                  <span className="menu-text">編輯資料</span>
                  <img
                    src="/images/images_Settings/1077_25433.png"
                    className="menu-arrow"
                    alt="進入"
                  />
                </div>
              </li>
              <li>
                <div
                  className="menu-item"
                  onClick={() => navigate("/instructions")}
                  role="button"
                >
                  <div className="menu-icon-container">
                    <img
                      src="/images/images_Settings/I1077_25428_44_8733.png"
                      alt="使用說明圖示"
                    />
                  </div>
                  <span className="menu-text">使用說明</span>
                  <img
                    src="/images/images_Settings/1077_25430.png"
                    className="menu-arrow"
                    alt="進入"
                  />
                </div>
              </li>
              <li>
                <div
                  className="menu-item"
                  onClick={() => navigate("/response")}
                  role="button"
                >
                  <div className="menu-icon-container">
                    <img
                      src="/images/images_Settings/I1077_25426_44_9480.png"
                      alt="問題反應圖示"
                    />
                  </div>
                  <span className="menu-text">問題反應</span>
                  <img
                    src="/images/images_Settings/1077_25424.png"
                    className="menu-arrow"
                    alt="進入"
                  />
                </div>
              </li>
            </ul>
          </nav>
        </section>
      </main>

      {/* 開發用：快速前往通知頁（非 production 顯示），刪除此區塊不影響頁面 */}
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



