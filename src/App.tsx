import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//遊戲區
import Home from './view/Home'
import ScoreDisplay from "./view/ScoreDisplay";
import LearningMode from './view/LearningMode';
import GameQuestion from "./view/GameQuestion";
import GameMain from "./view/GameMain";
import GameSelection2 from "./view/GameSelection2";
import Monopoly from "./view/Monopoly";
import ScoreSummary from "./view/ScoreSummary";

//小琳區
import StoryModePage from "./view/StoryModePage";
import ThemeSelectionPage from "./view/ThemeSelectionPage";
import FavoriteCollectionPage from "./view/FavoriteCollectionPage";
import FlashcardApp from './view/FlashcardApp';
import LoveStoryPage from "./view/LoveStoryPage";
import StoryDetailPage from './view/StoryDetailPage';
import StoryCard from "./view/StoryCard";


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
          <Route path="/LoveStoryPage" element={<LoveStoryPage />} />
          <Route path="/StoryDetailPage" element={< StoryDetailPage story={{
            id: 0,
            title: "",
            content: undefined,
            image: undefined
          }} onBack={function (): void {
            throw new Error("Function not implemented.");
          } }  />} />
         

          
          {/*王跌跌區 */}
          <Route path="/NotificationPage" element={<NotificationPage />} />
          <Route path="/SettingsPage" element={<SettingsPage />} />
          <Route path="/ResponsePage" element={<ResponsePage />} />
           <Route path="/profileedit" element={<ProfileEditPage />} />
          <Route path="/InstructionsPage" element={<InstructionsPage />} />
          



          {/* 遊戲相關路由 */}

          <Route path="/GameMain" element={<GameMain />} />
          <Route path="/GameSelection2" element={<GameSelection2 />} />
          <Route path="/GameQuestion" element={<GameQuestion />} />
          <Route path="/ScoreDisplay" element={<ScoreDisplay score={0} totalQuestions={10} onRestartGame={function (): void {
            throw new Error("Function not implemented.");
          }} />} />
          <Route path="/Monopoly" element={<Monopoly />} />
          <Route path="/ScoreSummary" element={<ScoreSummary />} />
          {/* 新增收藏頁面路由 */}

          <Route path="/favorites" element={<FavoriteCollectionPage />} />

          


        </Routes>
      </div>
    </Router>
  );
}