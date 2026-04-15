const setupPanel = document.getElementById('setupPanel');
const countdownDisplay = document.getElementById('countdownDisplay');
const finishedDisplay = document.getElementById('finishedDisplay');
const datetimeInput = document.getElementById('datetimeInput');
const errorMsg = document.getElementById('errorMsg');
const targetLabel = document.getElementById('targetLabel');

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minsEl = document.getElementById('minutes');
const secsEl = document.getElementById('seconds');

const startCountdownBtn = document.getElementById('startCountdownBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resumeBtn = document.getElementById('resumeBtn');
const resetBtn = document.getElementById('resetBtn');
const newCountdownBtn = document.getElementById('newCountdownBtn');

let targetTime = null;
let intervalId = null;
let isPaused = false;
let remainingMs = 0;

function pad(n) {
    return String(n).padStart(2, '0');
}

function setActive(btn) {
    btn.classList.replace('button_disabled', 'button');
    btn.disabled = false;
}

function setDisabled(btn) {
    btn.classList.replace('button', 'button_disabled');
    btn.disabled = true;
}

function updateDisplay(ms) {
    if (ms <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minsEl.textContent = '00';
        secsEl.textContent = '00';
        return;
    }
    const totalSec = Math.floor(ms / 1000);
    const d = Math.floor(totalSec / 86400);
    const h = Math.floor((totalSec % 86400) / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;

    daysEl.textContent = pad(d);
    hoursEl.textContent = pad(h);
    minsEl.textContent = pad(m);
    secsEl.textContent = pad(s);
}

function tick() {
    const ms = targetTime - Date.now();
    if (ms <= 0) {
        clearInterval(intervalId);
        intervalId = null;
        updateDisplay(0);
        localStorage.removeItem('countdownTarget');
        finishedDisplay.style.display = 'flex';
        countdownDisplay.style.display = 'none';
        return;
    }
    updateDisplay(ms);
}

function startTimer(time) {
    targetTime = time;
    const chosen = new Date(targetTime);
    
    targetLabel.textContent = chosen.toLocaleDateString('en-US', {
        day: '2-digit', month: 'long', year: 'numeric'
    });

    tick();
    clearInterval(intervalId);
    intervalId = setInterval(tick, 1000);

    setupPanel.style.display = 'none';
    countdownDisplay.style.display = 'flex';
    finishedDisplay.style.display = 'none';

    setActive(pauseBtn);
    setDisabled(resumeBtn);
}

(function init() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    datetimeInput.min = now.toISOString().slice(0, 16);

    const savedTarget = localStorage.getItem('countdownTarget');
    if (savedTarget) {
        const savedTime = parseInt(savedTarget, 10);
        if (savedTime > Date.now()) {
            startTimer(savedTime);
        } else {
            localStorage.removeItem('countdownTarget');
        }
    }
})();

startCountdownBtn.addEventListener('click', () => {
    errorMsg.textContent = '';
    const val = datetimeInput.value;
    if (!val) {
        errorMsg.textContent = 'Please select a date.';
        return;
    }
    const chosen = new Date(val);
    const timeMs = chosen.getTime();

    if (timeMs <= Date.now()) {
        errorMsg.textContent = 'Date must be in the future.';
        return;
    }

    localStorage.setItem('countdownTarget', timeMs);
    startTimer(timeMs);
});

pauseBtn.addEventListener('click', () => {
    if (!intervalId) return;
    clearInterval(intervalId);
    intervalId = null;
    isPaused = true;
    remainingMs = targetTime - Date.now();
    setDisabled(pauseBtn);
    setActive(resumeBtn);
});

resumeBtn.addEventListener('click', () => {
    if (!isPaused) return;
    targetTime = Date.now() + remainingMs;
    localStorage.setItem('countdownTarget', targetTime);
    isPaused = false;
    clearInterval(intervalId);
    intervalId = setInterval(tick, 1000);
    setActive(pauseBtn);
    setDisabled(resumeBtn);
});

resetBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
    isPaused = false;
    targetTime = null;
    localStorage.removeItem('countdownTarget');
    updateDisplay(0);
    countdownDisplay.style.display = 'none';
    setupPanel.style.display = 'flex';
});

newCountdownBtn.addEventListener('click', () => {
    datetimeInput.value = '';
    errorMsg.textContent = '';
    localStorage.removeItem('countdownTarget');
    updateDisplay(0);
    finishedDisplay.style.display = 'none';
    setupPanel.style.display = 'flex';
});