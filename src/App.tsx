import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SettingsPage from "./components/SettingsPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
};

export default App;