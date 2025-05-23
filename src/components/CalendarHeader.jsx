import React, { useState } from 'react';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const years = Array.from({ length: 41 }, (_, i) => 1990 + i);

export default function CalendarHeader({ currentDate, onPrev, onNext, onJump }) {
  const [monthDropdown, setMonthDropdown] = useState(false);
  const [yearDropdown, setYearDropdown] = useState(false);

  const toggleMonth = () => {
    setMonthDropdown(prev => !prev);
    setYearDropdown(false); 
  };

  const toggleYear = () => {
    setYearDropdown(prev => !prev);
    setMonthDropdown(false); 
  };

  const handleMonthSelect = (index) => {
    setMonthDropdown(false);
    const newDate = new Date(currentDate.getFullYear(), index, 1);
    onJump(newDate);
  };

  const handleYearSelect = (year) => {
    setYearDropdown(false);
    const newDate = new Date(year, currentDate.getMonth(), 1);
    onJump(newDate);
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-indigo-100 rounded-lg shadow-inner">
      <button
        onClick={onPrev}
        className="text-xl p-2 rounded-full hover:bg-indigo-200 text-gray-600 hover:text-indigo-700 transition"
      >
        ‹
      </button>

      <div className="relative flex gap-2 items-center text-lg font-semibold text-indigo-700">
        <div className="relative">
          <button
            onClick={toggleMonth}
            className="hover:text-indigo-900 transition cursor-pointer"
          >
            {months[currentDate.getMonth()]}
          </button>
          {monthDropdown && (
            <div className="absolute z-10 mt-1 bg-white border rounded shadow w-32 max-h-60 overflow-y-auto">
              {months.map((m, idx) => (
                <div
                  key={m}
                  onClick={() => handleMonthSelect(idx)}
                  className="px-3 py-1 hover:bg-indigo-100 cursor-pointer"
                >
                  {m}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={toggleYear}
            className="hover:text-indigo-900 transition cursor-pointer"
          >
            {currentDate.getFullYear()}
          </button>
          {yearDropdown && (
            <div className="absolute z-10 mt-1 bg-white border rounded shadow w-24 max-h-60 overflow-y-auto">
              {years.map((y) => (
                <div
                  key={y}
                  onClick={() => handleYearSelect(y)}
                  className="px-3 py-1 hover:bg-indigo-100 cursor-pointer"
                >
                  {y}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={onNext}
        className="text-xl p-2 rounded-full hover:bg-indigo-200 text-gray-600 hover:text-indigo-700 transition"
      >
        ›
      </button>
    </div>
  );
}
