import React from "react";
import { useNavigate } from "react-router-dom";
import { getItem } from "../utils/localStorage.js";
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export default function Submitted() {
  const nav = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center">
          <svg
            className="w-20 h-20 text-green-500 mb-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#e6fffa" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4"
            />
          </svg>
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Assessment completed.
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Thank you for completing your assessment. Visit nearest Dispensary/Hospital.
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 text-left space-y-1">
            <li>You may now safely close this window.</li>
            <li>If you need to access the portal again, please contact the administrator.</li>
          </ul>
          <button
            onClick={() => nav("/")}
            className="mt-2 px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
