import React, { useEffect, useState } from "react";
import { getQuestions, saveAnswer } from "../api/examService";
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export default function Questionnaire({ onComplete }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(20);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // ✅ define fetchQuestions BEFORE useEffect
  const fetchQuestions = async () => {
    try {
      const data = await getQuestions(1);
      console.log("Fetched questions:", data);

      if (Array.isArray(data)) {
        setQuestions(data);
      } else if (data && Array.isArray(data.questions)) {
        setQuestions(data.questions);
      } else {
        setQuestions([]);
      }
    } catch (err) {
      console.error("Failed to fetch questions:", err);
      setQuestions([]);
    }
  };

  useEffect(() => {
    console.log("inside useEffect - fetching questions");
    fetchQuestions();
  }, []);

  const currentQuestion = questions[currentIndex];

  // reset timer whenever a new question loads
  useEffect(() => {
    setTimeLeft(20);
  }, [currentIndex]);

  // countdown logic
  useEffect(() => {
    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleAnswer = (ans) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: ans }));
  };

  const handleAutoSubmit = () => {
    const ans = answers[currentIndex] || "NO"; // default NO
    setAnswers((prev) => ({ ...prev, [currentIndex]: ans }));
    moveNext();
  };

  const moveNext = async () => {
    try {
      await saveAnswer(1, questions[currentIndex].questionId, answers[currentIndex] || "NO",);
    } catch (err) {
      console.error("Failed to save answer:", err);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((idx) => idx + 1);
    } else {
      setShowSubmitModal(true);
    }

    console.log(answers);
  };

  const confirmSubmit = () => {
    setShowSubmitModal(false);
    // onComplete(answers);
    // Show loader for 2 seconds, then navigate to /submitted
    setShowSubmitModal(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/submitted";
      setTimeout(() => {
      window.close();
      }, 1000);
    }, 2000);
  };

  const getBoxColor = (idx) => {
    if (idx === currentIndex) return "bg-yellow-400";
    if (answers[idx]) return "bg-green-500";
    return "bg-gray-300";
  };

  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main Content */}
      <Header></Header>
      <div className="flex-grow flex items-center justify-center">
        {loading ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-4"></div>
            <span className="text-lg font-semibold">Submitting...</span>
          </div>
        ) : (
          <>
            <main className="flex-1 mx-4 p-6 bg-white rounded shadow-md max-w-3xl flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  Question {currentIndex + 1}/{questions.length}
                </h2>
                <p className="text-lg font-bold text-red-600">⏱️ {timeLeft}s</p>
              </div>
              {currentQuestion ? (
                <>
                  <p className="mb-6 text-lg">{currentQuestion.questionText}</p>

                  <div className="flex items-center gap-4 mb-6">
                    <button
                      className={`px-4 py-2 rounded ${
                        answers[currentIndex] === "YES"
                          ? "bg-green-500 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => handleAnswer("YES")}
                    >
                      YES
                    </button>
                    <button
                      className={`px-4 py-2 rounded ${
                        answers[currentIndex] === "NO"
                          ? "bg-red-500 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => handleAnswer("NO")}
                    >
                      NO
                    </button>
                  </div>

                  <button
                  type="button"
                    className={`px-4 py-2 rounded ${
                      answers[currentIndex]
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    onClick={moveNext}
                    disabled={!answers[currentIndex]}
                  >
                    Save & Next
                  </button>
                </>
              ) : (
                <p>Loading question...</p>
              )}
            </main>

            {/* Side Panel */}
            <aside className="w-48 p-4 border-r bg-white">
              <h3 className="font-bold mb-4">Questions</h3>
              <div className="grid grid-cols-4 gap-2">
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-8 h-8 flex items-center justify-center rounded text-sm font-bold text-white cursor-pointer ${getBoxColor(
                      idx
                    )}`}
                    onClick={() => setCurrentIndex(idx)}
                  >
                    {idx + 1}
                  </div>
                ))}
              </div>
            </aside>

            {/* Submit Modal */}
            {showSubmitModal && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                  <h3 className="text-lg font-bold mb-4">Submit Test</h3>
                  <p className="mb-6">
                    All questions have been answered. Do you want to submit the test?
                  </p>
                  <div className="flex justify-end gap-4">
                    <button
                      className="px-4 py-2 bg-gray-300 rounded"
                      onClick={() => setShowSubmitModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded"
                      onClick={confirmSubmit}
                    >
                      Yes, Submit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}
