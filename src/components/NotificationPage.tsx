import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../styles/NotificationPage.css";

interface NotificationItem {
  id: number;
  text?: string;
  time: string;
  iconSrc: string;
  unreadDotSrc?: string;
}

const data: NotificationItem[] = [
  {
    id: 1,
    text: "快來跟小熊聊天吧！",
    time: "12:15",
    iconSrc: "/images/images_Notification/I1077_25593_44_9608.png",
    unreadDotSrc: "/images/images_Notification/1077_25597.png",
  },
  {
    id: 2,
    text: "今天練習的新單字：「哩賀」",
    time: "10:30",
    iconSrc: "/images/images_Notification/I1077_25594_44_9608.png",
  },
  { id: 3, time: "16:15", iconSrc: "/images/images_Notification/I1077_25595_44_9608.png" },
  { id: 4, time: "12:00", iconSrc: "/images/images_Notification/I1077_25596_44_9608.png" },
  { id: 5, time: "12:00", iconSrc: "/images/images_Notification/I1271_8628_44_9608.png" },
  { id: 6, time: "12:00", iconSrc: "/images/images_Notification/I1271_8637_44_9608.png" },
  { id: 7, time: "16:15", iconSrc: "/images/images_Notification/I1271_8684_44_9608.png" },
  { id: 8, time: "16:15", iconSrc: "/images/images_Notification/I1271_8693_44_9608.png" },
];

const NotificationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);
  const handleClear = () => {
    alert("清除通知（示意）");
  };

  return (
    <div className="page-bg notification-page">
      <header className="game-header">
        <button className="back-button" onClick={handleBack} aria-label="返回上一頁">
          <img src="/images/images_Notification/1077_25603.png" alt="Back Icon" />
        </button>
        <h1 className="header-title">通知</h1>
        <button className="clear-button" onClick={handleClear}>清除</button>
      </header>

      <main className="notifications-list-container">
        <div className="notifications-list">
          {data.map((item) => (
            <article key={item.id} className="notification-item">
              <div className="icon-wrapper">
                <img src={item.iconSrc} alt="Notification Bell" className="bell-icon" />
                {item.unreadDotSrc && (
                  <img src={item.unreadDotSrc} alt="Unread Indicator" className="unread-dot" />
                )}
              </div>
              {item.text && <p className="notification-text">{item.text}</p>}
              <time className="notification-time">{item.time}</time>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NotificationPage;
