import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // 全站共用樣式
import "../styles/InstructionsPage.css"; // 本頁專屬樣式

const InstructionsPage: React.FC = () => {
  // React Router 導航 Hook
  const navigate = useNavigate();

  // ===== 返回首頁事件處理 =====
  // 點擊返回按鈕時，阻止預設行為並導回首頁
  const handleBackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <main className="instructions-container page-bg">
      {/* ===== 頁首（Header 區） ===== */}
      <header className="game-header">
        {/* 返回首頁按鈕 */}
        <button
          onClick={handleBackClick}
          className="back-button"
          aria-label="Go back"
        >
          <img
            src="/images/back.png"
            alt="Back Icon"
          />
        </button>

        {/* 頁面標題 */}
        <h1 className="header-title">使用說明</h1>
      </header>

      {/* ===== 後續可放「使用說明內容」 ===== */}
    </main>
  );
};

export default InstructionsPage;
