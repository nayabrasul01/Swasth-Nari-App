import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setItem } from "../utils/localStorage";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function MainLogin() {
  const [userId, setUserId] = useState("");
  const [pass, setPass] = useState("");
  const nav = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!userId || !pass) return;
    setItem("doc_userId", userId);
    // setItem("doc_pass", pass);
    nav("/login");
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header></Header>
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">
            Swasth Nari, Sashakt Parivar Abhiyaan
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              {/* <div className="text-sm mb-1">Enter UserId</div> */}
              <input
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4"
                placeholder="Enter User ID"
                required
              />
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter Password"
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
