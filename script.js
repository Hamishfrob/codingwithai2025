let timeLeft;
let timerId = null;
let isWorkTime = true;
let workDuration = 25 * 60; // Default work duration in seconds
let breakDuration = 5 * 60; // Default break duration in seconds

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const settingsButton = document.getElementById('settings');
const modeText = document.getElementById('mode-text');
const modal = document.getElementById('settings-modal');
const closeButton = document.getElementById('close-settings');
const settingsForm = document.getElementById('settings-form');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? workDuration : breakDuration;
    modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    updateDisplay();
}

function startTimer() {
    if (timerId === null) {
        if (timeLeft === undefined) {
            timeLeft = workDuration;
        }
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                switchMode();
                startTimer();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = workDuration;
    modeText.textContent = 'Work Time';
    updateDisplay();
}

// Settings Modal Functions
function openSettings() {
    document.getElementById('workTime').value = Math.floor(workDuration / 60);
    document.getElementById('breakTime').value = Math.floor(breakDuration / 60);
    modal.style.display = 'block';
}

function closeSettings() {
    modal.style.display = 'none';
}

function saveSettings(e) {
    e.preventDefault();
    const newWorkTime = document.getElementById('workTime').value;
    const newBreakTime = document.getElementById('breakTime').value;
    
    workDuration = parseInt(newWorkTime) * 60;
    breakDuration = parseInt(newBreakTime) * 60;
    
    // Reset timer with new duration
    resetTimer();
    closeSettings();
}

// Event Listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
settingsButton.addEventListener('click', openSettings);
closeButton.addEventListener('click', closeSettings);
settingsForm.addEventListener('submit', saveSettings);

// Close modal if clicked outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeSettings();
    }
});

// Initialize the display
resetTimer(); 