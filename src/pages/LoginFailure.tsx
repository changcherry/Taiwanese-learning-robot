import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginFailure.css";
import backgroundImage from "../assets/background.png";
import cryBearImage from "../assets/crybear.png";

const LoginFailure: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 測試邏輯：帳號 test / 密碼 1234 登入成功
    if (username === "test" && password === "1234") {
      navigate("/login-success");
    } else {
      navigate("/login-failure");
    }
  };

  return (
    <section
      id="login-failure-page"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="login-container">
        {/* 左邊哭哭熊（圖片已內含登入失敗文字） */}
        <div className="welcome-panel">
          <img src={cryBearImage} alt="哭哭熊" className="mascot-image" />
        </div>

        {/* 右邊重新登入表單 */}
        <div className="form-panel">
          <div className="login-tabs">
            <a href="#" className="tab-link active">登入</a>
            <a href="/register" className="tab-link">註冊</a>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="請輸入使用者名稱"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="請輸入密碼"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="submit-button">重新登入</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginFailure;
