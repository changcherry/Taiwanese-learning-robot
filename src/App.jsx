import { useState } from 'react';
import './App.css';
import LearningMode from './components/LearningMode';
import StoryModePage from './components/StoryModePage';
import ThemeSelectionPage from './components/ThemeSelectionPage';
import FavoritePage from './components/FavoritePage';
import StoryDetailPage from './components/StoryDetailPage';
import FlashcardApp from './components/FlashcardApp'; // 確認有這個元件


function App() {
  const [page, setPage] = useState('story');
  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <>
      {page === 'learning' && (
        <LearningMode
          onSelectStory={() => setPage('story')}
          onSelectWordCard={() => setPage('theme')}
        />
      )}
      {page === 'story' && (
        <StoryModePage
          onBack={() => setPage('learning')}
          onFavorite={() => setPage('favorite')}
          onRecommend={() => setPage('story')}
          onStoryClick={story => {
            setSelectedStory(story);
            setPage('detail');
          }}
        />
      )}
      {page === 'theme' && (
        <ThemeSelectionPage
          onBack={() => setPage('learning')}
          onSelectTheme={theme => {
            if (theme === 'theme1') setPage('flashcard');
          }}
        />
      )}
      {page === 'flashcard' && (
        <FlashcardApp onBack={() => setPage('theme')} />
      )}
      {page === 'favorite' && (
        <FavoritePage
          onBack={() => setPage('story')}
          onStoryClick={story => {
            setSelectedStory(story);
            setPage('detail');
          }}
        />
      )}
      {page === 'detail' && (
        <StoryDetailPage
          story={selectedStory}
          onBack={() => setPage('story')}
        />
      )}
    </>
  );
}

export default App;