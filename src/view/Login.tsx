import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login.css";
import "../Main.css" 
import "../App.css";
import bearImage from "../assets/bear.png";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 測試用：帳號 test，密碼 1234 才成功
    if (username === "test" && password === "1234") {
      navigate("/LoginSuccess");
    } else {
      navigate("/LoginFailure");
    }
  };

  return (
    // 使用 .login-page 類別作為最外層容器
    <div className="login-page"> {/* 將 selection-bg 替換為 login-page */}
      
      <div className="login-container">
        {/* 左邊小熊與標題 */}
        <div className="welcome-panel">
          <h1 className="welcome-title">歡迎</h1>
          <img src={bearImage} alt="小熊" className="mascot-image" />
        </div>

        {/* 右邊表單卡片 */}
        <div className="form-panel">
          <div className="login-tabs">
            <a href="#" className="tab-link active">登入</a>
            <a href="/Register" className="tab-link">註冊</a>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="請輸入使用者名稱" /* 更新 placeholder */
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="請輸入密碼" /* 更新 placeholder */
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="submit-button">登入</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;