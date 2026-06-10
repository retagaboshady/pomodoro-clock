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
    
}