// Elements

const inputSection = document.querySelector('.input_section');
const timerSection = document.querySelector('.timer_section');

const addTitleBtn = document.querySelector('.add_title_btn');
const timerTitlePrevEl = document.querySelector('#timer_title_preview');
const timerTitleEl = document.querySelector('#timer_title');

const inputTimes = document.querySelectorAll('.input_time');
const inputMin = document.querySelector('#input_min');
const inputSec = document.querySelector('#input_sec');
const inputBtn = document.querySelector('.input_btn');

const timeMin = document.querySelector('#time_min');
const timeSec = document.querySelector('#time_sec');
const progressBar = document.querySelector('#progress_bar');

const resetBtn = document.querySelector('.reset_btn');

// Global

let timerTitle = '';
let timerInterval;

// Logic

inputTimes.forEach((inp) => {
  inp.addEventListener('blur', () => {
    let n = parseInt(inp.value);
    if (!n) n = 0;
    if (n < 0) n = 0;
    if (n > 59) n = 59;
    inp.value = n <= 9 ? '0' + n : n;
  });
});

inputBtn.addEventListener('click', () => {
  startTimer(inputMin.value, inputSec.value);
});

function startTimer(m, s) {
  m = parseInt(m);
  s = parseInt(s);

  const totalSec = m * 60 + s;
  progressBar.style.animation = `progress ${totalSec}s linear forwards`;

  if (m > 0 || s > 0) {
    inputSection.classList.add('hidden');
    timerSection.classList.remove('hidden');

    updateUI(m, s);
    timerInterval = setInterval(() => {
      s--;
      if (s < 0) {
        s = 59;
        m--;
      }
      if (m < 0) m = 0;

      if (m === 0 && s === 0) {
        clearInterval(timerInterval);
      }

      updateUI(m, s);
    }, 1000);
  }
}

function updateUI(m, s) {
  timeMin.textContent = m <= 9 ? '0' + m : m;
  timeSec.textContent = s <= 9 ? '0' + s : s;

  // progressBar.style.width = ((curr / total) * 100).toFixed(3) + '%';
}

addTitleBtn.addEventListener('click', () => {
  const title = prompt('Enter Timer Title');
  if (title !== null) {
    timerTitle = title || '';
    timerTitlePrevEl.textContent = timerTitle || 'Not Set';
    timerTitleEl.textContent = timerTitle;
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  updateUI(0, 0);

  timerSection.classList.add('hidden');
  inputSection.classList.remove('hidden');

  inputMin.value = '00';
  inputSec.value = '00';

  timerTitlePrevEl.textContent = timerTitle || 'Not Set';
  timerTitleEl.textContent = timerTitle || ``;
});

window.onload = function () {
  timerTitle = new URLSearchParams(window.location.search).get('title') || '';
  timerTitlePrevEl.textContent = timerTitle || 'Not Set';
  timerTitleEl.textContent = timerTitle || ``;
};
