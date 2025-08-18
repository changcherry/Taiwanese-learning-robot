// src/App.tsx
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from "react-router-dom";

// 遊戲區
import GameSelection from './view/GameSelection';
import Game from './view/NatureGame';
import NatureQuestion from "./view/NatureQuestion";
import Home from './view/Home'
import ScoreDisplay from "./view/ScoreDisplay";
import LearningMode from './view/LearningMode';
import CarGame from './view/CarGame';
import CarQuestion from "./view/CarQuestion";
import FoodGame from './view/FoodGame';
import FoodQuestion from './view/FoodQuestion';
import AppliancesGame from "./view/AppliancesGame"
import AppliancesQuestion from "./view/AppliancesQuestion";
import BuildingGame from './view/BuildingGame';
import BuildingQuestion from './view/BuildingQuestion';
import PlaceGame from './view/PlaceGame';
import PlaceQuestion from './view/PlaceQuestion';
import SportGame from './view/SportGame';
import SportQuestion from './view/SportQuestion';
import Clothes from './view/ClothesGame';
import ClothesQuestion from './view/ClothesQuestion';

// 小琳區
import StoryModePage from "./view/StoryModePage";
import StoryDetailPage from "./view/StoryDetailPage";
import ThemeSelectionPage from "./view/ThemeSelectionPage";
import FavoriteCollectionPage from "./view/FavoriteCollectionPage";
import FlashcardApp from './view/FlashcardApp';
import LoveStoryPage from "./view/LoveStoryPage";

// 登入區
import Login from "./view/Login";
import LoginFailure from "./view/LoginFailure";
import LoginSuccess from "./view/LoginSuccess";
import Register from "./view/Register";
import RegisterFailure from "./view/RegisterFailure";

// 故事資料
import { stories } from "./data/stories";

import "./Main.css";
import "./App.css";
import "./style/Game.css";
import "./Login.css";

// 包裝：從 URL 讀取故事 id
function StoryDetailWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const storyId = Number(id);
  const story = stories.find((s) => s.id === storyId);

  if (!story) {
    return (
      <div style={{ padding: 24 }}>
        <p>找不到這個故事</p>
        <button onClick={() => navigate(-1)}>返回</button>
      </div>
    );
  }
  return <StoryDetailPage story={story} onBack={() => navigate(-1)} />;
}

// ✅ 新增：包裝 Flashcard，從 URL 讀取 themeId
function FlashcardWrapper() {
  const { themeId = "" } = useParams();
  const navigate = useNavigate();
  return <FlashcardApp themeId={themeId} onBack={() => navigate(-1)} />;
}

export default function App() {
  const noop = () => {};

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* 登入 */}
          <Route path="/Login" element={<Login />} />
          <Route path="/LoginFailure" element={<LoginFailure />} />
          <Route path="/LoginSuccess" element={<LoginSuccess />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/RegisterFailure" element={<RegisterFailure />} />

          {/* 小琳區 */}
          <Route path="/" element={<LearningMode />} />
          <Route path="/ThemeSelection" element={<ThemeSelectionPage />} />
          {/* 保留原本靜態路由（相容用） */}
          <Route path="/FlashcardApp" element={<FlashcardApp onBack={noop} />} />
          {/* ✅ 新增：依主題切換的動態路由 */}
          <Route path="/flashcard/:themeId" element={<FlashcardWrapper />} />
          <Route path="/FavoriteCollection" element={<FavoriteCollectionPage />} />
          <Route path="/StoryModePage" element={<StoryModePage onBack={noop} onStoryClick={noop} />} />
          <Route path="/story/:id" element={<StoryDetailWrapper />} />
          <Route path="/flashcards/:themeId" element={<FlashcardWrapper />} />
          <Route path="/favorites" element={<FavoriteCollectionPage />} />
          {/* 遊戲相關路由 */}
          <Route path="/Game" element={<GameSelection />} />
          <Route path="/CarGame" element={<CarGame />} />
          <Route path="/NatureGame" element={<Game />} />
          <Route path="/AppliancesGame" element={<AppliancesGame />} />
          <Route path="/AppliancesQuestion" element={<AppliancesQuestion />} />
          <Route path="/BuildingGame" element={<BuildingGame />} />
          <Route path="/BuildingQuestion" element={<BuildingQuestion />} />
          <Route path="/PlaceGame" element={<PlaceGame />} />
          <Route path="/PlaceQuestion" element={<PlaceQuestion />} />
          <Route path="/SportGame" element={<SportGame />} />
          <Route path="/SportQuestion" element={<SportQuestion />} />
          <Route path="/FoodGame" element={<FoodGame />} />
          <Route path="/FoodQuestion" element={<FoodQuestion />} />
          <Route path="/ClothesGame" element={<Clothes />} />
          <Route path="/ClothesQuestion" element={<ClothesQuestion />} />
          <Route path="/NatureQuestion" element={<NatureQuestion />} />
          <Route path="/CarQuestion" element={<CarQuestion />} />

          {/* 收藏頁面 */}
          <Route path="/favorites" element={<FavoriteCollectionPage />} />
          <Route path="/lovestory" element={<LoveStoryPage />} />

          {/* 遊戲分數顯示 */}
          <Route
            path="/nature-game-score"
            element={<ScoreDisplay score={0} totalQuestions={0} onRestartGame={() => {}} />}
          />
        </Routes>
      </div>
    </Router>
  );
}