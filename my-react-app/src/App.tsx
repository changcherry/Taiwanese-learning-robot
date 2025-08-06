import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameSelection from './view/GameSelection';
import Game from './view/Game';
import GameQuestion from "./view/GameQuestion";
import ScoreDisplay from "./view/ScoreDisplay";


export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/Game" element={<GameSelection />} />
        

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
