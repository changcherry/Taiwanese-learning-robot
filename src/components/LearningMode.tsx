import React from 'react';
import './LearningMode.css';
import backIcon from '../assets/back.svg';
import bgImg from '../assets/bg.png';

type LearningModeProps = {
  onSelectWordCard: () => void;
  onSelectStory: () => void;
};

const LearningMode: React.FC<LearningModeProps> = ({ onSelectWordCard, onSelectStory }) => (
  <section id="learning-mode" className="learning-page">
    {/* 背景圖 */}
    <img
      src={bgImg}
      alt="Background pattern"
      className="background-image"
    />

    {/* Header */}
    <header className="page-header">
      <a href="#" className="back-button-container" onClick={() => window.history.back()}>
        <img src={backIcon} alt="Back" className="back-icon" />
      </a>
      <h1 className="header-title">學習模式</h1>
    </header>

    {/* 主區塊 */}
    <main className="main-content">
      <nav className="mode-selection-nav">
        <button className="mode-card card-orange" onClick={onSelectWordCard}>
          <span className="card-text">
            台語
            <br />
            單字卡
          </span>
        </button>
        <button className="mode-card card-yellow" onClick={onSelectStory}>
          <span className="card-text">
            台語
            <br />
            故事集
          </span>
        </button>
        <a href="#" className="mode-card card-orange">
          <span className="card-text">
            互動
            <br />
            遊戲
          </span>
        </a>
      </nav>
    </main>
  </section>
);

export default LearningMode;