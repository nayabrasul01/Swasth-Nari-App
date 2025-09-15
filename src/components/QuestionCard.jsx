import React from "react";

export default function QuestionCard({
  question,
  selected,
  onSelect,
  onSave,
  listening,
  lastSpeech,
}) {
  return (
    <div className="border rounded p-6 min-h-[200px] flex flex-col justify-between bg-white">
      <div>
        <div className="text-gray-700 mb-4">
          {question ? question.text : "No question"}
        </div>

        <div className="flex gap-4 items-center">
          <div
            className={`px-4 py-2 rounded cursor-pointer border ${
              selected && selected.answer === "YES"
                ? "bg-green-200"
                : "bg-white"
            }`}
            onClick={() => onSelect("YES")}
          >
            YES
          </div>
          <div
            className={`px-4 py-2 rounded cursor-pointer border ${
              selected && selected.answer === "NO" ? "bg-red-200" : "bg-white"
            }`}
            onClick={() => onSelect("NO")}
          >
            NO
          </div>

          <div className="ml-6 text-sm text-gray-500">
            Voice: {listening ? "Listening..." : "Idle"}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Last speech:{" "}
          {lastSpeech
            ? `${lastSpeech.raw} (${Math.round(lastSpeech.confidence * 100)}%)`
            : "-"}
        </div>
        <div className="flex gap-3">
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save & Next
          </button>
        </div>
      </div>
    </div>
  );
}
