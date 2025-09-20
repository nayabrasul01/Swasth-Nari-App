import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItem, removeItem, setItem } from "../utils/localStorage";
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { validateToken, logout } from "../api/examService.js";

export default function Login() {
  const nav = useNavigate();
  const [ipNumber, setIpNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const docId = getItem("doc_userId");

  function handleSubmit(e) {
    e.preventDefault();
    if (!ipNumber) return;
    setItem("exam_userId", ipNumber);
    nav("/instructions");
  }

  React.useEffect(() => {
    async function onLoad(){
      const isValid = await validateCurrentSession();
      if(!docId || ! !isValid) {
        setLoading(true);
        setTimeout(() => {
          alert("Session expired. Please re-login.");
          nav("/");
        }, 500);
      }
    }
    onLoad();
  }, [docId]);

  async function validateCurrentSession() {
    const response = await validateToken();
    response?.status === "success";
  }

  async function handleLogout(){
    setLoading(true);
    if(confirm("Are you sure you want to logout?")){
      const response = await logout();
      removeItem("jwt");
      removeItem("doc_userId");
      nav("/")
    }
    setLoading(false);
    return;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
       <Header></Header>

       {/* 🔹 Logout button section */}
        <div className="flex justify-end px-6 mt-2">
          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded shadow"
          >
            Logout
          </button>
        </div>
       <div className="flex-grow flex items-center justify-center">
        {loading ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-4"></div>
            {/* <span className="text-lg font-semibold">Submitting...</span> */}
          </div>
        ) : (
          <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow">
          <div className="flex justify-center mb-4">
            <h2 className="text-xl font-bold">
              IP Checklist
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              {/* <div className="text-sm mb-1">Enter UserId</div> */}
              <input
                value={ipNumber}
                onChange={(e) => setIpNumber(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter IP Number"
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
        )}
        
      </div>
      <Footer></Footer>
    </div>
  );
}
