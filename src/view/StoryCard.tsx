// src/components/StoryCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import favoriteIcon from '../assets/收藏.png';
import favoriteTabFgActive from '../assets/red.svg';
import storyThumbnail from '../assets/moon.png';
import type { Story } from '../data/stories'; // 確保匯入 Story 型別
 // 確保匯入 Story 型別

interface StoryCardProps {
  story: Story;
  isFavorite: boolean;
  onFavoriteToggle: (e: React.MouseEvent, storyId: number) => void;
  onClick: () => void;
}

const StoryCard: React.FC<StoryCardProps> = ({
  story,
  isFavorite,
  onFavoriteToggle,
  onClick,
}) => {
  const navigate = useNavigate();

  return (
    <article
      className="story-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      <img src={storyThumbnail} alt="Story thumbnail" className="story-thumbnail" />
      <div className="card-divider"></div>
      <h2 className="story-title">《{story.title}》</h2>

      <button
        className={`favorite-button ${isFavorite ? 'active' : ''}`}
        onClick={(e) => onFavoriteToggle(e, story.id)}
        aria-label={isFavorite ? '移除收藏' : '加入收藏'}
        title={isFavorite ? '再次點擊移除收藏' : '點擊加入收藏'}
      >
        <img
          src={isFavorite ? favoriteTabFgActive : favoriteIcon}
          alt={isFavorite ? '已收藏' : '加入收藏'}
        />
      </button>
    </article>
  );
};

export default StoryCard;