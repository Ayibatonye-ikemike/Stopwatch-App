/* ========================================
   STOPWATCH APP - JAVASCRIPT FUNCTIONALITY
   ======================================== */

// Get DOM elements
const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');
const lapsContainer = document.getElementById('lapsContainer');
const themeToggle = document.getElementById('themeToggle');

// Timer variables
let timerInterval = null; // Stores the interval ID
let isRunning = false; // Tracks if timer is running
let milliseconds = 0; // Total elapsed time in milliseconds
let lapCounter = 0; // Tracks number of laps recorded

/* ========================================
   CORE TIMER FUNCTIONS
   ======================================== */

/**
 * Formats milliseconds into HH:MM:SS.mmm format
 * @param {number} ms - Total milliseconds
 * @returns {object} Object containing hours, minutes, seconds, and milliseconds
 */
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const millisecondsRemainder = ms % 1000;

    return {
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
        milliseconds: String(millisecondsRemainder).padStart(3, '0')
    };
}

/**
 * Updates the timer display with current time
 */
function updateDisplay() {
    const time = formatTime(milliseconds);
    
    // Update each segment of the display
    document.querySelector('.hours').textContent = time.hours;
    document.querySelector('.minutes').textContent = time.minutes;
    document.querySelector('.seconds').textContent = time.seconds;
    document.querySelector('.milliseconds').textContent = `.${time.milliseconds}`;
}

/**
 * Starts the stopwatch timer
 * Prevents multiple timers from starting
 */
function startTimer() {
    // Prevent starting multiple intervals
    if (isRunning) return;
    
    isRunning = true;
    
    // Record the start time
    const startTime = Date.now() - milliseconds;
    
    // Update timer every 10 milliseconds for smooth animation
    timerInterval = setInterval(() => {
        milliseconds = Date.now() - startTime;
        updateDisplay();
    }, 10);
    
    // Update button states
    startBtn.disabled = true;
    stopBtn.disabled = false;
    lapBtn.disabled = false;
    
    // Visual feedback
    startBtn.style.opacity = '0.5';
    stopBtn.style.opacity = '1';
    lapBtn.style.opacity = '1';
}

/**
 * Stops/pauses the stopwatch timer
 * Uses clearInterval to stop the timer
 */
function stopTimer() {
    if (!isRunning) return;
    
    isRunning = false;
    clearInterval(timerInterval); // Stop the interval
    timerInterval = null;
    
    // Update button states
    startBtn.disabled = false;
    stopBtn.disabled = true;
    lapBtn.disabled = true;
    
    // Visual feedback
    startBtn.style.opacity = '1';
    stopBtn.style.opacity = '0.5';
    lapBtn.style.opacity = '0.5';
}

/**
 * Resets the stopwatch to 00:00:00.000
 * Clears all lap times
 */
function resetTimer() {
    // Stop the timer if running
    if (isRunning) {
        stopTimer();
    }
    
    // Reset all variables
    milliseconds = 0;
    lapCounter = 0;
    
    // Update display
    updateDisplay();
    
    // Clear lap times
    lapsList.innerHTML = '';
    lapsContainer.classList.remove('active');
    
    // Reset button states
    startBtn.disabled = false;
    stopBtn.disabled = true;
    lapBtn.disabled = true;
    resetBtn.disabled = false;
    
    // Visual feedback
    startBtn.style.opacity = '1';
    stopBtn.style.opacity = '0.5';
    lapBtn.style.opacity = '0.5';
}

/* ========================================
   BONUS FEATURE: LAP TIMES
   ======================================== */

/**
 * Records a lap time (split time)
 * Shows the current elapsed time when lap button is clicked
 */
function recordLap() {
    if (!isRunning) return;
    
    lapCounter++;
    const time = formatTime(milliseconds);
    const timeString = `${time.hours}:${time.minutes}:${time.seconds}.${time.milliseconds}`;
    
    // Create lap item element
    const lapItem = document.createElement('div');
    lapItem.className = 'lap-item';
    lapItem.innerHTML = `
        <span class="lap-number">Lap ${lapCounter}</span>
        <span class="lap-time">${timeString}</span>
    `;
    
    // Add to list (newest at top)
    lapsList.insertBefore(lapItem, lapsList.firstChild);
    
    // Show laps container
    lapsContainer.classList.add('active');
}

/* ========================================
   BONUS FEATURE: DARK/LIGHT THEME TOGGLE
   ======================================== */

/**
 * Toggles between dark and light theme
 * Saves preference to localStorage
 */
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    
    // Toggle dark theme class
    body.classList.toggle('dark-theme');
    
    // Update icon
    if (body.classList.contains('dark-theme')) {
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

/**
 * Loads saved theme preference from localStorage
 */
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeIcon.textContent = '☀️';
    }
}

/* ========================================
   EVENT LISTENERS
   ======================================== */

// Button click events
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
themeToggle.addEventListener('click', toggleTheme);

// Keyboard shortcuts for better UX
document.addEventListener('keydown', (e) => {
    switch(e.key.toLowerCase()) {
        case 's':
            if (!isRunning) startTimer();
            break;
        case 'p':
            if (isRunning) stopTimer();
            break;
        case 'r':
            resetTimer();
            break;
        case 'l':
            if (isRunning) recordLap();
            break;
    }
});

/* ========================================
   INITIALIZATION
   ======================================== */

// Initialize display and load theme on page load
window.addEventListener('DOMContentLoaded', () => {
    updateDisplay(); // Show 00:00:00.000
    loadTheme(); // Load saved theme preference
});
