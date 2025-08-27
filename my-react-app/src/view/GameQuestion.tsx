// 遊戲問答介面
import { useRef, useState, useEffect, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../style/GameQuestion.css";
import "../Main.css";
import "../App.css";
import BackIcon from "../assets/Back.svg";
import SpeakerIcon from "../assets/播放鍵.svg";
import CheckIcon from "../assets/正確.png"; 
import WrongIcon from "../assets/錯誤.png"; 
import ScoreDisplay from './ScoreDisplay.tsx'; 
// 引入音效檔案
import CorrectSound from "../assets/正確音效.wav";   
import WrongSound from "../assets/錯誤音效.wav";     
import GameOverSound from "../assets/查看分數音效2.wav"; 
import ButtonClickSound from "../assets/遊戲開始介面音效.wav"; 
// 引入所有題目資料
import { allGameQuestions } from "../data/gameQuestionsData";

// 定義題目的介面
interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

// 定義主題的介面
interface GameTheme {
  title: string;
  img: string;
  path: string;
}

// 隨機選擇題目的函數
// 從一個陣列中隨機取出 n 個不重複的元素
const getRandomQuestions = (questions: Question[], num: number): Question[] => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

export default function GameQuestion() {
  const navigate = useNavigate();
  const location = useLocation();

  // 從路由的 state 中獲取主題資料
  const theme = location.state?.theme as GameTheme;

  // 如果沒有主題資料，則導回遊戲選擇頁面
  if (!theme) {
    navigate("/GameSelection");
    return null;
  }

  // 根據主題的 path 選擇對應的完整題庫
  const allQuestionsForTheme = allGameQuestions[theme.path] || [];
  
  // 使用 useState 來儲存隨機選出的題目，並確保只在元件初次渲染時執行一次
  const [gameQuestions, setGameQuestions] = useState<Question[]>(() => {
    // 確保題庫足夠，否則返回所有題目
    const numQuestions = 10;
    return allQuestionsForTheme.length > numQuestions 
      ? getRandomQuestions(allQuestionsForTheme, numQuestions)
      : allQuestionsForTheme;
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [nextButtonVisible, setNextButtonVisible] = useState(false);

  // 檢查隨機題目集是否為空
  const currentQuestion = gameQuestions[currentQuestionIndex];
  if (!currentQuestion) {
      return (
        <div className="selection-bg error-container">
          <p className="error-text">這個主題目前沒有題目！</p>
          <button className="back-button-in-error" onClick={() => navigate("/GameSelection")}>返回主題選擇</button>
        </div>
      );
  }

  // 創建 Audio 對象的實例
  const correctAudio = useRef(new Audio(CorrectSound));
  const wrongAudio = useRef(new Audio(WrongSound));
  const gameOverAudio = useRef(new Audio(GameOverSound));
  const buttonClickAudio = useRef(new Audio(ButtonClickSound));

  const handleSpeakerClick = () => {
    alert("播放題目語音！");
  };

  const handleOptionClick = (option: string) => {
    if (showResult) return;
    setSelectedOption(option);
    const correct = option === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(prevScore => prevScore + 1);
      correctAudio.current.play();

      setTimeout(() => {
        if (currentQuestionIndex < gameQuestions.length - 1) {
          setCurrentQuestionIndex(prevIndex => prevIndex + 1);
          setSelectedOption(null);
          setShowResult(false);
          setIsCorrect(false);
        } else {
          gameOverAudio.current.play();
          setQuizCompleted(true);
        }
      }, 2000);
    } else {
      wrongAudio.current.play();
      setNextButtonVisible(true);
    }
  };

  const handleNextQuestion = () => {
    buttonClickAudio.current.play();
    if (currentQuestionIndex < gameQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
      setIsCorrect(false);
      setNextButtonVisible(false);
    } else {
      gameOverAudio.current.play();
      setQuizCompleted(true);
    }
  };

  // 處理重新開始遊戲
  const handleRestartGame = () => {
    // 重新開始時，需要重新隨機選擇題目
    const newRandomQuestions = allQuestionsForTheme.length > 10 
      ? getRandomQuestions(allQuestionsForTheme, 10)
      : allQuestionsForTheme;
    setGameQuestions(newRandomQuestions); // 更新遊戲題目
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
    setIsCorrect(false);
    setQuizCompleted(false);
    setNextButtonVisible(false);
  };
  
  if (quizCompleted) {
    return (
      <ScoreDisplay
        score={score}
        totalQuestions={gameQuestions.length}
        onRestartGame={handleRestartGame}
      />
    );
  }

  return (
    <div className="selection-bg ">
      <header className="selection-header ">
        <button
          type="button"
          className="back-button"
          aria-label="Back"
          onClick={() => navigate(-1)}
        >
          <img src={BackIcon} alt="返回" />
        </button>
        <h1 className="car-header-title">{theme.title.replace(/\n/g, "")}</h1>
      </header>

      <main className="game-question-main">
        {/* 題號區塊 */}
        <div className="question-number-container">
          <span className="question-number-label">第</span>
          <span className="current-question-num">{currentQuestionIndex + 1}</span>
          <span className="question-number-label">/</span>
          <span className="total-questions-num">{gameQuestions.length}</span>
          <span className="question-number-label">題</span>
        </div>

        {/* 播放鍵的獨立容器 */}
        <div className="speaker-button-container">
          <button className="speaker-button" onClick={handleSpeakerClick}>
            <img src={SpeakerIcon} alt="播放語音" />
          </button>
        </div>

        {/* 題目文字的獨立容器 */}
        <div className="question-text-container">
          <p className="question-text">{currentQuestion.text}</p>
        </div>

        {/* 選項區塊 */}
        <div className="options-grid">
          {currentQuestion.options.map((option, index) => {
            if (typeof option !== "string") return null;
            const isThisOptionCorrect = option === currentQuestion.correctAnswer;
            const isThisOptionSelected = selectedOption === option;

            const buttonClassName = `option-button ${
              showResult
                ? isThisOptionCorrect
                  ? 'correct-answer'
                  : isThisOptionSelected
                    ? 'incorrect-answer'
                    : ''
                : ''
            }`;

            return (
              <button
                key={index}
                className={buttonClassName}
                onClick={() => handleOptionClick(option)}
                disabled={showResult}
              >
                {option}
                {showResult && (
                  <>
                    {isThisOptionCorrect && (
                      <img src={CheckIcon} alt="正確" className="correct-check-icon" />
                    )}
                    {isThisOptionSelected && !isCorrect && (
                      <img src={WrongIcon} alt="錯誤" className="incorrect-wrong-icon" />
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>
        {nextButtonVisible && (
          <button className="next-question-button" onClick={handleNextQuestion}>
            {currentQuestionIndex < gameQuestions.length - 1 ? "下一題" : "查看結果"}
          </button>
        )}
      </main>
    </div>
  );
}