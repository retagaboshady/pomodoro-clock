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

function resetTimer() {
    pauseTimer();
    totalSecondsLeft = currentSelectedSeconds;
    updateDisplay();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pasueTimer);
resetBtn.addEventListener('click', resetTimer);

const modeButtons = document.querySelectorAll('.mode-btn');
modeButtons.forEach(buttons => {
    button.addEventListener('click', (event) => {
        modeButtons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        let targetHours = parseInt(event.target.getAttribute('data-hours')) || 0;
        let targetMins= parseInt(event.target.getAttribute('data-mins')) || 0;
        currentSelectedSeconds = (targetHours * 3600) + (targetMins * 60);
    });
});

saveSettingsBtn.addEventListener('click', () => {
    let customHours = parseInt(hoursInput.value) || 0;
    let customMins = parseInt(minsInput.value) || 0;
    modeButtons.forEach(btn => btn.classList.remove('active'));
    currentSelectedSeconds = (customHours * 3600) + (customMins * 60);
    resetTimer();
    alert('Added successfully');
});

themeToggle.addEventListener('click', () => {
    const mainBody = document.body;
    if (mainBody.classList,contains('dark-theme')) {
        mainBody.classList.replace('dark-theme', 'light-theme');
    } else {
        mainBody.classList.replace('light-theme', 'dark-theme');
    }
});

const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

addTaskBtn.addEventListener('click', () => {
    const cleanedText = taskInput.value.trim();
    if (!cleanedText) return;
    const taskRow = document.createElement('li');
    taskRow.innerHTML = `
        <span class="task-text">${cleanedText}</span>
        <button class="delete-task">x</button>
    `;
    taskRow.querySelector('.task-text').addEventListener('click', (e) => {
        e.target.classList.toggle('done');
    });
    taskRow.querySelector('.delete-task').addEventListener('click', () => {
        taskRow.remove();
    });
    taskList.appendChild(taskRow);
    taskInput.value = '';
});

updateDisplay();