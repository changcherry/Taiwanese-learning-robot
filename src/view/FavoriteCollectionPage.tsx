// src/view/FavoriteCollectionPage.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from '../assets/Back.svg';
import '../style/FavoriteCollectionPage.css';
import '../style/GameSelection.css';
import '../App.css';

/**
 * ✅ 之後如果主題要從資料庫載入，這裡只要改成從 API 取回 decks 就好。
 * 目前先和 FlashcardApp 保持一致：用 transportation 這個主題示範。
 */
type Card = { id: number; front: string; back: string };
type FavMap = { [id: number]: boolean };

const DECKS: Record<string, Card[]> = {
  transportation: [
    { id: 0, front: '捷運\ntsia̍-ūn\n(捷運)', back: '我逐工攏坐捷運去上班。\nGuá ta̍k-kang lóng tsē tsiat-ūn khì siōng-pan。\n(我每天都搭捷運去上班。)' },
    { id: 1, front: '怪手\nkuài-tshiú', back: '怪手（kuài-tshiú）佇咧挖塗。\n怪手正在挖土。' },
    { id: 2, front: '流籠\nliû-lông', back: '坐流籠上山。\n坐纜車上山。' },
    { id: 3, front: '飛行機\nhui-hîng-ki', back: '我坐飛行機去國外。\n我搭飛機去國外。' },
    { id: 4, front: '直升機\nti̍t-sing-ki', back: '直升機 tī 天頂盤旋。\n直升機在天上盤旋。' },
  ],
};

const favKeyOf = (theme: string) => `flashcard_favs_${theme}`;

const FavoriteCollectionPage: React.FC = () => {
  const navigate = useNavigate();

  // 每個主題各自一份收藏表
  const [favMaps, setFavMaps] = useState<Record<string, FavMap>>({});

  // 讀取所有主題的收藏
  const readAllFavs = () => {
    const next: Record<string, FavMap> = {};
    Object.keys(DECKS).forEach((theme) => {
      try {
        const raw = localStorage.getItem(favKeyOf(theme));
        next[theme] = raw ? JSON.parse(raw) : {};
      } catch {
        next[theme] = {};
      }
    });
    setFavMaps(next);
  };

  useEffect(() => {
    readAllFavs();
  }, []);

  // 跨分頁／返回時同步
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === 'visible') readAllFavs();
    };
    document.addEventListener('visibilitychange', onVisible);
    const onStorage = (e: StorageEvent) => {
      if (e.key && e.key.startsWith('flashcard_favs_')) readAllFavs();
    };
    window.addEventListener('storage', onStorage);
    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  // 展平成顯示清單
  const items = useMemo(
    () =>
      Object.entries(DECKS).flatMap(([theme, cards]) => {
        const fav = favMaps[theme] || {};
        return cards
          .filter((c) => !!fav[c.id])
          .map((c) => ({ theme, card: c }));
      }),
    [favMaps]
  );

  const removeFavorite = (theme: string, cardId: number) => {
    setFavMaps((prev) => {
      const next = { ...prev, [theme]: { ...(prev[theme] || {}) } };
      next[theme][cardId] = false;
      localStorage.setItem(favKeyOf(theme), JSON.stringify(next[theme]));
      return next;
    });
  };

  return (
    <div className="selection-bg">
      <header className="selection-header">
        <button
          type="button"
          className="back-button"
          aria-label="返回"
          onClick={() => navigate(-1)}
        >
          <img src={backIcon} alt="返回" />
        </button>
        <h1 className="header-title">單字收藏集</h1>
      </header>

      <main className="game-selection-main">
        {items.length === 0 ? (
          <p className="empty-message">還沒有收藏單字卡，回到單字卡頁面點星星即可加入喔！</p>
        ) : (
          <div className="story-grid">
            {items.map(({ theme, card }) => (
              <article
                key={`${theme}-${card.id}`}
                className="story-card"
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/flashcards/${theme}?card=${card.id}`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ')
                    navigate(`/flashcards/${theme}?card=${card.id}`);
                }}
                title="點擊開始複習這張"
              >
                {/* 左側：主題 + 單字 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  <strong style={{ opacity: 0.8 }}>主題：{theme}</strong>
                  <div>
                    {card.front.split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>

                <div className="card-divider" />

                {/* 右側：操作 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <button
                    className="favorite-button active"
                    aria-label="移除收藏"
                    title="移除收藏"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFavorite(theme, card.id);
                    }}
                  >
                    <span style={{ fontWeight: 700 }}>移除</span>
                  </button>

                  <button
                    className="favorite-button"
                    aria-label="複習這張"
                    title="複習這張"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/flashcards/${theme}?card=${card.id}`);
                    }}
                  >
                    <span style={{ fontWeight: 700 }}>複習</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default FavoriteCollectionPage;