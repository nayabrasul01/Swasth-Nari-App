import React from "react";

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="mb-4">{children}</div>
        <div className="flex justify-end">
          <button
            onClick={() => onClose(false)}
            className="px-4 py-2 border rounded mr-2"
          >
            No
          </button>
          <button
            onClick={() => onClose(true)}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
