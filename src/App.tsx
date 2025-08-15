// src/App.tsx
import { useState } from 'react';
import './App.css';
import LearningMode from './components/LearningMode';
import StoryModePage from './components/StoryModePage';
import ThemeSelectionPage from './components/ThemeSelectionPage';
// import Flashcard2App from './components/Flashcard2App'; // 暫時註解掉這行

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
        <>
          <ThemeSelectionPage
            onBack={() => setPage('learning')}
            onSelectTheme={theme => {
              console.log(`選擇了主題：${theme}`);
            }}
            onGoToFavorites={() => { 
              console.log("正在跳轉到收藏集...");
              setPage('favorites');
            }}
          />
        </>
      )}
      {page === 'story' && (
        <StoryModePage
          onBack={() => setPage('learning')}
          onFavorite={() => {}}
          onRecommend={() => {}}
          onStoryClick={() => {}}
        />
      )}
      {/* 頁面狀態為 'favorites' 時，渲染一個簡單的 div */}
      {page === 'favorites' && (
        <div>
          <h1>這是收藏集頁面！</h1>
          <button onClick={() => setPage('theme')}>返回</button>
        </div>
      )}
    </div>
  );
}

export default App;