// 遊戲主介面
import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // 新增 useLocation
import ButtonClickSound from "../assets/遊戲開始介面音效.wav";
import "../style/Game.css";
import "../Main.css";

// 定義主題的介面，與 GameSelection 中的卡片資料結構一致
interface GameTheme {
  title: string;
  img: string; // 注意這裡的屬性名是 'img'
  path: string;
}

export default function Game() {
  const navigate = useNavigate();
  const location = useLocation(); // 接收傳入的 state
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // 從路由的 state 中獲取主題資料
  const theme = location.state?.theme as GameTheme;

  // 如果沒有主題資料，則導回遊戲選擇頁面
  if (!theme) {
    navigate("/GameSelection");
    return null;
  }

  const buttonClickAudio = useRef(new Audio(ButtonClickSound));
  const playButtonClickSound = () => {
    buttonClickAudio.current.play();
  };

  return (
    <div className="game-selection-bg">
      <div
        className="main-menu full-screen"
        style={{ backgroundImage: `url(${theme.img})`, backgroundSize: "cover" }}
      >
        <div className="main-menu-overlay">
          <h1 className="main-menu-title">{theme.title.replace(/\n/g, "")}</h1>
          <div className="menu-buttons">
            <button
              className="start-button"
              onClick={() => {
                playButtonClickSound();
                navigate("/GameQuestion", { state: { theme } });
              }}
            >
              開始遊戲
            </button>

            <button
              className="exit-button"
              onClick={() => {
                playButtonClickSound();
                setShowExitConfirm(true);
              }}
            >
              退出遊戲
            </button>
          </div>

          {showExitConfirm && (
            <div className="confirm-dialog">
              <div className="confirm-box">
                <p>確定要離開遊戲嗎？</p>
                <div className="confirm-actions">
                  <button
                    onClick={() => {
                      playButtonClickSound();
                      navigate("/GameSelection2");
                    }}
                  >
                    是
                  </button>
                  <button
                    onClick={() => {
                      playButtonClickSound();
                      setShowExitConfirm(false);
                    }}
                  >
                    否
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}