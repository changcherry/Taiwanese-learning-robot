import React, { useState, useEffect } from 'react';
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
  onFavorite: () => void;
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
  onFavorite,
  onRecommend,
  onStoryClick,
}) => {
  const [searchText, setSearchText] = useState('');
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [isFavoriteTab, setIsFavoriteTab] = useState(false);

  useEffect(() => {
    setFavorites({});
    setIsFavoriteTab(false);
  }, []);

  const handleFavoriteToggle = (e: React.MouseEvent, storyId: number) => {
    e.stopPropagation();
    setFavorites(prev => ({
      ...prev,
      [storyId]: !prev[storyId],
    }));
  };

  const visibleStories = isFavoriteTab
  ? stories.filter(story => favorites[story.id] === true)
  : stories;

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

        <nav className="filters">
          <button
            className={`filter-button ${!isFavoriteTab ? 'active' : ''}`}
            onClick={() => {
              onRecommend();
              setIsFavoriteTab(false);
            }}
          >
            <div className="icon-wrapper">
              <img src={recommendTabBg} alt="" className="icon-bg" />
              <img src={recommendTabFg} alt="Check icon" className="icon-fg" />
            </div>
            <span className="filter-text">推薦</span>
          </button>
          <button
            className={`filter-button ${isFavoriteTab ? 'active' : ''}`}
            onClick={() => {
              onFavorite();
              setIsFavoriteTab(true);
            }}
          >
            <span className="filter-text">收藏</span>
          </button>
        </nav>

        <div className="story-grid">
          {isFavoriteTab && visibleStories.length === 0 ? (
            <p className="empty-message">尚未有收藏的故事</p>
          ) : (
            visibleStories.map(story => (
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
                >
                  <img
                    src={favorites[story.id] ? favoriteTabFgActive : favoriteTabFg}
                    alt={favorites[story.id] ? 'Favorited' : 'Add to favorites'}
                  />
                </button>
              </article>
            ))
          )}
        </div>
      </main>
    </>
  );
};

export default StoryModePage;