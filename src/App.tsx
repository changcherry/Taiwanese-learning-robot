import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"; // 全站共用

import SettingsPage from "./components/SettingsPage";
import ProfileEditPage from "./components/ProfileEditPage";
import InstructionsPage from "./components/InstructionsPage";
import ResponsePage from "./components/ResponsePage";
import NotificationPage from "./components/NotificationPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SettingsPage />} />
        <Route path="/profile-edit" element={<ProfileEditPage />} />
        <Route path="/instructions" element={<InstructionsPage />} />
        <Route path="/response" element={<ResponsePage />} />
        <Route path="/notifications" element={<NotificationPage />} />
      </Routes>
    </Router>
  );
};

export default App;