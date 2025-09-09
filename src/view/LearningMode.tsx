import { useEffect, useRef, useState, useCallback } from 'react';
import '../style/LearningMode.css';
import '../style/GameSelection.css';
import '../style/Home.css';
import '../App.css';

import bellIcon from '../assets/icon-bell.png';
import gearIcon from '../assets/icon-gear.png';
import userIcon from '../assets/icon-user.png';
import chevronIcon from '../assets/icon-chevron.png';

import { useNavigate } from 'react-router-dom';

// 本次登入「不再顯示」的 sessionStorage key
const HIDE_GUIDE_KEY = 'hide_vocab_guide_this_session';

const cards = [
  { title: '台語\n單字卡', path: '/ThemeSelection' },
  { title: '情境\n對話', path: '/Home' },
  { title: '互動\n遊戲', path: '/GameSelection2' },
  { title: '台語\n故事集', path: '/StoryModePage' },
];

export default function LearningMode() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  // Modal 控制
  const [showVocabGuide, setShowVocabGuide] = useState(false);

  /** 監聽捲動，判斷哪一張卡片在中間被聚焦 */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cardsDom = Array.from(container.querySelectorAll('.learn-card'));
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
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  /** 點擊卡片 */
  const handleCardClick = useCallback(
    (idx: number, path?: string) => {
      if (idx === 0) {
        // 第一張卡 → 先判斷是否本次登入要隱藏
        const hiddenThisSession = sessionStorage.getItem(HIDE_GUIDE_KEY) === '1';
        if (hiddenThisSession) {
          navigate('/ThemeSelection'); // 直接進入主題頁
        } else {
          setShowVocabGuide(true); // 顯示使用說明
        }
        return;
      }
      path && navigate(path);
    },
    [navigate]
  );

  /** Modal：開始使用 → 導頁 */
  const startVocab = useCallback(() => {
    setShowVocabGuide(false);
    navigate('/ThemeSelection');
  }, [navigate]);

  /** Modal：Esc 關閉 */
  useEffect(() => {
    if (!showVocabGuide) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowVocabGuide(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showVocabGuide]);

  return (
    <div className="selection-bg">
      <header className="selection-header">
        <h1 className="header-title">台語鬥鬧熱</h1>
        <button className="nav-button" onClick={() => navigate('/NotificationPage')}>
          <img src={bellIcon} alt="通知" className="nav-icon" />
          <span className="nav-label">通知</span>
        </button>
        <button className="nav-button" onClick={() => navigate('/SettingsPage')}>
          <img src={gearIcon} alt="設定" className="nav-icon" />
          <span className="nav-label">設定</span>
        </button>
        <button
          className="nav-button"
          onClick={() => {
            // 登出時清掉 flag，下次再登入會重新顯示
            sessionStorage.removeItem(HIDE_GUIDE_KEY);
            navigate('/');
          }}
        >
          <img src={userIcon} alt="登出" className="nav-icon" />
          <span className="nav-label">登出</span>
          <img src={chevronIcon} alt="Chevron" className="chevron-icon" />
        </button>
      </header>

      {/* 中間主要卡片區域 */}
      <main className="learn-selection-main">
        <div className="learn-cards-container" ref={containerRef}>
          <div className="learn-modes-container">
            {cards.map((card, idx) => (
              <div key={idx} className="learn-card-wrapper">
                <button
                  className={`learn-card${focusedIndex === idx ? ' focused' : ''}`}
                  onClick={() => handleCardClick(idx, card.path)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(idx, card.path);
                    }
                  }}
                  style={{ cursor: card.path ? 'pointer' : 'default' }}
                  aria-haspopup={idx === 0 ? 'dialog' : undefined}
                >
                  <div className="learn-active-card-title">
                    {card.title.split('\n').map((line, i) => (
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

      {/* 使用說明 Modal */}
      {showVocabGuide && (
        <VocabGuideModal
          onClose={() => setShowVocabGuide(false)}
          onStart={startVocab}
        />
      )}
    </div>
  );
}

/** 使用說明 Modal（右下角固定：不再顯示 + 開始使用 + 取消） */
function VocabGuideModal({
  onClose,
  onStart,
}: {
  onClose: () => void;
  onStart: () => void;
}) {
  const firstBtnRef = useRef<HTMLButtonElement>(null);
  const [dontShowThisSession, setDontShowThisSession] = useState(false);

  useEffect(() => {
    firstBtnRef.current?.focus();
  }, []);

  const handleStart = () => {
    if (dontShowThisSession) {
      sessionStorage.setItem(HIDE_GUIDE_KEY, '1'); // 僅本次登入有效
    }
    onStart();
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-panel">
        <h2 className="modal-title">台語單字卡｜使用說明</h2>

        {/* 說明內容（可滾動） */}
        <div className="modal-content">
          <section className="guide-section">
            <h3 className="guide-heading">一、圖片總覽</h3>
            <p className="guide-text">
              選擇主題後，畫面將顯示與該主題相關的圖片。
              使用者可點擊感興趣的圖片，進入該圖片的單字學習頁面。
            </p>
            <div className="guide-img">
              <img src="/mock/guide/overview.jpg" alt="圖片總覽示意" />
            </div>
          </section>

          <section className="guide-section">
            <h3 className="guide-heading">二、圖片點擊快速學習</h3>
            <p className="guide-text">直接點擊圖片本身，即可播放該圖片對應單字的發音。</p>
            <div className="guide-img">
              <img src="/mock/guide/play-from-image.jpg" alt="點圖片播放發音示意" />
            </div>
          </section>

          <section className="guide-section">
            <h3 className="guide-heading">三、單字卡學習</h3>
            <p className="guide-text">
              在圖片右上角點擊「單字卡」，即可進入翻轉單字卡進行更深度學習。
              單字卡分為正、反兩面（點擊即可翻轉），內容由三部分組成：
            </p>
            <ol className="guide-list">
              <li>第一行：漢字</li>
              <li>第二行：台羅拼音</li>
              <li>第三行：中文</li>
            </ol>

            {/* 正反面上下排列 */}
            <div className="guide-split">
              <div className="guide-pane">
                <div className="guide-pane-title">正面</div>
                <div className="guide-img">
                  <img src="/mock/guide/front.jpg" alt="單字卡正面示意" />
                </div>
              </div>
              <div className="guide-pane">
                <div className="guide-pane-title">反面</div>
                <div className="guide-img">
                  <img src="/mock/guide/back.jpg" alt="單字卡反面示意" />
                </div>
              </div>
            </div>
          </section>

          <section className="guide-section">
            <h3 className="guide-heading">四、播放發音</h3>
            <p className="guide-text">單字卡正、反兩面皆有播放鍵，可點擊播放正確發音。</p>
            <div className="guide-img">
              <img src="/mock/guide/play-button.jpg" alt="播放鍵示意" />
            </div>
          </section>

          <section className="guide-section">
            <h3 className="guide-heading">五、收藏功能</h3>
            <p className="guide-text">
              點擊收藏鍵可將單字卡加入收藏集，之後可在「收藏集」中快速複習已收藏的單字。
            </p>
            <div className="guide-img">
              <img src="/mock/guide/favorite.jpg" alt="收藏鍵示意" />
            </div>
          </section>
        </div>

        {/* 右下角固定：勾選 + 兩個按鈕 */}
        <div className="modal-actions">
          <label className="modal-option">
            <input
              type="checkbox"
              checked={dontShowThisSession}
              onChange={(e) => setDontShowThisSession(e.target.checked)}
            />
            本次登入不再顯示
          </label>

          <button ref={firstBtnRef} className="btn-primary" onClick={handleStart}>
            開始使用
          </button>
          <button className="btn-secondary" onClick={onClose}>
            取消
          </button>
        </div>
      </div>
    </div>
  );
}