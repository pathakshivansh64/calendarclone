export function getMonthDays(year, month) {
  const date = new Date(year, month, 1);
  const days = [];

  // Get day of week of first day of month (0=Sun,...6=Sat)
  const firstDay = date.getDay();

  // Days in previous month to fill grid before 1st of current month
  const prevMonthDaysCount = firstDay;

  // Previous month and year
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;

  // Number of days in previous month
  const prevMonthDays = new Date(prevYear, prevMonth + 1, 0).getDate();

  // Days from previous month to show
  for (let i = prevMonthDays - prevMonthDaysCount + 1; i <= prevMonthDays; i++) {
    days.push({
      date: new Date(prevYear, prevMonth, i),
      currentMonth: false,
    });
  }

  // Days in current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      currentMonth: true,
    });
  }

  // Fill remaining cells to complete 42 day grid (6 weeks * 7 days)
  const remaining = 42 - days.length;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  for (let i = 1; i <= remaining; i++) {
    days.push({
      date: new Date(nextYear, nextMonth, i),
      currentMonth: false,
    });
  }

  return days;
}

// Format Date object to 'YYYY-MM-DD'
export function formatDate(date) {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Compare two time strings 'HH:mm'
export function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

// Check overlap of two events given time and duration in minutes
export function eventsOverlap(eventA, eventB) {
  const startA = timeToMinutes(eventA.time);
  const endA = startA + eventA.duration;

  const startB = timeToMinutes(eventB.time);
  const endB = startB + eventB.duration;

  return startA < endB && startB < endA;
}
