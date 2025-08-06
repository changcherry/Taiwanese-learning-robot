import { useRef, useState, useEffect } from "react";
import "../style/GameSelection.css";
import BackIcon from "../assets/Back.svg";
import KitchenImg from "../assets/可愛繽紛廚房.jpg";
import nature from "../assets/森林俱樂部.png";
import sport from "../assets/大家一起動一動.png";
import place from "../assets/地名小學家.png";
import clothes from "../assets/穿搭小百科.png";
import car from "../assets/誰是交通王.png";
import food from "../assets/食物探險家.png";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    title: "森林\n俱樂部",
    img: nature,
    path: "/nature-game",
  },
  {
    title: "大家一起動一動",
    img: sport,
  },
  {
    title: "地名小學家",
    img: place,
  },
  {
    title: "穿搭小百科",
    img: clothes,
  },
  {
    title: "誰是交通王",
    img:car,
  },
  {
    title: "食物探險家",
    img: food,
  },
  {
    title: "主題三",
    img: KitchenImg,
  },
  {
    title: "主題三",
    img: KitchenImg,
  },
  {
    title: "主題三",
    img: KitchenImg,
  },
  {
    title: "主題三",
    img: KitchenImg,
  },

];

export default function GameSelection() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  // 聚焦判斷
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cardsDom = Array.from(container.querySelectorAll(".game-card"));
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
    <div className="game-selection-bg">
      <header className="game-header">
        <button
          type="button"
          className="back-button"
          aria-label="Back"
          onClick={() => window.history.back()}
        >
          <img src={BackIcon} alt="" />
        </button>
        <h1 className="header-title">互動遊戲</h1>
      </header>
      <main className="game-selection-main">
        <div className="title-container">
          <h2 className="selection-title">主題模式</h2>
        </div>
        <div className="cards-container" ref={containerRef}>
          <div className="modes-container">
            {cards.map((card, idx) => (
              <div key={idx} className="card-wrapper">
                <button
                  className={`game-card${focusedIndex === idx ? " focused" : ""}`}
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
                  <img
                    src={card.img}
                    alt={card.title.replace(/\n/g, "")}
                    className="active-card-image"
                  />
                  <div className="active-card-title">
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
