import { useEffect, useRef, useState } from 'react';
import '../style/LearningMode.css';
import "../style/GameSelection.css";
//import '../App.css'; 
import backIcon from '../assets/Back.svg';
import { useNavigate } from 'react-router-dom';

const cards = [
    {
        title: "台語\n單字卡",

        path: "/ThemeSelection",
    },
    {
        title: "台語\n故事集",
        path: "/Game",
    },
    {
        title: "互動\n遊戲",
        path: "/Game",
    },

];

export default function LearningMode() {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const [focusedIndex, setFocusedIndex] = useState(0);

    // 聚焦判斷
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const cardsDom = Array.from(container.querySelectorAll(".learn-card"));
            let closestIndex = 0;
            let closestDistance = Infinity;

            cardsDom.forEach((card, index) => {
                const rect = (card as HTMLElement).getBoundingClientRect();
                const cardCenter = rect.left + rect.width / 2;
                const distance = Math.abs(cardCenter - window.innerWidth / 2);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            setFocusedIndex(closestIndex);
        };

        handleScroll();
        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="learn-selection-bg">
            <header className="selection-header">
        <button
          type="button"
          className="back-button"
          aria-label="返回"
          onClick={() => navigate("/")}
        >
          <img src={backIcon} alt="返回" />
        </button>
        <h1 className="game-header-title">互動遊戲</h1>
      </header>
      <main className="learn-selection-main">
                <div className="learn-cards-container" ref={containerRef}>
                    <div className="learn-modes-container">
                        {cards.map((card, idx) => (
                            <div key={idx} className="learn-card-wrapper">
                                <button
                                    className={`learn-card${focusedIndex === idx ? " focused" : ""}`}
                                    onClick={() => card.path && navigate(card.path)}
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault(); // 阻止空白鍵滾動
                                            card.path && navigate(card.path);
                                        }
                                    }}
                                    style={{ cursor: card.path ? "pointer" : "default" }}
                                >
                                  
                                    <div className="learn-active-card-title">
                                        {card.title.split("\n").map((line, i) => (
                                            <span key={i}>
                                                {line}
                                                <br />
                                            </span>
                                        ))}
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

