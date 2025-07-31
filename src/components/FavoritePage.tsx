import React, { useState } from 'react';
import './StoryModePage.css'; // 共用 StoryModePage 的 CSS
import storyImage from '../assets/story.png';
import backIcon from '../assets/back.svg';
import searchIcon from '../assets/search.svg';
import favoriteTabBg from '../assets/favoritebg.svg';
import favoriteTabFg from '../assets/heart 11.svg';
import storyThumbnail from '../assets/moon.png';

interface FavoritePageProps {
  onBack: () => void;
  onStoryClick: (storyData: any) => void; // 新增 onStoryClick 屬性
}

const FavoritePage: React.FC<FavoritePageProps> = ({ onBack, onStoryClick }) => {
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
      <main>
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

        {/* 收藏頁 tab 樣式 */}
        <nav className="filters">
          <button className="filter-button" onClick={onBack}>
            <span className="filter-text">推薦</span>
          </button>
          <button className="filter-button active">
            <div className="icon-wrapper">
              <img
                src={favoriteTabBg}
                alt=""
                className="icon-bg"
              />
              <img
                src={favoriteTabFg}
                alt="Heart icon"
                className="icon-fg"
              />
            </div>
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
              {/* 收藏頁卡片愛心按鈕 */}
              <button className="favorite-button active">
                <img
                  src={favoriteTabFg}
                  alt="Favorited"
                />
              </button>
            </article>
          ))}
        </div>
      </main>
    </>
  );
};

export default FavoritePage;