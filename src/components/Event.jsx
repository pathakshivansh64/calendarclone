import React from 'react';

export default function Event({ event }) {
  return (
    <div
      className={`text-xs truncate px-1 rounded mb-0.5 text-white ${event.color}`}
      title={`${event.title} (${event.time} - ${event.duration}min)`}
    >
      {event.title} @{event.time}
    </div>
  );
}
