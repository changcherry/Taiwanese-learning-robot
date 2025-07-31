import React from 'react';
import './ThemeSelectionPage.css';
import '../App.css';
import bgImage from '../assets/bg.png';
import backIcon from '../assets/back.svg';

interface ThemeSelectionPageProps {
  onBack?: () => void;
  onSelectTheme?: (theme: string) => void;
}

const ThemeSelectionPage: React.FC<ThemeSelectionPageProps> = ({ onBack, onSelectTheme }) => {
  return (
    <section id="theme-selection">
      <img
        src={bgImage}
        alt="Background pattern of school supplies"
        className="background-image"
      />

      <header className="page-header">
        <button
          type="button"
          aria-label="Back"
          className="back-icon-btn"
          onClick={() => {
            onBack && onBack();
          }}
        >
          <img src={backIcon} alt="Back Icon" className="back-icon" />
        </button>
        <h1 className="header-title">台語單字卡</h1>
      </header>

      <main className="theme-card-scroll">
        <h2 className="main-title">主題選擇</h2>
        <nav aria-label="Theme selection">
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