let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let laps = [];

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        isRunning = true;
    }
}

function stopStopwatch() {
    if (isRunning) {
        clearInterval(timerInterval);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    laps = [];
    updateDisplay();
    updateLaps();
}

function recordLap() {
    if (isRunning) {
        let lapTime = Date.now() - startTime;
        laps.push(lapTime);
        updateLaps();
    }
}

function updateDisplay() {
    let currentTime = isRunning ? Date.now() - startTime : elapsedTime;
    let milliseconds = Math.floor(currentTime % 1000);
    let seconds = Math.floor((currentTime / 1000) % 60);
    let minutes = Math.floor((currentTime / (1000 * 60)) % 60);
    let hours = Math.floor(currentTime / (1000 * 60 * 60));

    let displayTime = 
        (hours < 10 ? '0' : '') + hours + ':' +
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds + '.' +
        milliseconds.toString().padStart(3, '0');

    document.getElementById('display').textContent = displayTime;
}

function updateLaps() {
    let lapsList = document.getElementById('laps');
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        let li = document.createElement('li');
        let cumulative = formatTime(lap);
        let difference = index === 0 ? lap : lap - laps[index - 1];
        let diffFormatted = formatTime(difference);
        li.textContent = `Lap ${index + 1}: ${cumulative} (+${diffFormatted})`;
        lapsList.appendChild(li);
    });
}

function formatTime(time) {
    let milliseconds = Math.floor(time % 1000);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let hours = Math.floor(time / (1000 * 60 * 60));

    return (hours < 10 ? '0' : '') + hours + ':' +
           (minutes < 10 ? '0' : '') + minutes + ':' +
           (seconds < 10 ? '0' : '') + seconds + '.' +
           milliseconds.toString().padStart(3, '0');
}

updateDisplay();