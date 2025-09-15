import React from "react";
import { useNavigate } from "react-router-dom";
import { getItem } from "../utils/localStorage";
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export default function Instructions() {
  const nav = useNavigate();
  const userId = getItem("exam_userId") || "";

  function start() {
    // we will start session in Questionnaire page
    nav("/exam");
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header></Header>
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-2">Instructions</h2>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            <li>
              Login with your UserID: <strong>{userId}</strong>
            </li>
            <li>
              Each question has a 20 second timer. Provide voice answer: "YES" or
              "NO".
            </li>
            <li>
              If no answer within 20s, the default answer <strong>NO</strong> will
              be recorded.
            </li>
            <li>
              After speaking, click <strong>Save & Next</strong> to persist your
              answer.
            </li>
            <li>On the last question you will be asked to confirm submission.</li>
          </ol>
          <div className="mt-6 flex gap-3">
            <button
              onClick={start}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Start Exam
            </button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
