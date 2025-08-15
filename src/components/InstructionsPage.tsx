import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // 全站共用
import "../styles/InstructionsPage.css"; // 專屬樣式

const InstructionsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/"); 
  };

  return (
    <main className="instructions-container page-bg">
      {/* 頁首 */}
      <header className="game-header">
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

        <h1 className="header-title">使用說明</h1>
      </header>
    </main>
  );
};

export default InstructionsPage;


