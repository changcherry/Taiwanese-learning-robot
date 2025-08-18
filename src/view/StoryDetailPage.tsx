// src/view/StoryDetailPage.tsx
import React from 'react';
import '../style/StoryDetailPage.css';
import backIcon from '../assets/back.svg';

import volumeIcon from '../assets/volume up.svg';
import fallbackImage from '../assets/detail.png';

interface StoryDetailProps {
  story: {
    id: number;
    title: string;
    content?: string;
    image?: string;
  };
  onBack: () => void;
}

const StoryDetailPage: React.FC<StoryDetailProps> = ({ story, onBack }) => {
  return (
    <>
      {/* ✅ 仿照你提供的 header 寫法 */}
      <header className="selection-header">
        <button
          type="button"
          className="back-button"
          aria-label="返回"
          onClick={onBack}
        >
          <img src={backIcon} alt="返回" />
        </button>
        <h1 className="game-header-title">《{story.title}》</h1>
      </header>

      {/* 主要內容：左圖 + 右文（不變） */}
      <div id="story-detail">
        <div className="story-container">
          {/* 左邊圖片 */}
          <div className="story-image-container">
            <img
              src={story.image || fallbackImage}
              alt={story.title}
              className="story-image"
            />
            <button className="audio-button" aria-label="Play story audio" title="播放朗讀">
              <img src={volumeIcon} alt="播放" />
            </button>
          </div>

          {/* 右邊文字 */}
          <div className="story-text-container">
            {(story.content || '').split('\n').map((line, i) => (
              <p key={i} className="story-text">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryDetailPage;