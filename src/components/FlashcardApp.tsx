import React, { useState } from 'react';
import './FlashcardApp.css';
import backIcon from '../assets/back.svg';
import bgImage from '../assets/bg.png';
import volumeIcon from '../assets/volume up.svg';
import bearImage from '../assets/bear.png';
import leftArrow from '../assets/left.svg';
import rightArrow from '../assets/right.svg';
import starIcon from '../assets/star.svg';

const FlashcardApp: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [flipped, setFlipped] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

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
          <div className="flashcard-wrapper">
            <div
              className={`flashcard ${flipped ? 'flipped' : ''}`}
              onClick={() => setFlipped(!flipped)}
            >
              <div className="flashcard-inner">
                <div className="flashcard-front">
                  <div className="card-icons">
                    <button className="icon-button" aria-label="Play sound">
                      <img src={volumeIcon} alt="Volume Icon" />
                    </button>
                    <button
                      className="icon-button"
                      aria-label="Add to favorites"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFavorited(!isFavorited);
                      }}
                    >
                      <img
                        src={starIcon}
                        alt="Star Icon"
                        className={`star-icon ${isFavorited ? 'favorited' : ''}`}
                      />
                    </button>
                  </div>
                  <p className="flashcard-text">早 安</p>
                </div>

                <div className="flashcard-back">
                  <p className="flashcard-text">gâu-tsá</p>
                </div>
              </div>
            </div>

            <img className="bear-image" src={bearImage} alt="Cute bear character" />
          </div>

          <nav className="card-navigation">
            <button className="nav-arrow" aria-label="Previous card">
              <img src={leftArrow} alt="Previous" />
            </button>
            <span className="page-counter">1/1500</span>
            <button className="nav-arrow" aria-label="Next card">
              <img src={rightArrow} alt="Next" />
            </button>
          </nav>
        </div>
      </main>
    </>
  );
};

export default FlashcardApp;