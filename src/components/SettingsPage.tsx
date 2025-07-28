import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SettingsPage.css";

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      {/* 背景圖案 */}
      <img
        src="/images/images_Settings/f11d553937110455b763db26fc3e78d3301ce0f1.png"
        className="background-pattern"
        alt="背景圖"
      />

      {/* 頁首區塊 */}
      <header className="settings-header">
        <a href="#" className="back-button">
          <img src="/images/images_Settings/1077_25412.png" alt="返回" />
        </a>
        <h1 className="header-title">設定</h1>
      </header>

      {/* 個人資料主體 */}
      <section className="profile-content">
        {/* 使用者資訊 */}
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

        {/* 功能選單 */}
        <nav className="settings-menu">
          <ul>
            <li>
              {/* 將 <a> 改為可點擊跳轉的 div */}
              <div
                className="menu-item"
                onClick={() => navigate("/profile-edit")}
                style={{ cursor: "pointer" }}
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
              <a href="#" className="menu-item">
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
              </a>
            </li>

            <li>
              <a href="#" className="menu-item">
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
              </a>
            </li>
          </ul>
        </nav>
      </section>
    </div>
  );
};

export default SettingsPage;
