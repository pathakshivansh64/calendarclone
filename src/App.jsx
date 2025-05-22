import React from 'react';
import Calendar from './components/Calendar';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-pink-100 to-yellow-100 flex items-center justify-center p-4">
      <Calendar />
    </div>
  );
}
