import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SettingsPage from "./components/SettingsPage";
import ProfileEditPage from "./components/ProfileEditPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SettingsPage />} />
        <Route path="/profile-edit" element={<ProfileEditPage />} />
      </Routes>
    </Router>
  );
};

export default App;