import React from "react";

export default function Sidebar({
  questions = [],
  currentIndex = 0,
  selectedMap = {},
  pendingMap = {},
  onJump,
}) {
  const getClass = (idx) => {
    const q = questions[idx];
    const cur = idx === currentIndex;
    const answered =
      selectedMap[q.questionId] &&
      (selectedMap[q.questionId].saved || !pendingMap[q.questionId]);
    const pending = !!pendingMap[q.questionId];
    if (cur) return "bg-yellow-300 border-2 border-yellow-500";
    if (answered && !pending) return "bg-green-300";
    if (pending) return "bg-green-50 border-2 border-dashed";
    return "bg-gray-200";
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="font-semibold mb-2">Questions ({questions.length})</div>
      <div className="grid grid-cols-5 gap-2">
        {questions.map((q, idx) => (
          <div
            key={q.questionId}
            onClick={() => onJump(idx)}
            className={`h-10 w-10 flex items-center justify-center rounded cursor-pointer ${getClass(
              idx
            )}`}
            title={`Question ${q.position}`}
          >
            <div className="text-sm">{q.position}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <div>
          <span className="inline-block w-3 h-3 bg-green-300 mr-2 align-middle" />
          Answered
        </div>
        <div>
          <span className="inline-block w-3 h-3 bg-yellow-300 mr-2 align-middle" />
          Current
        </div>
        <div>
          <span className="inline-block w-3 h-3 bg-gray-200 mr-2 align-middle" />
          Not answered
        </div>
      </div>
    </div>
  );
}
