import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameSelection from './view/GameSelection';
import Game from './view/Game';
import Home from './view/Home'
import GameQuestion from "./view/GameQuestion";
import ScoreDisplay from "./view/ScoreDisplay";
import LearningMode from './view/LearningMode';
import CarGame from './view/CarGame';
import FoodGame from './view/FoodGame';
import AppliancesGame from "./view/AppliancesGame"
import BuildingGame from './view/BuildingGame';
import PlaceGame from './view/PlaceGame';
import SportGame from './view/SportGame';
import Clothes from './view/ClothesGame';
import ThemeSelectionPage from "./view/ThemeSelectionPage";
import CarQuestion from "./view/CarQuestion";
import FavoriteCollectionPage from "./view/FavoriteCollectionPage"; // 1. Import the new page

import "./App.css";
import "./style/Game.css";

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LearningMode />} />
          <Route path="/Game" element={<GameSelection />} />
          <Route path="/CarGame" element={<CarGame />} />
          <Route path="/FoodGame" element={<Game />} />
          <Route path="/AppliancesGame" element={<AppliancesGame />} />
          <Route path="/BuildingGame" element={<BuildingGame />} />
          <Route path="/PlaceGame" element={<PlaceGame />} />
          <Route path="/SportGame" element={<SportGame />} />
          <Route path="/FoodtGame" element={<FoodGame />} />
          <Route path="/ClothesGame" element={<Clothes />} />
          <Route path="/GameQuestion" element={<GameQuestion />} />
          <Route path="/ThemeSelection" element={<ThemeSelectionPage />} />
          <Route path="/CarQuestion" element={<CarQuestion />} />
          <Route path="/Home" element={<Home />} />

          {/* 新增收藏頁面路由 */}

          <Route path="/favorites" element={<FavoriteCollectionPage />} />

          {/* 以下是遊戲相關路由 */}
          <Route path="/nature-game" element={<Game />} />
          <Route path="/nature-game-being" element={<GameQuestion />} />
          <Route
            path="/nature-game-score"
            element={
              <ScoreDisplay
                score={0}
                totalQuestions={0}
                onRestartGame={() => { }}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}