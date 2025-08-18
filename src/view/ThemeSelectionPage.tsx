// src/view/ThemeSelectionPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/ThemeSelectionPage.css';
import backIcon from '../assets/Back.svg';
import favoriteIcon from '../assets/收藏.svg';

const ThemeSelectionPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="learn-selection-bg">
      <header className="selection-header">
        <div className="header-left">
          <button
            type="button"
            className="back-button"
            aria-label="Back"
            onClick={() => navigate("/")}
          >
            <img src={backIcon} alt="" />
          </button>
          <h1 className="header-title">台語單字卡</h1>
        </div>

        <button
          type="button"
          aria-label="前往收藏集"
          className="favorite-collection-btn"
          onClick={() => navigate('/favorites')}
        >
          <img src={favoriteIcon} alt="收藏集圖示" className="favorite-icon" />
          <span className="favorite-text">收藏集</span>
        </button>
      </header>

      <main className="theme-card-scroll">
        <h2 className="main-title">主題選擇</h2>
        <nav aria-label="主題選擇">
          <div className="theme-card-list">
            <button
              className="theme-card card-yellow"
              onClick={() => navigate('/flashcard/transportation')}
            >
              交通工具
            </button>
            <button
              className="theme-card card-orange"
              onClick={() => navigate('/flashcard/theme2')}
            >
              主題二
            </button>
          </div>
        </nav>
      </main>
    </div>
  );
};

export default ThemeSelectionPage;