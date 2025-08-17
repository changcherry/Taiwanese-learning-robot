// src/components/Favoritestory.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 若沒用 Router，可刪除並用 onBack
import backIcon from '../assets/back.svg';
import storyThumbnail from '../assets/moon.png';
import favoriteTabFg from '../assets/heart 11.svg';      // 灰色愛心
import favoriteTabFgActive from '../assets/red.svg';      // 紅色愛心
import './StoryModePage.css';                             // 共用卡片樣式（可替換）
import '../style/FavoriteCollectionPage.css';             // 若你有這個檔案

type FavoritesMap = { [key: number]: boolean };

interface FavoritestoryProps {
  onBack?: () => void; // 若不用 Router，用 props 來回上一頁
  onStoryClick?: (story: { id: number; title: string }) => void;
}

// 與 StoryModePage 一致的故事清單（未串 API 時先寫死）
const stories = [
  { id: 0, title: '月娘花開的暗暝' },
  { id: 1, title: '阿嬤的菜園' },
  { id: 2, title: '海邊的寶藏' },
  { id: 3, title: '貓咪去上學' },
];

const Favoritestory: React.FC<FavoritestoryProps> = ({ onBack, onStoryClick }) => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<FavoritesMap>({});

  // 初次載入：從 localStorage 還原收藏
  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // 監聽跨分頁／同頁其他元件更新 favorites（例如 StoryModePage）
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'favorites' && e.newValue) {
        setFavorites(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // 取消／加入收藏（本頁只會用到取消；保留切換邏輯以一致）
  const toggleFavorite = (storyId: number) => {
    setFavorites(prev => {
      const next = { ...prev, [storyId]: !prev[storyId] };
      // 若切成 false，乾脆把 key 刪掉，localStorage 更乾淨
      if (!next[storyId]) delete next[storyId];
      localStorage.setItem('favorites', JSON.stringify(next));
      return next;
    });
  };

  // 已收藏清單
  const favoriteStories = useMemo(
    () => stories.filter(s => !!favorites[s.id]),
    [favorites]
  );

  return (
    <div className="page-container stories-section">
      <header className="story-header">
        <div className="header-container">
          <button
            type="button"
            className="back-button"
            aria-label="返回"
            onClick={() => (onBack ? onBack() : navigate(-1))}
          >
            <img src={backIcon} alt="返回" />
          </button>

          <h1 className="header-title">我的收藏集</h1>

          {/* 右側可留空或放占位，讓標題持續置中 */}
          <div style={{ width: 48, height: 48 }} />
        </div>
      </header>

      <main className="game-selection-main">
        {favoriteStories.length === 0 ? (
          <p className="empty-message">目前還沒有收藏的故事</p>
        ) : (
          <div className="story-grid">
            {favoriteStories.map(story => (
              <article
                key={story.id}
                className="story-card"
                onClick={() =>
                  onStoryClick?.({ id: story.id, title: story.title })
                }
              >
                <img
                  src={storyThumbnail}
                  alt={`${story.title} 封面`}
                  className="story-thumbnail"
                />
                <div className="card-divider" />
                <h2 className="story-title">《{story.title}》</h2>

                {/* 取消收藏（紅心 → 灰心） */}
                <button
                  className={`favorite-button ${favorites[story.id] ? 'active' : ''}`}
                  onClick={e => {
                    e.stopPropagation();
                    toggleFavorite(story.id);
                  }}
                  aria-label={favorites[story.id] ? '移除收藏' : '加入收藏'}
                  title={favorites[story.id] ? '再次點擊可移除收藏' : '點擊加入收藏'}
                >
                  <img
                    src={favorites[story.id] ? favoriteTabFgActive : favoriteTabFg}
                    alt={favorites[story.id] ? '已收藏' : '未收藏'}
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

export default Favoritestory;