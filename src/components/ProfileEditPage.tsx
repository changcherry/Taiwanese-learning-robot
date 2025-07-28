import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ProfileEditPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 預設頭像圖片（可改成正確的圖片路徑）
const defaultAvatar = "/images/images_ProfileEdit/I1077_25490_74_9255.png";

const ProfileEditPage: React.FC = () => {

  const navigate = useNavigate();

  // 表單狀態
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(defaultAvatar);

  // 從後端讀取現有個人資料
  useEffect(() => {
    axios.get("https://your-api.com/api/user/me") // 替換成正確的 API 路徑
      .then(res => {
        setFullName(res.data.fullName);
        setUsername(res.data.username);
        setAvatarPreview(res.data.avatar || defaultAvatar);
      })
      .catch(() => {
        toast.error("無法取得使用者資料", { position: "top-center" });
      });
  }, []);

  // 頭像上傳預覽（轉 base64）
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

  // 表單送出 API 更新
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://your-api.com/api/user/update", { // 替換成正確的 API 路徑
        fullName,
        username,
        avatar: avatarPreview
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

  // 取消：清除欄位
  const handleReset = () => {
    setFullName("");
    setUsername("");
    setAvatarPreview(defaultAvatar);
  };

  return (
    <section id="profile-change">
      <div className="profile-container">
        {/* 背景圖 */}
        <img
          src="/images/images_ProfileEdit/f11d553937110455b763db26fc3e78d3301ce0f1.png"
          alt="Background"
          className="background-image"
        />

        {/* 標題列 */}
        <header className="profile-header">
          <button
            className="back-button"
            type="button"
            onClick={() => navigate("/")}
            style={{ background: "none", border: "none", padding: 0, outline: "none" }}
          >
            <img
              src="/images/images_ProfileEdit/1077_25486.png"
              alt="Back Icon"
              style={{ width: "90px", height: "90px" }}
            />
          </button>
          <h1 className="header-title">個人資料變更</h1>
        </header>


        {/* 表單內容 */}
        <main className="profile-content">
          <form className="profile-form" onSubmit={handleSubmit}>
            {/* 頭像區塊 */}
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
              <label className="avatar-change-label">
                更換頭貼
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                />
              </label>
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

            {/* 送出與取消 */}
            <div className="form-actions">
              <button type="submit" className="btn btn-confirm">確定</button>
              <button type="button" className="btn btn-cancel" onClick={handleReset}>
                取消
              </button>
            </div>
          </form>
        </main>
      </div>

      {/* 提示訊息容器 */}
      <ToastContainer />
    </section>
  );
};

export default ProfileEditPage;
