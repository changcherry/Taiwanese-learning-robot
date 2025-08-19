// src/view/FlashcardApp.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../style/FlashcardApp.css';
import backIcon from '../assets/back.svg';

import volumeIcon from '../assets/volume up.svg';
import leftArrow from '../assets/left.svg';
import rightArrow from '../assets/right.svg';
import starIcon from '../assets/star.svg';

type Card = {
  id: number;
  front: string;  // 期待：漢字 \n 台羅 \n （中文）
  back: string;   // 期待：漢字例句 \n 台羅例句 \n （中文翻譯）
};

type FlashcardAppProps = {
  onBack: () => void;
  themeId?: string; // /flashcards/:themeId
};

// 之後要接 DB 就把這裡替換掉
const DECKS: Record<string, Card[]> = {
  transportation: [
    { id: 0, front: '捷運\ntsia̍-ūn\n（捷運）', back: '我逐工攏坐捷運去上班。\nGuá ta̍k-kang lóng tsē tsiat-ūn khì siōng-pan。\n（我每天都搭捷運去上班。）' },
    { id: 1, front: '怪手\nkuài-tshiú\n（挖土機）', back: '怪手佇咧挖塗。\nKuài-tshiú tī-leh ueh-thôo.\n（挖土機正在挖土。）' },
    { id: 2, front: '流籠\nliû-lông\n（纜車）', back: '阮坐流籠上山。\nGóan tsē liû-lông siōng-suann.\n（我們坐纜車上山。）' },
    { id: 3, front: '飛行機\nhui-hîng-ki\n（飛機）', back: '我坐飛行機去國外。\nGuá tsē hui-hîng-ki khì kok-guā.\n（我搭飛機去國外。）' },
    { id: 4, front: '直升機\nti̍t-sing-ki\n（直升機）', back: '直升機 tī 天頂盤旋。\nTi̍t-sing-ki tī thian-tíng puân-sûn.\n（直升機在天上盤旋。）' },
  ],
  default: []
};

export default function FlashcardApp({ onBack, themeId }: FlashcardAppProps) {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  // 主題判定（未傳或不存在就用 transportation）
  const deckKey = themeId && DECKS[themeId] ? themeId : 'transportation';
  const cards = useMemo<Card[]>(() => DECKS[deckKey] ?? DECKS.default, [deckKey]);

  // 收藏 key（依主題分開存）
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
    e.stopPropagation(); // 不要觸發翻面
    if (!currentCard) return;
    const id = currentCard.id;
    setFavorites(prev => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(FAV_KEY, JSON.stringify(next)); // ← 寫入 localStorage
      return next;
    });
  };

  const isCurrentCardFavorited = !!(currentCard && favorites[currentCard.id]);

  // 把括號內變細（全形/半形括號皆支援）
  const wrapParens = (s: string) =>
    s
      .replace(/\((.*?)\)/g, '<span class="thin-text">($1)</span>')
      .replace(/（(.*?)）/g, '<span class="thin-text">（$1）</span>');

  // 安全 split（同時處理 \r\n）
  const safeSplit = (text?: string | null) => (text || '').split(/\r?\n/);

  // 正面：上（漢字）／中（台羅）／下（中文）
  const renderFront = (text?: string | null) => {
    const [han = '', tl = '', zh = ''] = safeSplit(text);
    return (
      <div className="word-stack">
        <p className="word-han">{han}</p>
        <p className="word-tl">{tl}</p>
        <p className="word-zh" dangerouslySetInnerHTML={{ __html: wrapParens(zh) }} />
      </div>
    );
  };

  // 背面：例句 上（漢字句）／中（台羅句）／下（中文翻譯）
  const renderBack = (text?: string | null) => {
    const parts = safeSplit(text);
    let han = '', tl = '', zh = '';
    if (parts.length >= 3) {
      [han, tl, zh] = parts;
    } else if (parts.length === 2) {
      [han, zh] = parts; // 只有漢字 + 中文
      tl = '';
    } else if (parts.length === 1) {
      han = parts[0];
    }
    return (
      <div className="sentence-stack">
        <p className="sent-han">{han}</p>
        {tl && <p className="sent-tl">{tl}</p>}
        {zh && <p className="sent-zh" dangerouslySetInnerHTML={{ __html: wrapParens(zh) }} />}
      </div>
    );
  };

  // 返回：若父層沒傳 onBack 就 fallback navigate(-1)
  const doBack = () => {
    if (typeof onBack === 'function') return onBack();
    navigate(-1);
  };

  return (
    <>
      <header id="header" className="site-header">
        <div className="header-content">
          <button className="back-button" aria-label="Go back" onClick={doBack}>
            <img src={backIcon} alt="Back Icon" />
          </button>
          <h1 className="header-title">台語單字卡</h1>
        </div>
      </header>

      <main id="flashcard-app" className="flashcard-section">
        <div className="flashcard-area">
          <div
            className={`flashcard ${flipped ? 'flipped' : ''}`}
            onClick={() => setFlipped(f => !f)}
          >
            <div className="flashcard-inner">
              {/* 正面 */}
              <div className="flashcard-front">
                <div className="card-icons">
                  <button
                    className="icon-button"
                    aria-label="Play sound"
                    onClick={e => e.stopPropagation()}
                  >
                    <img src={volumeIcon} alt="Volume Icon" />
                  </button>
                  <button
                    className="icon-button"
                    aria-label="Add to favorites"
                    onClick={handleFavoriteToggle}
                  >
                    <img
                      src={starIcon}
                      alt="Star Icon"
                      className={`star-icon ${isCurrentCardFavorited ? 'favorited' : ''}`}
                    />
                  </button>
                </div>
                <div className="flashcard-content">
                  {renderFront(currentCard?.front)}
                </div>
              </div>

              {/* 背面 */}
              <div className="flashcard-back">
                <div className="card-icons">
                  <button
                    className="icon-button"
                    aria-label="Play sound"
                    onClick={e => e.stopPropagation()}
                  >
                    <img src={volumeIcon} alt="Volume Icon" />
                  </button>
                  <button
                    className="icon-button"
                    aria-label="Add to favorites"
                    onClick={handleFavoriteToggle}
                  >
                    <img
                      src={starIcon}
                      alt="Star Icon"
                      className={`star-icon ${isCurrentCardFavorited ? 'favorited' : ''}`}
                    />
                  </button>
                </div>
                <div className="flashcard-content">
                  {renderBack(currentCard?.back)}
                </div>
              </div>
            </div>
          </div>

          <nav className="card-navigation">
            <button
              className="nav-arrow"
              aria-label="Previous card"
              onClick={handlePrevCard}
              disabled={currentIndex === 0}
            >
              <img src={leftArrow} alt="Previous" />
            </button>
            <span className="page-counter">
              {currentIndex + 1}/{cards.length}
            </span>
            <button
              className="nav-arrow"
              aria-label="Next card"
              onClick={handleNextCard}
              disabled={currentIndex === cards.length - 1}
            >
              <img src={rightArrow} alt="Next" />
            </button>
          </nav>
        </div>
      </main>
    </>
  );
}