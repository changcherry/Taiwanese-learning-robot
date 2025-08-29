//單字卡收藏
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from '../assets/Back.svg';
import '../style/FavoriteCollectionPage.css';
import '../style/GameSelection.css';
import '../App.css';
import volumeIcon from '../assets/volume up.svg';
import starIcon from '../assets/star.svg';

// 與 FlashcardApp.tsx 相同的卡片型別
type Card = {
  id: number;
  front: string;
  back: string;
};

// 為了在收藏頁面能夠完整顯示卡片內容，需要從 FlashcardApp.tsx 複製 DECKS
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

// 用來儲存帶有主題 ID 的收藏卡片
type FavoriteCardItem = Card & { themeId: string; };

// 用來追蹤卡片是否翻面
type FlippedState = { [id: number]: boolean };

const FavoriteCollectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [favoriteCards, setFavoriteCards] = useState<FavoriteCardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<FlippedState>({});

  // 從 localStorage 讀取所有收藏卡片
  useEffect(() => {
    const allFavoriteCards: FavoriteCardItem[] = [];
    const deckKeys = Object.keys(DECKS);

    deckKeys.forEach(deckKey => {
      const favKey = `flashcard_favs_${deckKey}`;
      try {
        const raw = localStorage.getItem(favKey);
        const favorites = raw ? JSON.parse(raw) : {};
        const favoritedIds = Object.keys(favorites).filter(id => favorites[Number(id)]);

        favoritedIds.forEach(id => {
          const card = DECKS[deckKey].find(c => c.id === Number(id));
          if (card) {
            allFavoriteCards.push({ ...card, themeId: deckKey });
          }
        });
      } catch (e) {
        console.error(`Failed to load favorites for ${deckKey}`, e);
      }
    });

    setFavoriteCards(allFavoriteCards);
  }, []);

  // 把括號內變細（全形/半形括號皆支援）
  const wrapParens = (s: string) =>
    s.replace(/\((.*?)\)/g, '<span class="thin-text">($1)</span>')
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
      [han, zh] = parts;
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
  
  // 處理卡片翻面
  const handleCardFlip = (cardId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  // 處理點擊刪除
  const handleDeleteFavorite = (themeId: string, cardId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止事件冒泡到卡片翻面
    const favKey = `flashcard_favs_${themeId}`;
    try {
      const raw = localStorage.getItem(favKey);
      const favorites = raw ? JSON.parse(raw) : {};
      
      delete favorites[cardId];
      localStorage.setItem(favKey, JSON.stringify(favorites));
      
      // 更新狀態以移除被刪除的卡片
      setFavoriteCards(prev => prev.filter(card => card.id !== cardId || card.themeId !== themeId));
      
      // 移除翻面狀態
      setFlippedCards(prev => {
        const next = { ...prev };
        delete next[cardId];
        return next;
      });
      
    } catch (e) {
      console.error('Failed to delete favorite from localStorage', e);
    }
  };

  // 處理點擊卡片導航
  const handleCardClick = (themeId: string, cardId: number) => {
    navigate(`/flashcards/${themeId}?card=${cardId}`);
  };

  return (
    <div className="selection-bg">
      <header className="selection-header">
        <button
          type="button"
          className="back-button"
          aria-label="返回"
          onClick={() => window.history.back()}
        >
          <img src={backIcon} alt="返回" />
        </button>
        <h1 className="header-title">我的收藏集</h1>
      </header>

      <main className="game-selection-main">
        {favoriteCards.length > 0 ? (
          <div className="favorite-cards-grid">
            {favoriteCards.map((card) => (
              <div
                key={`${card.themeId}-${card.id}`}
                className={`favorite-flashcard ${flippedCards[card.id] ? 'flipped' : ''}`}
                onClick={(e) => handleCardFlip(card.id, e)}
              >
                <div className="favorite-flashcard-inner">
                  {/* 正面 */}
                  <div className="favorite-flashcard-front">
                    <div className="favorite-card-icons">
                      <button
                    className="favorite-icon-button"
                    aria-label="Play sound"
                    onClick={e => e.stopPropagation()}
                  >
                    <img src={volumeIcon} alt="Volume Icon" />
                  </button>

                    </div>
                    <div className="favorite-flashcard-content">
                      {renderFront(card.front)}
                    </div>
                    <button
                        className="delete-button"
                        onClick={(e) => handleDeleteFavorite(card.themeId, card.id, e)}
                    >
                      刪除
                    </button>
                  </div>
                  {/* 背面 */}
                  <div className="favorite-flashcard-back">
                    <div className="favorite-card-icons">
                       <button
                    className="favorite-icon-button"
                    aria-label="Play sound"
                    onClick={e => e.stopPropagation()}
                  >
                    <img src={volumeIcon} alt="Volume Icon" />
                  </button>
                      
                    </div>
                    <div className="favorite-flashcard-content">
                      {renderBack(card.back)}
                    </div>
                    <button
                        className="delete-button"
                        onClick={(e) => handleDeleteFavorite(card.themeId, card.id, e)}
                    >
                      刪除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>您尚未收藏任何單字卡。</p>
        )}
      </main>
    </div>
  );
};

export default FavoriteCollectionPage;