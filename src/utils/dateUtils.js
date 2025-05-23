export function getMonthDays(year, month) {
  const date= new Date(year, month, 1);
  const days= [];

  
  const firstDay= date.getDay();

 
  const prevMonthDaysCount= firstDay;

 
  const prevMonth=month=== 0 ? 11 :month - 1;
  const prevYear = month=== 0 ? year- 1 : year;

  
  const prevMonthDays =new Date(prevYear, prevMonth + 1, 0).getDate();

  
  for (let i =prevMonthDays- prevMonthDaysCount + 1;i<= prevMonthDays;i++) {
    days.push({
      date:new Date(prevYear, prevMonth, i),
      currentMonth:false,
    });
  }

  
  const daysInMonth= new Date(year, month + 1, 0).getDate();
  for (let i=1; i<=daysInMonth;i++) {
    days.push({
      date: new Date(year, month, i),
      currentMonth:true,
    });
  }

  
  const remaining = 42-days.length;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  for (let i = 1; i <=remaining; i++) {
    days.push({
      date: new Date(nextYear, nextMonth, i),
      currentMonth: false,
    });
  }

  return days;
}


export function formatDate(date) {
  const y =date.getFullYear();
  const m =(date.getMonth() + 1).toString().padStart(2, '0');
  const d =date.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
}


export function timeToMinutes(timeStr) {
  const [h,m] = timeStr.split(':').map(Number);
  return h*60+m;
}


export function eventsOverlap(eventA, eventB) {
  const startA= timeToMinutes(eventA.time);
  const endA= startA + eventA.duration;

  const startB =timeToMinutes(eventB.time);
  const endB= startB + eventB.duration;

  return startA<endB &&startB<endA;
}
