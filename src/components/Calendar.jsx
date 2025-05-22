import React, { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import Event from './Event';
import EventModal from './EventModal';
import { getMonthDays, formatDate } from '../utils/dateUtils';
import holidays from './holidays';



export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const allEvents = [
    ...holidays.map(h => ({ ...h, color: 'bg-red-500' })),
    ...events,
  ];

  const days = getMonthDays(currentDate.getFullYear(), currentDate.getMonth());
  const todayStr = formatDate(new Date());

  const eventsByDate = {};
  allEvents.forEach(event => {
    if (!eventsByDate[event.date]) eventsByDate[event.date] = [];
    eventsByDate[event.date].push(event);
  });

  function handleDayClick(dateObj, currentMonth) {
    if (!currentMonth) return;
    const dateStr = formatDate(dateObj);
    setSelectedDate(dateStr);
    setModalOpen(true);
  }

  function handleAddEvent(newEvent) {
    setEvents(prev => [...prev, newEvent]);
  }

  function prevMonth() {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }

  function nextMonth() {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }

  function goToToday() {
    setCurrentDate(new Date());
  }

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div
      className="relative w-full max-w-5xl mx-auto mt-4 p-4 bg-white rounded-lg shadow-lg box-border
      flex flex-col"
      style={{ height: 'calc(100vh - 80px)' }} 
    >
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-indigo-700">📅 My Calendar</h1>
        <button
          onClick={goToToday}
          className="px-4 py-1.5 rounded bg-indigo-500 text-white hover:bg-indigo-600 transition"
        >
          Today
        </button>
      </div>

      <CalendarHeader
        currentDate={currentDate}
        onPrev={prevMonth}
        onNext={nextMonth}
        onJump={setCurrentDate}
      />

      <div className="grid grid-cols-7 mt-4 text-center font-semibold text-gray-600 flex-shrink-0">
        {weekdays.map(day => (
          <div key={day} className="py-2 border-b border-gray-200">{day}</div>
        ))}
      </div>

      {/* Scrollable calendar grid container */}
      <div className="flex-grow overflow-auto mt-2 border border-gray-200 rounded">
        <div className="grid grid-cols-7 gap-px text-sm">
          {days.map(({ date, currentMonth }, idx) => {
            const dateStr = formatDate(date);
            const dayEvents = eventsByDate[dateStr] || [];
            const isToday = dateStr === todayStr;

            return (
              <div
                key={idx}
                onClick={() => handleDayClick(date, currentMonth)}
                className={`
                  box-border w-full border rounded p-1 flex flex-col cursor-pointer transition min-h-[6rem]
                  ${currentMonth ? 'bg-white' : 'bg-gray-100 text-gray-400 cursor-default'}
                  ${isToday ? 'border-indigo-500 border-2 shadow-md' : 'border-gray-300 hover:border-indigo-300'}
                `}
              >
                <div className="text-right font-semibold">{date.getDate()}</div>
                <div className="flex flex-col mt-1 overflow-y-auto max-h-24">
                  {dayEvents.length === 0 && (
                    <div className="text-xs text-gray-300 italic">No events</div>
                  )}
                  {dayEvents.map(event => (
                    <Event key={event.id} event={event} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {modalOpen && (
        <EventModal
          selectedDate={selectedDate}
          onClose={() => setModalOpen(false)}
          onAdd={handleAddEvent}
        />
      )}
    </div>
  );
}
