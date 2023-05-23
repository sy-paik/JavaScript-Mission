const daysContainer = document.querySelector(".days");
const nextBtn = document.querySelector(".btn-next");
const prevBtn = document.querySelector(".btn-prev");
const todayBtn = document.querySelector(".today");
const monthYear = document.querySelector(".month-year");
const selectedDate = document.getElementById('selectedDate');
const calendar = document.querySelector('.calendar');

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

calendar.style.display = 'none';

// 현재 년, 월, 일
const date = new Date(); 
let currentMonth = date.getMonth();  // 실제 달 - 1 (인덱스)
let currentYear = date.getFullYear(); 

let calendarVisible = false;

const renderCalendar = () => {
  date.setDate(1); // 현재 달의 첫날을 1일로
  
  /* 현재의 달을 기준으로 첫날과 마지막 날 */
  const firstDay = new Date(currentYear, currentMonth, 1); 
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  
  /* 마지막 날의 요일과 마지막 날의 날짜 */
  const lastDayIndex = lastDay.getDay();
  const lastDayDate = lastDay.getDate();
  
  /* 이전의 달의 마지막 날과 마지막 날의 날짜 */
  const prevLastDay = new Date(currentYear, currentMonth, 0); // Sun Apr 30 2023 00:00:00 GMT+0900
  const prevLastDayDate = prevLastDay.getDate();
  
  const nextDays = 7 - lastDayIndex - 1; // 다음 달에 표시할 날짜의 수

  monthYear.innerHTML = `${months[currentMonth]} ${currentYear}`;

  let days = "";

  /* 이전 달의 날짜 출력*/
  for (let x = firstDay.getDay(); x > 0; x--) {
    days += `<div class="day prev">${prevLastDayDate - x + 1}</div>`;
  }

  /* 현재 달의 날짜 출력 */
  for (let i = 1; i <= lastDayDate; i++) {
    if (
      i === new Date().getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {
      days += `<div class="day today">${i}</div>`;
    } else {
      days += `<div class="day">${i}</div>`;
    }
  }

  /* 다음 달의 날짜 */
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next">${j}</div>`;
  }
  
  /* 달력을 HTML에 삽입 */
  daysContainer.innerHTML = days;
};

/* 다음 버튼을 누르면 다음 달의 캘린더 렌더링 */
nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});

/* 이전 버튼을 누르면 이전 달의 캘린더 렌더링 */
prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

renderCalendar();

/* 날짜를 클릭했을 때  */
daysContainer.addEventListener('click', (event) => {
  const targetDate = event.target;
  if (targetDate.classList.contains('day')) {
    // 이전 달이나 다음 달의 날짜 선택 방지
    if(!targetDate.classList.contains('prev') && !targetDate.classList.contains('next')){
    const day = targetDate.textContent;
    const selectedDay = getSelectedDate(currentYear, currentMonth, day);
    selectedDate.value = selectedDay; // input 요소이기 때문에 value 
    console.log(selectedDay); // 선택한 날짜 콘솔
    toggleCalendar();
    }
}
});

function getSelectedDate(year, month, day) {
  const selectedMonth = `${month + 1}`.padStart(2, '0');
  const selectedDay = `${day}`.padStart(2, '0');
  return `${year}-${selectedMonth}-${selectedDay}`;
}

const toggleCalendar = () => {
  calendarVisible = !calendarVisible;
  calendar.style.display = calendarVisible ? 'block' : 'none'
}

selectedDate.addEventListener('click', (event) => {
  toggleCalendar();
})

/* 캘린더 이외의 영역 클릭 시 캘린더 사라짐 */
document.addEventListener('click', (event) => {
  const targetElement = event.target;
  if (!calendar.contains(targetElement) && targetElement !== selectedDate) {
    calendar.style.display = 'none';
    calendarVisible = false;
  }
});