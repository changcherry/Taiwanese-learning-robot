import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StoryModePage.css';
import storyImage from '../assets/story.png';
import backIcon from '../assets/back.svg';
import searchIcon from '../assets/search.svg';
import recommendTabBg from '../assets/recommendbg.svg';
import recommendTabFg from '../assets/check.svg';
import favoriteTabFg from '../assets/heart 11.svg'; // 灰色愛心
import favoriteTabFgActive from '../assets/red.svg'; // 紅色愛心
import storyThumbnail from '../assets/moon.png';

interface StoryModePageProps {
  onBack: () => void;
  onRecommend: () => void;
  onStoryClick: (story: { id: number; title: string }) => void;
}

const stories = [
  { id: 0, title: '月娘花開的暗暝' },
  { id: 1, title: '阿嬤的菜園' },
  { id: 2, title: '海邊的寶藏' },
  { id: 3, title: '貓咪去上學' },
];

const StoryModePage: React.FC<StoryModePageProps> = ({
  onBack,
  onRecommend,
  onStoryClick,
}) => {
  const [searchText, setSearchText] = useState('');
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const navigate = useNavigate();

  // ✅ 掛載時載入收藏
  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // ✅ 每次收藏更新就寫回 localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleFavoriteToggle = (e: React.MouseEvent, storyId: number) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [storyId]: !prev[storyId] }));
  };

  const visibleStories = stories;

  // 計算收藏數量（右上角徽章）
  const favoriteCount = Object.values(favorites).filter(Boolean).length;

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

          {/* ✅ 右上角收藏入口 */}
          <div className="header-actions">
            <button
              type="button"
              className="fav-entry-button"
              aria-label="前往我的收藏集"
              onClick={() => navigate('/favorites')}
              title="我的收藏集"
            >
              <img src={favoriteTabFgActive} alt="" className="fav-entry-icon" />
              <span className="fav-entry-text">收藏集</span>
              <span className="fav-badge" aria-label={`已收藏 ${favoriteCount} 則`}>
                {favoriteCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main id="stories">
        <div className="search-bar">
          <img src={searchIcon} alt="Search Icon" className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="揣故事"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </div>

        <div className="hero-image-container">
          <img src={storyImage} alt="A bear reading a book in bed" className="hero-image" />
        </div>

      

        <div className="story-grid">
          {visibleStories.map(story => (
            <article
              key={story.id}
              className="story-card"
              onClick={() => onStoryClick({ id: story.id, title: story.title })}
            >
              <img src={storyThumbnail} alt="Story thumbnail" className="story-thumbnail" />
              <div className="card-divider"></div>
              <h2 className="story-title">《{story.title}》</h2>

              <button
                className={`favorite-button ${favorites[story.id] ? 'active' : ''}`}
                onClick={e => handleFavoriteToggle(e, story.id)}
                aria-label={favorites[story.id] ? '移除收藏' : '加入收藏'}
                title={favorites[story.id] ? '再次點擊移除收藏' : '點擊加入收藏'}
              >
                <img
                  src={favorites[story.id] ? favoriteTabFgActive : favoriteTabFg}
                  alt={favorites[story.id] ? 'Favorited' : 'Add to favorites'}
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