import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainLogin from "./pages/MainLogin";
import Instructions from "./pages/Instructions";
import Questionnaire from "./pages/Questionnaire";
import Submitted from "./pages/Submitted";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLogin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/instructions" element={<Instructions />} />
      <Route path="/exam" element={<Questionnaire />} />
      <Route path="/submitted" element={<Submitted />} />
    </Routes>
  );
}
export default App;