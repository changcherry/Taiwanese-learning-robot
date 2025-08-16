import React from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterSuccess.css";
import backgroundImage from "../assets/background.png";
import bearImage from "../assets/bear.png";

const RegisterSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      id="register-success-page"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="register-success-container">
        <div className="welcome-panel">
          <h1 className="welcome-title">註冊成功！</h1>
          <img src={bearImage} alt="小熊" className="mascot-image" />
        </div>

        <div className="form-panel">
          <div className="message-card">
            <p className="message-text">請登入以繼續使用</p>
            <button className="submit-button" onClick={() => navigate("/login")}>
              返回登入
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterSuccess;
