import React, { useState } from 'react';
import './StoryModePage.css';
import storyImage from '../assets/story.png';
import backIcon from '../assets/back.svg';
import searchIcon from '../assets/search.svg';
import recommendTabBg from '../assets/recommendbg.svg';
import recommendTabFg from '../assets/check.svg';
import favoriteTabBg from '../assets/favoritebg.svg';
import favoriteTabFg from '../assets/heart 11.svg';
import storyThumbnail from '../assets/moon.png';

interface StoryModePageProps {
  onBack: () => void;
  onFavorite: () => void;
  onRecommend: () => void;
  onStoryClick: (story: { id: number; title: string }) => void; // 新增 onStoryClick 屬性
}

const StoryModePage: React.FC<StoryModePageProps> = ({ onBack, onFavorite, onRecommend, onStoryClick }) => {
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <header className="story-header">
        <div className="header-container">
          <a
            href="#"
            className="back-button"
            aria-label="Back"
            onClick={e => {
              e.preventDefault();
              onBack();
            }}
          >
            <img src={backIcon} alt="Back" />
          </a>
          <h1 className="story-title">台語故事集</h1>
        </div>
      </header>

      <main id="stories">
        <div className="search-bar">
          <img
            src={searchIcon}
            alt="Search Icon"
            className="search-icon"
          />
          <input
            type="text"
            className="search-input"
            placeholder="揣故事"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </div>

        <div className="hero-image-container">
          <img
            src={storyImage}
            alt="A bear reading a book in bed"
            className="hero-image"
          />
        </div>

        {/* 推薦頁 tab 樣式 */}
        <nav className="filters">
          <button className="filter-button active" onClick={onRecommend}>
            <div className="icon-wrapper">
              <img
                src={recommendTabBg}
                alt=""
                className="icon-bg"
              />
              <img
                src={recommendTabFg}
                alt="Check icon"
                className="icon-fg"
              />
            </div>
            <span className="filter-text">推薦</span>
          </button>
          <button className="filter-button" onClick={onFavorite}>
            <span className="filter-text">收藏</span>
          </button>
        </nav>

        <div className="story-grid">
          {Array(4).fill(null).map((_, index) => (
            <article
              key={index}
              className="story-card"
              onClick={() => onStoryClick({ id: index, title: '月娘花開的暗暝' })}
            >
              <img
                src={storyThumbnail}
                alt="Story thumbnail"
                className="story-thumbnail"
              />
              <div className="card-divider"></div>
              <h2 className="story-title">《月娘花開的暗暝》</h2>
              <button className={`favorite-button${index === 1 ? ' active' : ''}`}>
                <img
                  src={favoriteTabFg}
                  alt={index === 1 ? 'Favorited' : 'Add to favorites'}
                />
              </button>
            </article>
          ))}
        </div>
      </main>
    </>
  );
};

export default StoryModePage;