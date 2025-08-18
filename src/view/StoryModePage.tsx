// src/view/StoryModePage.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/StoryModePage.css';
import '../Main.css';
import '../style/ThemeSelectionPage.css';
import storyImage from '../assets/story.png';
import backIcon from '../assets/Back.svg';
import searchIcon from '../assets/search.svg';
import favoriteIcon from '../assets/收藏.png';
import favoriteTabFgActive from '../assets/red.svg';
import storyThumbnail from '../assets/moon.png';
import { stories } from '../data/stories';

interface StoryModePageProps {
  onBack: () => void;
  onStoryClick: (story: { id: number; title: string }) => void; // 兼容保留
}

const LOVESTORY_FAV_KEY = 'lovestory_favorites';

const normalize = (s: string) =>
  (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const StoryModePage: React.FC<StoryModePageProps> = ({ onBack }) => {
  const [searchText, setSearchText] = useState('');
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const navigate = useNavigate();

  // 掛載時載入收藏
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOVESTORY_FAV_KEY);
      setFavorites(saved ? JSON.parse(saved) : {});
    } catch {
      setFavorites({});
    }
  }, []);

  // 點心形：只切換收藏，不導頁
  const handleFavoriteToggle = (e: React.MouseEvent, storyId: number) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = { ...prev, [storyId]: !prev[storyId] };
      localStorage.setItem(LOVESTORY_FAV_KEY, JSON.stringify(next));
      return next;
    });
  };

  // 依關鍵字過濾
  const visibleStories = useMemo(() => {
    const q = normalize(searchText.trim());
    if (!q) return stories;
    return stories.filter(st => {
      const inTitle = normalize(st.title).includes(q);
      const inKeywords = Array.isArray((st as any).keywords)
        ? (st as any).keywords.some((k: string) => normalize(k).includes(q))
        : false;
      return inTitle || inKeywords;
    });
  }, [searchText]);

  return (
    <div className="selection-bg">
      <header className="selection-header">
        <div className="header-left">
          <button
            type="button"
            className="back-button"
            aria-label="Back"
            onClick={() => navigate('/')}
          >
            <img src={backIcon} alt="" />
          </button>
          <h1 className="header-title">台語單字卡</h1>
        </div>

        {/* 收藏故事清單入口（保留原樣） */}
        <button
          type="button"
          aria-label="前往收藏集"
          className="favorite-collection-btn"
          onClick={() => navigate('/lovestory')}
        >
          <img src={favoriteTabFgActive} alt="收藏集圖示" className="favorite-icon" />
          <span className="favorite-text">收藏集</span>
        </button>
      </header>

      <main className="game-selection-main">
        <div className="search-bar">
          <img src={searchIcon} alt="Search Icon" className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="揣故事（例：月亮、海、貓…）"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            aria-label="搜尋故事"
          />
        </div>

        <div className="hero-image-container">
          <img src={storyImage} alt="A bear reading a book in bed" className="hero-image" />
        </div>

        {visibleStories.length === 0 ? (
          <p style={{ marginTop: 16 }}>找不到相關故事，試試其他關鍵字～</p>
        ) : (
          <div className="story-grid">
            {visibleStories.map(story => (
              <article
                key={story.id}
                className="story-card"
                onClick={() => navigate(`/story/${story.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') navigate(`/story/${story.id}`);
                }}
              >
                <img src={storyThumbnail} alt="Story thumbnail" className="story-thumbnail" />
                <div className="card-divider"></div>
                <h2 className="story-title">《{story.title}》</h2>

                <button
                  className={`favorite-button ${favorites[story.id] ? 'active' : ''}`}
                  onClick={(e) => handleFavoriteToggle(e, story.id)}
                  aria-label={favorites[story.id] ? '移除收藏' : '加入收藏'}
                  title={favorites[story.id] ? '再次點擊移除收藏' : '點擊加入收藏'}
                >
                  <img
                    src={favorites[story.id] ? favoriteTabFgActive : favoriteIcon}
                    alt={favorites[story.id] ? 'Favorited' : 'Add to favorites'}
                  />
                </button>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default StoryModePage;