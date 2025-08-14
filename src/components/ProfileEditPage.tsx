import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ProfileEditPage.css"; // 請確認路徑正確

const defaultAvatar = "/images/images_ProfileEdit/I1077_25490_74_9255.png";

const ProfileEditPage: React.FC = () => {
  const navigate = useNavigate();

  // 預設資料用來取消還原
  const [initialData, setInitialData] = useState({
    fullName: "",
    username: "",
    avatar: defaultAvatar,
  });

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(defaultAvatar);

  useEffect(() => {
    axios.get("https://your-api.com/api/user/me")
      .then(res => {
        const data = {
          fullName: res.data.fullName,
          username: res.data.username,
          avatar: res.data.avatar || defaultAvatar,
        };
        setFullName(data.fullName);
        setUsername(data.username);
        setAvatarPreview(data.avatar);
        setInitialData(data);
      })
      .catch(() => {
        toast.error("無法取得使用者資料", { position: "top-center" });
      });
  }, []);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://your-api.com/api/user/update", {
        fullName,
        username,
        avatar: avatarPreview,
      });

      if (response.status === 200) {
        toast.success("資料更新成功！", { position: "top-center", autoClose: 2000 });
      } else {
        toast.error("更新失敗，請稍後再試", { position: "top-center" });
      }
    } catch (err) {
      console.error(err);
      toast.error("無法連線到伺服器", { position: "top-center" });
    }
  };

  const handleReset = () => {
    setFullName(initialData.fullName);
    setUsername(initialData.username);
    setAvatarPreview(initialData.avatar);
  };

  return (
    <section id="profile-change" className="page-bg">
      {/* 頁面頂部橫幅 */}
      <header className="game-header">
        <button
          className="back-button"
          type="button"
          onClick={() => navigate("/")}
        >
          <img
            src="/images/images_ProfileEdit/1077_25486.png"
            alt="Back Icon"
          />
        </button>
        <h1 className="header-title">個人資料變更</h1>
      </header>

      {/* 表單內容 */}
      <main className="profile-content">
        <form className="profile-form" onSubmit={handleSubmit}>

          {/* 頭像區 */}
          <div className="avatar-section">
            <div className="avatar-wrapper">
              <img
                src="/images/images_ProfileEdit/I1077_25490_74_9107.png"
                className="avatar-bg"
                alt="Avatar background"
              />
              <img
                src={avatarPreview}
                className="avatar-icon"
                alt="User avatar"
              />
            </div>
            <label htmlFor="avatar-input" className="avatar-change-label">
              更換頭貼
            </label>
            <input
              id="avatar-input"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
          </div>

          {/* 輸入欄位 */}
          <div className="form-fields">
            <div className="form-group">
              <label htmlFor="full-name" className="form-label">編輯姓名</label>
              <input
                type="text"
                id="full-name"
                className="form-input"
                placeholder="請編輯姓名"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username" className="form-label">編輯使用者名稱</label>
              <input
                type="text"
                id="username"
                className="form-input"
                placeholder="請編輯使用者名稱"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* 按鈕 */}
          <div className="form-actions">
            <button type="submit" className="btn btn-confirm">確定</button>
            <button type="button" className="btn btn-cancel" onClick={handleReset}>取消</button>
          </div>
        </form>
      </main>

      {/* Toast提示 */}
      <ToastContainer />
    </section>
  );
};

export default ProfileEditPage;
