

import React from 'react';
import '../style/ScoreDisplay.css'; // 為分數畫面創建一個新的 CSS 檔案

interface ScoreDisplayProps {
  score: number;
  totalQuestions: number;
  onRestartGame: () => void; // 重新開始遊戲的函數
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, totalQuestions, onRestartGame }) => {
  return (
    <div className="score-display-container">
      <div className="score-card">
        <h2 className="score-title">遊戲結束！</h2>
        <p className="final-score">
          你的分數：<span>{score}</span> / {totalQuestions}
        </p>
        <button className="restart-button" onClick={onRestartGame}>
          重新開始
        </button>
      </div>
    </div>
  );
};

export default ScoreDisplay;