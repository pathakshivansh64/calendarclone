import React, { useState } from 'react';

export default function EventModal({ onClose, onAdd, selectedDate }) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('12:00');

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    const randomColor = ['bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-purple-500', 'bg-yellow-500'][Math.floor(Math.random() * 5)];

    onAdd({
      id: Date.now(),
      title,
      time,
      duration: 60,
      date: selectedDate,
      color: randomColor,
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-80 space-y-4"
      >
        <h2 className="text-lg font-semibold text-gray-700">Add Event</h2>
        <div>
          <label className="text-sm font-medium">Date</label>
          <input
            type="text"
            value={selectedDate}
            disabled
            className="w-full mt-1 p-2 border rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            placeholder="Meeting, Birthday..."
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
