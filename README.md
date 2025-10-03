# 🕒 Stopwatch App

A fully functional stopwatch application built with HTML, CSS, and JavaScript. Features a modern, responsive design with bonus features including lap times, milliseconds tracking, and dark/light theme toggle.

## 📋 Features

### Core Requirements ✅
- **Timer Display**: Digital clock showing HH:MM:SS.mmm format
- **Start Button**: Begins the timer using `setInterval()`
- **Stop Button**: Pauses the timer using `clearInterval()`
- **Reset Button**: Resets time to 00:00:00.000
- **Prevents Multiple Timers**: Start button disabled while running

### Bonus Features 🌟
- **Milliseconds**: Tracks time down to the millisecond
- **Lap Times**: Record and display split times
- **Responsive Design**: Works perfectly on mobile and desktop
- **Dark/Light Theme**: Toggle between themes with localStorage persistence
- **Keyboard Shortcuts**: 
  - `S` - Start
  - `P` - Stop (Pause)
  - `R` - Reset
  - `L` - Record Lap

## 🎨 Design Features

- Modern gradient backgrounds
- Smooth animations and transitions
- Hover effects on all buttons
- Custom scrollbar for lap times
- Professional color scheme
- Flexbox and Grid layouts
- Responsive breakpoints for mobile (480px) and tablet (768px)

## 🚀 How to Use

1. Open `index.html` in your web browser
2. Click **Start** to begin the stopwatch
3. Click **Stop** to pause the timer
4. Click **Reset** to clear the timer
5. Click **Lap** (while running) to record split times
6. Click the 🌙/☀️ icon to toggle dark/light theme

## 📁 Project Structure

```
Stopwatch-App/
├── index.html    # Main HTML structure
├── style.css     # Styling and responsive design
├── script.js     # JavaScript functionality
└── README.md     # Project documentation
```

## 💻 Code Highlights

### JavaScript Features
- **Timer Logic**: Uses `Date.now()` for accurate time tracking
- **Interval Management**: Properly uses `setInterval()` and `clearInterval()`
- **Event Listeners**: Handles button clicks and keyboard shortcuts
- **Local Storage**: Saves theme preference
- **Clean Code**: Well-commented and organized

### CSS Features
- **CSS Variables**: For easy theme switching
- **Animations**: Smooth transitions and keyframe animations
- **Responsive**: Mobile-first approach with media queries
- **Modern Design**: Gradients, shadows, and hover effects

##  Browser Compatibility

- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Mobile Browsers ✅

## 📝 Notes

- Timer accuracy: Updates every 10ms for smooth display
- Theme preference persists across sessions
- Lap times are displayed newest-first
- All buttons have appropriate disabled states
- Fully accessible with ARIA labels
