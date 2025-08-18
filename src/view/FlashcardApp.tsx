// src/view/FlashcardApp.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../style/FlashcardApp.css';
import backIcon from '../assets/back.svg';
import bgImage from '../assets/22600173.png';
import volumeIcon from '../assets/volume up.svg';
import leftArrow from '../assets/left.svg';
import rightArrow from '../assets/right.svg';
import starIcon from '../assets/star.svg';

type Card = {
  id: number;
  front: string;
  back: string;
  image?: string | null;
};

type FlashcardAppProps = {
  onBack: () => void;
  themeId?: string; // /flashcards/:themeId
};

// 之後要接 DB 就把這裡替換掉
const DECKS: Record<string, Card[]> = {
  transportation: [
    { id: 0, front: '捷運\ntsia̍-ūn', back: '我逐工攏坐捷運去上班。\nGuá ta̍k-kang lóng tsē tsiat-ūn khì siōng-pan。\n(我每天都搭捷運去上班。)' },
    { id: 1, front: '怪手\nkuài-tshiú', back: '怪手（kuài-tshiú）佇咧挖塗。\n怪手正在挖土。' },
    { id: 2, front: '流籠\nliû-lông', back: '坐流籠上山。\n坐纜車上山。' },
    { id: 3, front: '飛行機\nhui-hîng-ki', back: '我坐飛行機去國外。\n我搭飛機去國外。' },
    { id: 4, front: '直升機\nti̍t-sing-ki', back: '直升機 tī 天頂盤旋。\n直升機在天上盤旋。' },
  ],
  default: []
};

export default function FlashcardApp({ onBack, themeId }: FlashcardAppProps) {
  const [params] = useSearchParams();
  const deckKey = themeId && DECKS[themeId] ? themeId : 'transportation';
  const cards = useMemo<Card[]>(() => DECKS[deckKey] ?? DECKS.default, [deckKey]);

  const FAV_KEY = `flashcard_favs_${deckKey}`;

  const [flipped, setFlipped] = useState(false);
  const [favorites, setFavorites] = useState<{ [id: number]: boolean }>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  // 讀 favorites
  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAV_KEY);
      setFavorites(raw ? JSON.parse(raw) : {});
    } catch {
      setFavorites({});
    }
  }, [FAV_KEY]);

  // 切主題 → 回第一張
  useEffect(() => {
    setCurrentIndex(0);
    setFlipped(false);
  }, [deckKey]);

  // 支援 /flashcards/:themeId?card=3 直接定位
  useEffect(() => {
    const target = params.get('card');
    if (!target) return;
    const id = Number(target);
    const idx = cards.findIndex(c => c.id === id);
    if (idx >= 0) setCurrentIndex(idx);
  }, [params, cards]);

  const currentCard = cards[currentIndex];

  const handleNextCard = () => {
    setCurrentIndex(prev => Math.min(prev + 1, cards.length - 1));
    setFlipped(false);
  };

  const handlePrevCard = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
    setFlipped(false);
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentCard) return;
    const id = currentCard.id;
    setFavorites(prev => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(FAV_KEY, JSON.stringify(next)); // ← 寫入 localStorage
      return next;
    });
  };

  const isCurrentCardFavorited = !!(currentCard && favorites[currentCard.id]);

  const renderCardText = (text?: string | null) =>
    (text || '').split('\n').map((line, i) => (
      <p key={i} className={`flashcard-text-line ${i === 2 ? 'flashcard-text-chinese' : ''}`}>
        {line}
      </p>
    ));

  return (
    <>
      <header id="header" className="site-header">
        <div className="header-content">
          <button className="back-button" aria-label="Go back" onClick={onBack}>
            <img src={backIcon} alt="Back Icon" />
          </button>
          <h1 className="header-title">台語單字卡</h1>
        </div>
      </header>

      <main id="flashcard-app" className="flashcard-section">
        <img className="background-pattern" src={bgImage} alt="background pattern" />
        <div className="flashcard-area">
          <div
            className={`flashcard ${flipped ? 'flipped' : ''}`}
            onClick={() => setFlipped(f => !f)}
          >
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <div className="card-icons">
                  <button className="icon-button" aria-label="Play sound" onClick={e => e.stopPropagation()}>
                    <img src={volumeIcon} alt="Volume Icon" />
                  </button>
                  <button className="icon-button" aria-label="Add to favorites" onClick={handleFavoriteToggle}>
                    <img
                      src={starIcon}
                      alt="Star Icon"
                      className={`star-icon ${isCurrentCardFavorited ? 'favorited' : ''}`}
                    />
                  </button>
                </div>
                <div className="flashcard-content">{renderCardText(currentCard?.front)}</div>
              </div>

              <div className="flashcard-back">
                <div className="card-icons">
                  <button className="icon-button" aria-label="Play sound" onClick={e => e.stopPropagation()}>
                    <img src={volumeIcon} alt="Volume Icon" />
                  </button>
                  <button className="icon-button" aria-label="Add to favorites" onClick={handleFavoriteToggle}>
                    <img
                      src={starIcon}
                      alt="Star Icon"
                      className={`star-icon ${isCurrentCardFavorited ? 'favorited' : ''}`}
                    />
                  </button>
                </div>
                <div className="flashcard-content">{renderCardText(currentCard?.back)}</div>
              </div>
            </div>
          </div>

          <nav className="card-navigation">
            <button className="nav-arrow" aria-label="Previous card" onClick={handlePrevCard} disabled={currentIndex === 0}>
              <img src={leftArrow} alt="Previous" />
            </button>
            <span className="page-counter">{currentIndex + 1}/{cards.length}</span>
            <button className="nav-arrow" aria-label="Next card" onClick={handleNextCard} disabled={currentIndex === cards.length - 1}>
              <img src={rightArrow} alt="Next" />
            </button>
          </nav>
        </div>
      </main>
    </>
  );
}