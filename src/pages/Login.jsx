import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setItem } from "../utils/localStorage";
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export default function Login() {
  const [userId, setUserId] = useState("");
  const nav = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!userId) return;
    setItem("exam_userId", userId);
    nav("/instructions");
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
       <Header></Header>
       <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-4">IP Checklist Portal</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <div className="text-sm mb-1">Enter UserId</div>
              <input
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter User ID"
                required
              />
            </label>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
