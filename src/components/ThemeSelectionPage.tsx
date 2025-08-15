// src/components/ThemeSelectionPage.tsx
import React from 'react';
import './ThemeSelectionPage.css';
import '../App.css';
import bgImage from '../assets/bg.png';
import backIcon from '../assets/back.svg';
import favoriteIcon from '../assets/favorite 1.svg'; // 導入星星圖案

interface ThemeSelectionPageProps {
  onBack?: () => void;
  onSelectTheme?: (theme: string) => void;
  onGoToFavorites?: () => void; // 新增：處理收藏集按鈕點擊的事件
}

const ThemeSelectionPage: React.FC<ThemeSelectionPageProps> = ({ onBack, onSelectTheme, onGoToFavorites }) => {
  return (
    <section id="theme-selection">
      <img
        src={bgImage}
        alt="Background pattern of school supplies"
        className="background-image"
      />

      <header className="page-header">
        <div className="header-left">
          <button
            type="button"
            aria-label="返回上一頁"
            className="back-icon-btn"
            onClick={() => {
              onBack && onBack();
            }}
          >
            <img src={backIcon} alt="返回圖示" className="back-icon" />
          </button>
          <h1 className="header-title">台語單字卡</h1>
        </div>

        {/* 新增的收藏集按鈕 */}
        <button
          type="button"
          aria-label="前往收藏集"
          className="favorite-collection-btn"
          onClick={() => {
            console.log("收藏集按鈕被點擊！");
            // 在這裡進行一個額外的檢查
            if (onGoToFavorites) {
              console.log("onGoToFavorites 函式存在，正在呼叫...");
              onGoToFavorites();
            } else {
              console.log("錯誤：onGoToFavorites 函式未被傳入！");
            }
          }}
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
              onClick={() => onSelectTheme && onSelectTheme('theme1')}
            >
              問候語
            </button>
            <button
              className="theme-card card-orange"
              onClick={() => onSelectTheme && onSelectTheme('theme2')}
            >
              主題二
            </button>
            {/* 可依需求增加主題 */}
          </div>
        </nav>
      </main>
      <button onClick={onBack}>測試返回</button>
    </section>
  );
};

export default ThemeSelectionPage;