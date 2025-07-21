import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSuccess.css";
import backgroundImage from "../assets/background.png";
import happyBearImage from "../assets/bear.png"; // 登入成功小熊圖

const LoginSuccess: React.FC = () => {
  const navigate = useNavigate();

  const handleEnterHome = () => {
    navigate("/home");
  };

  return (
    <section
      id="login-success-page"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="success-container">
        <h1 className="success-message">登入成功<br />歡迎回來</h1>
        <img
          src={happyBearImage}
          alt="小熊"
          className="mascot-image"
          onClick={handleEnterHome}
        />
      </div>
    </section>
  );
};

export default LoginSuccess;
