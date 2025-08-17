// src/App.tsx
import { useState } from 'react';
import './App.css';
import LearningMode from './components/LearningMode';
import StoryModePage from './components/StoryModePage';
import ThemeSelectionPage from './components/ThemeSelectionPage';
import Favoritestory from './components/Favoritestory'; // ⬅️ 新增：收藏集頁

function App() {
  const [page, setPage] = useState<'learning' | 'story' | 'theme' | 'favorites'>('learning');

  return (
    <div>
      {page === 'learning' && (
        <LearningMode
          onSelectStory={() => setPage('story')}
          onSelectWordCard={() => setPage('theme')}
        />
      )}

      {page === 'theme' && (
        <ThemeSelectionPage
          onBack={() => setPage('learning')}
          onSelectTheme={(theme) => {
            console.log(`選擇了主題：${theme}`);
          }}
          onGoToFavorites={() => {
            console.log('正在跳轉到收藏集...');
            setPage('favorites'); // ⬅️ 轉到收藏集
          }}
        />
      )}

      {page === 'story' && (
        <StoryModePage
          onBack={() => setPage('learning')}
          onRecommend={() => {}}
          onStoryClick={() => {}}
        />
      )}

      {page === 'favorites' && (
        <Favoritestory
          onBack={() => setPage('theme')} // ⬅️ 收藏集返回到主題頁
          onStoryClick={() => {}}        // 需要時可打開故事詳情
        />
      )}
    </div>
  );
}

export default App;