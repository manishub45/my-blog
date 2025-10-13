import React from "react";

export default function ConfirmModal({ open, title = "Confirm", message, onCancel, onConfirm }) {
  // agar open false hai to kuch render mat kar
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay background */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel} // backdrop click pe cancel
      ></div>

      {/* Modal box */}
      <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 z-10">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          {/* Cancel button */}
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Cancel
          </button>

          {/* Confirm/Delete button */}
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
