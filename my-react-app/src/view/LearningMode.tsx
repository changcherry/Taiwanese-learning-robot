import { useEffect, useRef, useState } from 'react';
import '../style/LearningMode.css';
import "../style/GameSelection.css";
import "../style/Home.css";
import "../App.css";
import bellIcon from "../assets/icon-bell.png";
import gearIcon from "../assets/icon-gear.png";
import userIcon from "../assets/icon-user.png";
import chevronIcon from "../assets/icon-chevron.png";

import { useNavigate } from 'react-router-dom';

const cards = [
    {
        title: "台語\n單字卡",

        path: "/ThemeSelection",
    },

    {
        title: "情境\n對話",
        path: "/Home",
    },
    {
       title: "互動\n遊戲",
        path: "/Game",
    },{
        title: "台語\n故事集",
        path: "/StoryModePage",
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
        <div className="selection-bg">
            <header className="selection-header">
       <p className="greeting-title">產品名稱</p>
        <h1 className="game-header-title"></h1>
        <button className="nav-button" onClick={() => navigate("/NotificationPage")}>
            <img src={bellIcon} alt="通知" className="nav-icon" />
            <span className="nav-label">通知</span>
          </button>
          <button className="nav-button" onClick={() => navigate("/SettingsPage")}>
            <img src={gearIcon} alt="設定" className="nav-icon" />
            <span className="nav-label">設定</span>
          </button>
          <button className="nav-button" onClick={() => navigate("/")}>
            <img src={userIcon} alt="登出" className="nav-icon" />
            <span className="nav-label">登出</span>
            <img src={chevronIcon} alt="Chevron" className="chevron-icon" />
          </button>
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

