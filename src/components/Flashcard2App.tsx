import React from 'react';
import './FlashcardApp.css'; // 如果你有專屬的樣式檔，也可以改為 Flashcard2App.css

const Flashcard2App: React.FC = () => {
  return (
    <section id="flashcard-app" className="flashcard-app-container">
      <img
        src="/page/d50eef80-afcf-4ac0-b08c-52fb4a3bf824/images/f11d553937110455b763db26fc3e78d3301ce0f1.png"
        className="background-image"
        alt="Doodle background"
      />

      <header className="app-header">
        <button className="back-btn">
          <img
            src="/page/d50eef80-afcf-4ac0-b08c-52fb4a3bf824/images/1336_700.svg"
            alt="Back"
          />
        </button>
        <div className="app-title">
          <img
            src="/page/d50eef80-afcf-4ac0-b08c-52fb4a3bf824/images/I1059_9456_44_6424.svg"
            alt="Favorite collection icon"
          />
          <h1>單字卡收藏集</h1>
        </div>
      </header>

      <main className="card-viewer">
        <div className="card-container">
          <div className="flashcard">
            <div className="card-face card-front">
              {/* merged image */}
              <div className="card-actions">
                <button className="action-btn">
                  <img
                    src="/page/d50eef80-afcf-4ac0-b08c-52fb4a3bf824/images/I1336_705_1094_9665_44_6390.svg"
                    alt="Play audio"
                  />
                </button>
                <button className="action-btn">
                  <img
                    src="/page/d50eef80-afcf-4ac0-b08c-52fb4a3bf824/images/I1336_705_1094_9664_1088_9588_44_6078.svg"
                    alt="Add to favorites"
                  />
                </button>
              </div>
              <span className="card-text-primary">早 安</span>
            </div>
          </div>
          <img
            src="/page/d50eef80-afcf-4ac0-b08c-52fb4a3bf824/images/9b165a8add12f4770fd2609995f88c911db14805.png"
            className="bear-mascot"
            alt="Bear mascot"
          />
        </div>

        <nav className="card-navigation">
          <button className="nav-btn">
            <img
              src="/page/d50eef80-afcf-4ac0-b08c-52fb4a3bf824/images/I1336_702_44_7215.svg"
              alt="Previous card"
              className="arrow-left"
            />
          </button>
          <span className="card-counter">1/20</span>
          <button className="nav-btn">
            <img
              src="/page/d50eef80-afcf-4ac0-b08c-52fb4a3bf824/images/I1336_701_44_7215.svg"
              alt="Next card"
            />
          </button>
        </nav>
      </main>
    </section>
  );
};

export default Flashcard2App;