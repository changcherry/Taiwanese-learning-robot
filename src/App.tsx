import { useState } from 'react';
import './App.css';
import LearningMode from './components/LearningMode';
import StoryModePage from './components/StoryModePage';
import ThemeSelectionPage from './components/ThemeSelectionPage';

function App() {
  const [page, setPage] = useState<'learning' | 'story' | 'theme'>('learning');

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
          onSelectTheme={theme => {
            // 可在這裡跳轉到單字卡內容頁
          }}
        />
      )}
      {page === 'story' && (
        <StoryModePage
				  onBack={() => setPage('learning')} onFavorite={function (): void {
					  throw new Error('Function not implemented.');
				  } } onRecommend={function (): void {
					  throw new Error('Function not implemented.');
				  } } onStoryClick={function (story: { id: number; title: string; }): void {
					  throw new Error('Function not implemented.');
				  } }          // 其他 props...
        />
      )}
    </div>
  );
}

export default App;