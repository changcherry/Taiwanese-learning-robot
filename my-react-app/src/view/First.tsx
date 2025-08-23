//登入成功歡迎頁面
import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/First.css"; // 確保這個 CSS 文件正確引入
import "../Main.css";
import "../Login.css"


//import happyBearImage from "../assets/小熊png.png";
// 假設這是只有 "Welcome" 文字的圖檔（確保它是透明背景）
// 您需要從 '截圖 2025-08-17 下午5.35.13.jpg' 中單獨裁切出 "Welcome" 文字
import welcomeText from "../assets/歡迎.png"; // <-- 這裡需要您準備一個單獨的 "Welcome" 文字圖檔

const First: React.FC = () => {
  const navigate = useNavigate();

  const handleEnterHome = () => {
    navigate("/Welcome"); // 導航到您的主頁面
  };

  return (
    // 外層 div 作為整個頁面的容器，並設定背景色或純背景圖
    <div id="login-success-page" onClick={handleEnterHome}>
      
      <img
        src={welcomeText}
        alt="Welcome"
        className="welcome-text-image" // 給 Welcome 文字一個獨立的類名
      />
    </div>
  );
};

export default First;