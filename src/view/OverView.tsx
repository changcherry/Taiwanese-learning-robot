import { useEffect, useState } from 'react';
import '../style/LearningMode.css';
import '../style/Home.css';
import '../style/OverView.css';
import '../App.css';
import backIcon from '../assets/Back.svg';

// 匯入六張圖片
import busImg from '../assets/公車.png';
import trainImg from '../assets/火車.png';
import truckImg from '../assets/卡車.png';
import carImg from '../assets/汽車.png';
import excavatorImg from '../assets/怪手.png';
import helicopterImg from '../assets/直升機.png';

// 卡片型別
interface Card {
  id: number;
  image: string;
}

export default function OverView() {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // 目前被點擊放大的圖片

  // 模擬後端載入資料
  useEffect(() => {
    const initialCards: Card[] = [
      { id: 1, image: busImg },
      { id: 2, image: trainImg },
      { id: 3, image: truckImg },
      { id: 4, image: carImg },
      { id: 5, image: excavatorImg },
      { id: 6, image: helicopterImg },
    ];
    setCards(initialCards);
  }, []);

  // 點擊卡片 → 打開 Modal
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  // 關閉 Modal
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="selection-bg">
      <header className="selection-header">
        {/* 返回鍵 */}
        <button
          type="button"
          className="back-button"
          aria-label="返回"
          onClick={() => window.history.back()}
        >
          <img src={backIcon} alt="返回" />
        </button>
        <h1 className="header-title">單字總覽區</h1>
      </header>

      {/* 主內容：圖片網格 */}
      <main className="learn-selection-main">
        <div className="overview-grid">
          {cards.map((card) => (
            <div
              key={card.id}
              className="overview-card"
              onClick={() => handleImageClick(card.image)} // 點擊圖片放大
            >
              <img
                src={card.image}
                alt={`圖片-${card.id}`}
                className="overview-image"
              />
            </div>
          ))}
        </div>
      </main>

      {/* Modal 顯示 */}
      {selectedImage && (
        <div className="image-modal">
          <div className="image-modal-content">
            {/* 左上角 X */}
            <button
              className="modal-close-btn"
              onClick={handleCloseModal}
            >
              ✕
            </button>

            {/* 右上角 單字卡 */}
            <button
              className="modal-flashcard-btn"
              onClick={() => alert('進入單字卡功能')}
            >
              單字卡
            </button>

            {/* 放大的圖片 */}
            <img src={selectedImage} alt="放大圖片" />
          </div>
        </div>
      )}
    </div>
  );
}