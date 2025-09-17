import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItem, setItem } from "../utils/localStorage";
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export default function Login() {
  const nav = useNavigate();
  const [userId, setUserId] = useState("");
  const docId = getItem("doc_userId");

  function handleSubmit(e) {
    e.preventDefault();
    if (!userId) return;
    setItem("exam_userId", userId);
    nav("/instructions");
  }

  React.useEffect(() => {
    if(!docId) {
      nav("/"); // if no docId, redirect to main login
      return;
    }
  }, [docId]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
       <Header></Header>
       <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow">
          <div className="flex justify-center mb-4">
            <h2 className="text-2xl font-bold mb-4">IP Checklist</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              {/* <div className="text-sm mb-1">Enter UserId</div> */}
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
