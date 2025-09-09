import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/OverView.css';
import backIcon from '../assets/Back.svg';

type ImageCard = {
  id: number | string;
  imageUrl: string;
  title?: string;
};

// 可選：環境變數有設定才打 API，否則用本地 mock 圖片
const API_BASE =
  (import.meta as any)?.env?.VITE_API_BASE ||
  (process as any)?.env?.REACT_APP_API_BASE ||
  '';

export default function OverView() {
  const navigate = useNavigate();
  const { themeId = 'transportation' } = useParams();

  const [data, setData] = useState<ImageCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const url = useMemo(
    () => (API_BASE ? `${API_BASE}/api/themes/${encodeURIComponent(themeId)}/cards/images` : ''),
    [themeId]
  );

  // 本地測試用（請把圖片放到 public/mock/<themeId>/）
  const localMock: ImageCard[] = Array.from({ length: 9 }).map((_, i) => ({
    id: i,
    imageUrl: `/mock/${themeId}/${i}.jpg`,
    title: `示例 ${i}`,
  }));

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setErr(null);

    if (!url) {
      setData(localMock);
      setLoading(false);
      return;
    }

    fetch(url, { signal: ac.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const json = await res.json();
        setData(json.items ?? []);
      })
      .catch((e: any) => {
        if (e.name !== 'AbortError') {
          setErr(`改用本地資料（${e.message || '載入失敗'}）`);
          setData(localMock);
        }
      })
      .finally(() => setLoading(false));

    return () => ac.abort();
  }, [url]);

  return (
    <div className="selection-bg">
      <header className="selection-header">
        <button
          type="button"
          className="back-button"
          aria-label="返回"
          onClick={() => navigate('/ThemeSelection')}
        >
          <img src={backIcon} alt="返回" />
        </button>
        {/* 標題沿用你的 .header-title 樣式 */}
        <h1 className="header-title">台語單字卡</h1>
      </header>

      {/* 內容區：三張一行的圖片總覽 */}
      <main className="overview-shell">
        {loading && <div className="ov-status">載入中...</div>}
        {err && <div className="ov-status ov-error">{err}</div>}
        {!loading && !err && data.length === 0 && (
          <div className="ov-status">目前沒有圖片</div>
        )}

        <div className="overview-grid">
          {data.map((card) => (
            <button
              key={card.id}
              className="overview-item"
              onClick={() =>
                navigate(`/flashcards/${themeId}?card=${encodeURIComponent(String(card.id))}`)
              }
              aria-label={`前往卡片 ${card.title ?? card.id}`}
              title={card.title}
            >
              <div className="thumb-wrap">
                <img src={card.imageUrl} alt={card.title ?? `Card ${card.id}`} loading="lazy" />
              </div>
              <div className="thumb-caption">{card.title ?? `#${card.id}`}</div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}