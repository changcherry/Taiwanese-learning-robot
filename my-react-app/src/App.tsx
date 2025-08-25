import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//遊戲區
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
//小琳區
import StoryModePage from "./view/StoryModePage";
import ThemeSelectionPage from "./view/ThemeSelectionPage";
import FavoriteCollectionPage from "./view/FavoriteCollectionPage";
import FlashcardApp from './view/FlashcardApp';

//王跌跌區
import InstructionsPage from "./view/InstructionsPage";
import NotificationPage from "./view/NotificationPage";
import SettingsPage from "./view/SettingsPage";
import ProfileEditPage from "./view/ProfileEditPage";
import ResponsePage from "./view/ResponsePage";

//登入盧冠寧區
import Login from "./view/Login";
import LoginFailure from "./view/LoginFailure";
import LoginSuccess from "./view/LoginSuccess";
import Register from "./view/Register";
import RegisterFailure from "./view/RegisterFailure";
import First from "./view/First";
import RegisterSuccess from "./view/RegisterSuccess";
import Welcome from "./view/Welcome";

import "./Main.css";
import "./App.css";
import "./style/Game.css";
import "./Login.css";

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/*登入 */}
          <Route path="/" element={<First />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/LoginFailure" element={<LoginFailure />} />
          <Route path="/LoginSuccess" element={<LoginSuccess />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/RegisterFailure" element={<RegisterFailure />} />
          <Route path="/RegisterSuccess" element={<RegisterSuccess />} />
          <Route path="/Welcome" element={<Welcome />} />


          {/*小琳區 */}
          <Route path="/ThemeSelection" element={<ThemeSelectionPage />} />
          <Route path="/Learn" element={<LearningMode />} />
          <Route path="/FlashcardApp" element={<FlashcardApp onBack={function (): void {
            throw new Error("Function not implemented.");
          }} />} />
          <Route path="/FavoriteCollection" element={<FavoriteCollectionPage />} />
          <Route path="/StoryModePage" element={<StoryModePage onBack={function (): void {
            throw new Error("Function not implemented.");
          }} onStoryClick={function (story: { id: number; title: string; }): void {
            throw new Error("Function not implemented.");
          }} />} />

          {/*王跌跌區 */}
          <Route path="/NotificationPage" element={<NotificationPage />} />
          <Route path="/SettingsPage" element={<SettingsPage />} />
          <Route path="/ResponsePage" element={<ResponsePage />} />
           <Route path="/profileedit" element={<ProfileEditPage />} />
          <Route path="/InstructionsPage" element={<InstructionsPage />} />
          



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


          {/* 新增收藏頁面路由 */}

          <Route path="/favorites" element={<FavoriteCollectionPage />} />

          {/* 以下是遊戲相關路由 */}
          <Route path="/nature-game" element={<Game />} />
          <Route path="/nature-game-being" element={<NatureQuestion />} />
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