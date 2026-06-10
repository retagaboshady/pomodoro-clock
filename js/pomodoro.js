const hrDisplay = document.getElementById('hours');
const hrColon = document.getElementById('hours-colon');
const minDisplay = document.getElementById('minutes');
const secDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('start-btn')
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const themeToggle = document.getElementById('theme-toggle');
const hoursInput = document.getElementById('input-hours');
const minsInput = document.getElementById('input-minutes');
const saveSettingsBtn = document.getElementById('save-settings');

let countdownInterval = null;
let totalSecondsLeft = 25 * 60;
let currentSelectedSeconds = 25 * 60;

function updateDisplay() {
    let hrs = Math.floor(totalSecondsLeft / 3600);
    let mins = Math.floor((totalSecondsLeft % 3600) / 60);
    let secs = totalSecondsLeft % 60;
    if (hrs > 0) {
        hrDisplay.classList.remove('hidden');
        hrColon.classList.remove('hidden');
        hrDisplay.textContent = hrs < 10 ? '0' + hrs : hrs;
    } else {
        hrDisplay.classList.add('hidden');
        hrColon.classList.add('hidden');
    }
    minDisplay.textContent = mins < 10 ? '0' + mins : mins;
    secDisplay.textContent = secs < 10 ? '0' + secs : secs;
}

function startTimer() {
    if (countdownInterval !== null) return;
    startBtn.classList.add('hidden');
    pauseBtn.classList.remove('hidden');
    countdownInterval = setInterval(() => {
        if (totalSecondsLeft > 0) {
            totalSecondsLeft--;
            updateDisplay();
        } else {
            clearInterval(countdownInterval);
            countdownInterval = null;
            const alertSound = document.getElementById('alarm-sound');
            if (alertSound) alertSound.play();
            alert("Session is over");
            resetTimer();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(countdownInterval);
    countdownInterval = null;
    pauseBtn.classList.add('hidden');
    startBtn.classList.remove('hidden');
}

function