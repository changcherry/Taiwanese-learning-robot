import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SearchPage.css";
import "../App.css";

interface DictionaryResult {
  word: string;
  pronunciation: string;
  definition: string;
  audioSrc?: string;
}

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<DictionaryResult | null>(null);

  const handleSearch = () => {
    // 假設簡單模擬查詢結果
    if (query === "流籠") {
      setResult({
        word: "流籠",
        pronunciation: "liû-lông",
        definition:
          "索道及其吊掛的裝載平台，是早期人工渡河用的工具。電纜車。利用電纜輸送，以電力傳動的交通工具。多用在山勢陡峭且交通不便的山區。升降機。升降式的箱形電梯。",
        audioSrc: "/images/image_SearchPage1/Volume.mp3", // 假設音檔
      });
    } else {
      setResult(null);
    }
  };

  const playAudio = (src: string | undefined) => {
    if (!src) return;
    const audio = new Audio(src);
    audio.play();
  };

  return (
    <div className="page-bg">
      {/* ===== Header ===== */}
      <header className="game-header">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
          aria-label="返回上一頁"
        >
          <img src="/images/back.png" alt="返回" />
        </button>
        <h1 className="header-title">台語辭典</h1>
      </header>

      {/* ===== Main Content ===== */}
      <main className="dictionary-container">
        {/* ===== 搜尋區 ===== */}
        <section id="search" className="search-section">
          <form
            className="search-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <div className="search-bar-container">
              <img
                className="search-bar-bg"
                src="/images/image_SearchPage/InputBox.png"
                alt="Search bar background"
              />
              <img
                className="search-icon"
                src="/images/image_SearchPage/Search.png"
                alt="Search icon"
              />
              <input
                type="text"
                className="search-input"
                placeholder="請輸入要搜尋的辭典文字 ..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="search-button">
                查詢
              </button>
            </div>
          </form>
        </section>

        {/* ===== 查詢結果區 ===== */}
        <section className="results-section">
          {result ? (
            <div className="results-container">
              <div className="result-column">
                <h2 className="result-header">詞目</h2>
                <div className="underline" style={{ width: 166 }} />
                <p className="result-content">{result.word}</p>
              </div>
              <div className="result-column">
                <h2 className="result-header">音讀</h2>
                <div className="underline" style={{ width: 166 }} />
                <div className="result-content pronunciation">
                  <span>{result.pronunciation}</span>
                  {result.audioSrc && (
                    <button
                      className="volume-button"
                      aria-label="Play pronunciation"
                      onClick={() => playAudio(result.audioSrc)}
                    >
                      <img
                        src="/images/image_SearchPage/Volume.png"
                        alt="Volume Icon"
                      />
                    </button>
                  )}
                </div>
              </div>
              <div className="result-column result-column-definition">
                <h2 className="result-header">釋義</h2>
                <div className="underline" style={{ width: 692 }} />
                <p className="result-content">{result.definition}</p>
              </div>
            </div>
          ) : (
            <div className="results-body">
              <p className="no-results-message">目前查無資料</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default SearchPage;
