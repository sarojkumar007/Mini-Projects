let f = new Intl.NumberFormat('en-US', {
  minimumIntegerDigits: 2,
  useGrouping: false,
});
let f2 = new Intl.NumberFormat('en-US', {
  minimumIntegerDigits: 4,
  useGrouping: false,
});
let display = document.getElementById('display');
let timeLapDOM = document.getElementById('timeLaps');

let h = 0;
let m = 0;
let s = 0;
let ms = 0;
let isTimerRunning = false;
let TimerIntervalObject;

let TimeLapses = [];

const updateTimeLapUI = (timeLaps) => {
  if (timeLaps.length > 0) {
    let TL_HTML = '';
    for (let t = 0; t < timeLaps.length; t++) {
      const TL = timeLaps[t];
      TL_HTML += `<li class="timeLapse">
      <i class="material-icons-outlined">timer</i>${t + 1}.
      <span>${TL}</span>
    </li>`;
    }
    timeLapDOM.innerHTML = TL_HTML;
  } else {
    timeLapDOM.innerHTML = '';
  }
};

const startTimer = () => {
  if (!isTimerRunning) {
    isTimerRunning = true;
    TimerIntervalObject = setInterval(timer, 100);
  }
};

const pauseTimer = () => {
  if (isTimerRunning) {
    isTimerRunning = false;
    clearInterval(TimerIntervalObject);
  }
};

const resetTimer = () => {
  clearInterval(TimerIntervalObject);
  isTimerRunning = false;
  h = 0;
  m = 0;
  s = 0;
  ms = 0;
  display.innerHTML = '0:00:00:00';
  TimeLapses = [];
  updateTimeLapUI(TimeLapses);
};

const addTimeLapse = () => {
  if (
    display.innerHTML !== '0:00:00:00' &&
    !TimeLapses.includes(display.textContent)
  ) {
    TimeLapses.push(display.textContent);
    updateTimeLapUI(TimeLapses);
  }
};

const timer = () => {
  h = parseInt(h);
  m = parseInt(m);
  s = parseInt(s);
  ms = parseInt(ms);

  ms += 1;

  if (ms === 10) {
    s += 1;
    ms = 0;
  }
  if (s === 60) {
    m += 1;
    s = 0;
  }
  if (m === 60) {
    h += 1;
    m = 0;
  }

  display.innerHTML = `${h}:${f.format(m)}:${f.format(s)}:${f.format(ms)}`;
};

window.onload = () => {
  // HourGlass Animation
  // let StartIcon = document.querySelector('#start i')
  // setInterval(() => {
  //   if (StartIcon.textContent === 'hourglass_bottom') {
  //     StartIcon.textContent = 'hourglass_top'
  //   }
  //   else { StartIcon.textContent = 'hourglass_bottom' }
  // }, 1000);

  document.getElementById('start').addEventListener('click', startTimer);
  document.getElementById('pause').addEventListener('click', pauseTimer);
  document.getElementById('reset').addEventListener('click', resetTimer);
  document.getElementById('timeLap').addEventListener('click', addTimeLapse);
};
