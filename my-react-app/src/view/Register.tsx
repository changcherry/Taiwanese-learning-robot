//註冊
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Register.css";
import "../Main.css";
import "../Login.css";
//import backgroundImage from "../assets/background.png";
import bearImage from "../assets/bear.png";
const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 簡單驗證：帳號 "test" 或密碼不一致 → 失敗
    if (username === "test" || password !== confirmPassword) {
      navigate("/RegisterFailure");
    } else {
      navigate("/RegisterSuccess");
    }
  };

  return (
     <div className="login-page"> {/* 將 selection-bg 替換為 login-page */}
      
      <div className="login-container">
        <div className="welcome-panel">
          <h1 className="welcome-title">歡迎</h1>
          <img src={bearImage} alt="小熊" className="mascot-image" />
        </div>

        <div className="form-panel">
          <div className="login-tabs">
            <a href="/Login" className="tab-link">登入</a>
            <a href="#" className="tab-link active">註冊</a>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="請輸入姓名"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <input
              type="password"
              placeholder="請再次輸入密碼"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" className="submit-button">確定</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
