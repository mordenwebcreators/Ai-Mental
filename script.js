// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const startQuizBtn = document.getElementById('start-quiz');
const quizIntro = document.getElementById('quiz-intro');
const quizQuestions = document.getElementById('quiz-questions');
const quizResults = document.getElementById('quiz-results');
const prevQuestionBtn = document.getElementById('prev-question');
const nextQuestionBtn = document.getElementById('next-question');
const questionCounter = document.querySelector('.question-counter');
const retakeQuizBtn = document.getElementById('retake-quiz');
const saveEntryBtn = document.getElementById('save-entry');
const clearEntryBtn = document.getElementById('clear-entry');
const journalText = document.getElementById('journal-text');
const entriesList = document.getElementById('entries-list');
const gratitudeInput = document.getElementById('gratitude-input');
const addGratitudeBtn = document.getElementById('add-gratitude');
const gratitudeWall = document.getElementById('gratitude-wall');
const dailyTip = document.getElementById('daily-tip');
const newTipBtn = document.getElementById('new-tip');
const installPrompt = document.getElementById('install-prompt');
const installBtn = document.getElementById('install-btn');
const dismissPromptBtn = document.getElementById('dismiss-prompt');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// App State
let currentTheme = 'light';
let currentQuestion = 1;
let quizAnswers = [];
let deferredPrompt = null;
let journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
let gratitudeNotes = JSON.parse(localStorage.getItem('gratitudeNotes')) || [];

// Mental Health Tips
const tips = [
  "Practice deep breathing for 5 minutes when you wake up to start your day calmly.",
  "Write down three things you're grateful for each day to cultivate positivity.",
  "Take short breaks every hour to stretch and move your body.",
  "Limit screen time before bed to improve sleep quality.",
  "Connect with a friend or loved one at least once a day.",
  "Practice mindfulness by focusing on your senses for a few minutes.",
  "Engage in physical activity you enjoy for at least 30 minutes daily.",
  "Set small, achievable goals to build confidence and motivation.",
  "Limit caffeine intake, especially in the afternoon and evening.",
  "Create a relaxing bedtime routine to signal your body it's time to sleep.",
  "Challenge negative thoughts by asking if they're truly accurate.",
  "Spend time in nature to reduce stress and improve mood.",
  "Practice saying 'no' to maintain healthy boundaries.",
  "Keep a water bottle with you and stay hydrated throughout the day.",
  "Try progressive muscle relaxation to release tension in your body."
];

// AI Responses
const aiResponses = {
  greeting: [
    "Hello there! I'm your AI Mental Health Buddy. How are you feeling today?",
    "Hi! I'm here to listen whenever you need to talk. What's on your mind?",
    "Welcome back! How can I support you today?"
  ],
  positive: [
    "That's wonderful to hear! What's contributing to these positive feelings?",
    "I'm so glad you're feeling this way! Would you like to share more?",
    "It's great that you're experiencing these positive emotions. What's been going well for you lately?"
  ],
  neutral: [
    "I hear you. Would you like to explore what might be causing these feelings?",
    "It's okay to feel this way. Do you want to talk more about what's on your mind?",
    "Thank you for sharing. Would you like to discuss this further?"
  ],
  negative: [
    "I'm sorry you're feeling this way. Would you like to talk more about what's bothering you?",
    "That sounds difficult. Remember that it's okay to feel this way. What's been on your mind?",
    "I'm here to listen. Would it help to talk more about what you're experiencing?"
  ],
  general: [
    "I appreciate you sharing that with me. How has this been affecting you?",
    "Thank you for opening up. What else would you like to talk about?",
    "I'm listening. Would you like to explore this feeling further?"
  ],
  resources: [
    "It might help to explore some of our resources section for additional support.",
    "Remember you can always try our wellness tools if you need some relaxation techniques.",
    "The journal feature might be helpful for processing these feelings."
  ],
  goodbye: [
    "Remember I'm here whenever you need to talk. Take care of yourself.",
    "Thank you for chatting with me today. Be kind to yourself.",
    "I'm always available if you need more support. Wishing you well."
  ]
};

// Breathing Exercise
const breathingCircle = document.querySelector('.breathing-circle .circle');
const breathText = document.querySelector('.breath-text');
const startBreathingBtn = document.getElementById('start-breathing');
const stopBreathingBtn = document.getElementById('stop-breathing');
let breathingInterval;

// Sound Therapy
const soundBtns = document.querySelectorAll('.sound-btn');
const volumeControl = document.getElementById('volume');
let currentSound = null;

// Pomodoro Timer
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const modeDisplay = document.getElementById('mode');
const startTimerBtn = document.getElementById('start-timer');
const pauseTimerBtn = document.getElementById('pause-timer');
const resetTimerBtn = document.getElementById('reset-timer');
const workDurationInput = document.getElementById('work-duration');
const breakDurationInput = document.getElementById('break-duration');
let timerInterval;
let isWorking = true;
let isRunning = false;
let timeLeft = 25 * 60;

// Meditation Timer
const meditationTime = document.getElementById('meditation-time');
const startMeditationBtn = document.getElementById('start-meditation');
const stopMeditationBtn = document.getElementById('stop-meditation');
const customMinutes = document.getElementById('custom-minutes');
let meditationInterval;

// Mood Check
const colorOptions = document.querySelectorAll('.color-option');
const moodResult = document.getElementById('mood-result');
const moodSuggestions = {
  red: {
    title: "Angry/Frustrated",
    suggestions: [
      "Try deep breathing exercises to calm your nervous system",
      "Go for a walk to release pent-up energy",
      "Write down what's bothering you in your journal",
      "Practice progressive muscle relaxation",
      "Use our sound therapy with calming nature sounds"
    ]
  },
  blue: {
    title: "Sad/Depressed",
    suggestions: [
      "Reach out to a trusted friend or family member",
      "Engage in gentle physical activity like stretching",
      "Write down three small things you're grateful for",
      "Try our guided meditation for emotional support",
      "Remember that feelings are temporary and will pass"
    ]
  },
  green: {
    title: "Calm/Peaceful",
    suggestions: [
      "Enjoy this moment of peace with mindful breathing",
      "Consider journaling about what's contributing to this feeling",
      "Try a gratitude practice to enhance positive emotions",
      "Engage in a creative activity you enjoy",
      "Share this calm energy with someone else"
    ]
  },
  yellow: {
    title: "Happy/Joyful",
    suggestions: [
      "Savor this positive emotion and what's creating it",
      "Share your joy with someone else",
      "Engage in an activity that brings you pleasure",
      "Document this moment in your journal",
      "Express gratitude for this positive experience"
    ]
  },
  purple: {
    title: "Anxious/Stressed",
    suggestions: [
      "Try the 4-7-8 breathing exercise to calm your mind",
      "Use our guided meditation for anxiety relief",
      "Write down your worries to get them out of your head",
      "Practice grounding techniques (name 5 things you can see, 4 you can touch, etc.)",
      "Break tasks into smaller, manageable steps"
    ]
  },
  gray: {
    title: "Tired/Exhausted",
    suggestions: [
      "Prioritize rest and allow yourself to recharge",
      "Try a short 10-20 minute power nap",
      "Hydrate and have a nutritious snack",
      "Engage in gentle movement like stretching",
      "Practice self-compassion - it's okay to need rest"
    ]
  }
};

// Initialize the app
function init() {
  // Set up event listeners
  setupEventListeners();
  
  // Load saved data
  loadJournalEntries();
  loadGratitudeNotes();
  
  // Set initial UI states
  updateThemeIcon();
  showRandomTip();
  startAffirmationSlider();
  
  // Check for PWA install prompt
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  
  // Check if app is running as PWA
  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('Running as PWA');
  }
}

// Set up all event listeners
function setupEventListeners() {
  // Theme toggle
  themeToggle.addEventListener('click', toggleTheme);
  
  // Chat functionality
  sendBtn.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
  
  // Quiz functionality
  startQuizBtn.addEventListener('click', startQuiz);
  prevQuestionBtn.addEventListener('click', showPreviousQuestion);
  nextQuestionBtn.addEventListener('click', showNextQuestion);
  retakeQuizBtn.addEventListener('click', resetQuiz);
  
  // Journal functionality
  saveEntryBtn.addEventListener('click', saveJournalEntry);
  clearEntryBtn.addEventListener('click', clearJournalEntry);
  
  // Gratitude wall
  addGratitudeBtn.addEventListener('click', addGratitudeNote);
  gratitudeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addGratitudeNote();
  });
  
  // Daily tip
  newTipBtn.addEventListener('click', showRandomTip);
  
  // PWA install prompt
  installBtn.addEventListener('click', installPWA);
  dismissPromptBtn.addEventListener('click', dismissInstallPrompt);
  
  // Mobile menu toggle
  menuToggle.addEventListener('click', toggleMobileMenu);
  
  // Wellness tools
  // Breathing exercise
  startBreathingBtn.addEventListener('click', startBreathingExercise);
  stopBreathingBtn.addEventListener('click', stopBreathingExercise);
  
  // Sound therapy
  soundBtns.forEach(btn => {
    btn.addEventListener('click', toggleSound);
  });
  volumeControl.addEventListener('input', adjustVolume);
  
  // Pomodoro timer
  startTimerBtn.addEventListener('click', startTimer);
  pauseTimerBtn.addEventListener('click', pauseTimer);
  resetTimerBtn.addEventListener('click', resetTimer);
  workDurationInput.addEventListener('change', updateTimerSettings);
  breakDurationInput.addEventListener('change', updateTimerSettings);
  
  // Meditation timer
  document.querySelectorAll('.meditation-timer .timer-buttons button').forEach(btn => {
    btn.addEventListener('click', setMeditationTimer);
  });
  startMeditationBtn.addEventListener('click', startMeditationTimer);
  stopMeditationBtn.addEventListener('click', stopMeditationTimer);
  
  // Mood check
  colorOptions.forEach(option => {
    option.addEventListener('click', selectMood);
  });
  
  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.addEventListener('click', switchTab);
  });
}

// Theme functionality
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', currentTheme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const icon = themeToggle.querySelector('i');
  if (currentTheme === 'dark') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

// Chat functionality
function sendMessage() {
  const message = userInput.value.trim();
  if (message === '') return;
  
  // Add user message to chat
  addMessage(message, 'user');
  userInput.value = '';
  
  // Simulate AI typing
  setTimeout(() => {
    const aiResponse = generateAIResponse(message);
    addMessage(aiResponse, 'ai');
  }, 1000);
}

function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', `${sender}-message`);
  
  const messageText = document.createElement('p');
  messageText.textContent = text;
  
  messageDiv.appendChild(messageText);
  chatMessages.appendChild(messageDiv);
  
  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for greetings
  if (/hello|hi|hey/.test(lowerMessage)) {
    return getRandomResponse(aiResponses.greeting);
  }
  
  // Check for positive sentiment
  if (/good|great|happy|joy|excit|wonderful|fantastic|amazing/.test(lowerMessage)) {
    return getRandomResponse(aiResponses.positive);
  }
  
  // Check for negative sentiment
  if (/bad|sad|depress|anxious|stress|worr|angry|mad|frustrat|terrible|awful/.test(lowerMessage)) {
    return getRandomResponse(aiResponses.negative);
  }
  
  // Check for neutral sentiment
  if (/okay|fine|meh|alright|whatever/.test(lowerMessage)) {
    return getRandomResponse(aiResponses.neutral);
  }
  
  // Check for goodbye
  if (/bye|goodbye|see you|later|farewell/.test(lowerMessage)) {
    return getRandomResponse(aiResponses.goodbye);
  }
  
  // Default response
  return Math.random() > 0.7 ? getRandomResponse(aiResponses.resources) : getRandomResponse(aiResponses.general);
}

function getRandomResponse(responses) {
  return responses[Math.floor(Math.random() * responses.length)];
}

// Quiz functionality
function startQuiz() {
  quizIntro.style.display = 'none';
  quizQuestions.style.display = 'block';
  document.querySelector(`.question[data-question="1"]`).classList.add('active');
  updateQuizNavigation();
}

function showPreviousQuestion() {
  document.querySelector(`.question[data-question="${currentQuestion}"]`).classList.remove('active');
  currentQuestion--;
  document.querySelector(`.question[data-question="${currentQuestion}"]`).classList.add('active');
  updateQuizNavigation();
}

function showNextQuestion() {
  // Save answer if selected
  const selectedOption = document.querySelector(`.question[data-question="${currentQuestion}"] .option-btn.selected`);
  if (selectedOption) {
    quizAnswers[currentQuestion - 1] = parseInt(selectedOption.dataset.value);
  } else if (quizAnswers[currentQuestion - 1] === undefined) {
    // If no answer selected and no previous answer, default to 0
    quizAnswers[currentQuestion - 1] = 0;
  }
  
  // Move to next question or show results
  if (currentQuestion < 5) {
    document.querySelector(`.question[data-question="${currentQuestion}"]`).classList.remove('active');
    currentQuestion++;
    document.querySelector(`.question[data-question="${currentQuestion}"]`).classList.add('active');
  } else {
    showQuizResults();
  }
  
  updateQuizNavigation();
}

function updateQuizNavigation() {
  // Update question counter
  questionCounter.textContent = `${currentQuestion}/5`;
  
  // Update button states
  prevQuestionBtn.disabled = currentQuestion === 1;
  nextQuestionBtn.textContent = currentQuestion === 5 ? 'See Results' : 'Next';
  
  // Highlight selected option if returning to question
  if (quizAnswers[currentQuestion - 1] !== undefined) {
    const options = document.querySelectorAll(`.question[data-question="${currentQuestion}"] .option-btn`);
    options.forEach(option => {
      if (parseInt(option.dataset.value) === quizAnswers[currentQuestion - 1]) {
        option.classList.add('selected');
      }
    });
  }
  
  // Add event listeners to options
  const currentOptions = document.querySelectorAll(`.question[data-question="${currentQuestion}"] .option-btn`);
  currentOptions.forEach(option => {
    option.addEventListener('click', selectOption);
  });
}

function selectOption(e) {
  // Remove selected class from all options
  const options = document.querySelectorAll(`.question[data-question="${currentQuestion}"] .option-btn`);
  options.forEach(option => option.classList.remove('selected'));
  
  // Add selected class to clicked option
  e.target.classList.add('selected');
}

function showQuizResults() {
  // Calculate total score
  const totalScore = quizAnswers.reduce((sum, value) => sum + value, 0);
  
  // Display score
  document.getElementById('score').textContent = totalScore;
  
  // Show appropriate message based on score
  const resultMessage = document.getElementById('result-message');
  const suggestions = document.getElementById('result-suggestions');
  
  if (totalScore <= 4) {
    resultMessage.innerHTML = "<strong>Your mood seems generally positive.</strong> Keep up the good work with your self-care practices!";
    suggestions.innerHTML = `
      <p>Suggestions to maintain your wellbeing:</p>
      <ul>
        <li>Continue practicing gratitude and mindfulness</li>
        <li>Maintain your healthy routines</li>
        <li>Consider helping others who might be struggling</li>
        <li>Explore new hobbies or activities that bring you joy</li>
      </ul>
    `;
  } else if (totalScore <= 9) {
    resultMessage.innerHTML = "<strong>You're experiencing some mild distress.</strong> This is common and there are things that can help.";
    suggestions.innerHTML = `
      <p>Suggestions to improve your mood:</p>
      <ul>
        <li>Try our breathing exercises or meditation tools</li>
        <li>Practice regular self-care activities</li>
        <li>Consider talking to a trusted friend about how you're feeling</li>
        <li>Use the journal feature to process your emotions</li>
      </ul>
    `;
  } else {
    resultMessage.innerHTML = "<strong>You're experiencing significant distress.</strong> Please consider reaching out for support.";
    suggestions.innerHTML = `
      <p>Suggestions for additional support:</p>
      <ul>
        <li>Contact a mental health professional</li>
        <li>Reach out to trusted friends or family members</li>
        <li>Consider using our crisis resources if needed</li>
        <li>Practice self-compassion - what you're feeling is valid</li>
      </ul>
      <p>Remember, our resources section has crisis hotlines if you need immediate support.</p>
    `;
  }
  
  // Show results
  quizQuestions.style.display = 'none';
  quizResults.style.display = 'block';
}

function resetQuiz() {
  currentQuestion = 1;
  quizAnswers = [];
  quizResults.style.display = 'none';
  quizQuestions.style.display = 'block';
  
  // Reset all options
  document.querySelectorAll('.option-btn').forEach(option => {
    option.classList.remove('selected');
  });
  
  // Show first question
  document.querySelectorAll('.question').forEach(question => {
    question.classList.remove('active');
  });
  document.querySelector(`.question[data-question="1"]`).classList.add('active');
  
  updateQuizNavigation();
}

// Journal functionality
function saveJournalEntry() {
  const text = journalText.value.trim();
  if (text === '') {
    alert('Please write something before saving.');
    return;
  }
  
  const entry = {
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    text: text
  };
  
  journalEntries.unshift(entry); // Add to beginning of array
  localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
  
  // Update UI
  loadJournalEntries();
  journalText.value = '';
  
  // Show confirmation
  alert('Entry saved successfully!');
}

function clearJournalEntry() {
  if (journalText.value.trim() !== '' && !confirm('Are you sure you want to clear this entry?')) {
    return;
  }
  journalText.value = '';
}

function loadJournalEntries() {
  entriesList.innerHTML = '';
  
  if (journalEntries.length === 0) {
    entriesList.innerHTML = '<p>No entries yet. Start journaling above!</p>';
    return;
  }
  
  journalEntries.forEach(entry => {
    const entryElement = document.createElement('div');
    entryElement.classList.add('journal-entry-item');
    
    const dateElement = document.createElement('div');
    dateElement.classList.add('entry-date');
    dateElement.textContent = `${entry.date} at ${entry.time}`;
    
    const previewElement = document.createElement('div');
    previewElement.classList.add('entry-preview');
    previewElement.textContent = entry.text.length > 100 ? entry.text.substring(0, 100) + '...' : entry.text;
    
    entryElement.appendChild(dateElement);
    entryElement.appendChild(previewElement);
    
    // Add click to view full entry
    entryElement.addEventListener('click', () => {
      if (confirm(`View this entry from ${entry.date}?\n\n"${entry.text}"\n\nWould you like to delete it?`)) {
        deleteJournalEntry(entry);
      }
    });
    
    entriesList.appendChild(entryElement);
  });
}

function deleteJournalEntry(entry) {
  journalEntries = journalEntries.filter(e => 
    e.date !== entry.date || e.time !== entry.time || e.text !== entry.text
  );
  localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
  loadJournalEntries();
}

// Gratitude wall
function addGratitudeNote() {
  const note = gratitudeInput.value.trim();
  if (note === '') return;
  
  gratitudeNotes.unshift({
    text: note,
    date: new Date().toLocaleDateString()
  });
  
  localStorage.setItem('gratitudeNotes', JSON.stringify(gratitudeNotes));
  gratitudeInput.value = '';
  loadGratitudeNotes();
}

function loadGratitudeNotes() {
  gratitudeWall.innerHTML = '';
  
  if (gratitudeNotes.length === 0) {
    gratitudeWall.innerHTML = '<p>Add your first gratitude note above!</p>';
    return;
  }
  
  gratitudeNotes.forEach(note => {
    const noteElement = document.createElement('div');
    noteElement.classList.add('gratitude-note');
    noteElement.innerHTML = `
      <p>${note.text}</p>
      <small>${note.date}</small>
    `;
    
    // Add delete on long press
    noteElement.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (confirm('Delete this gratitude note?')) {
        gratitudeNotes = gratitudeNotes.filter(n => n.text !== note.text || n.date !== note.date);
        localStorage.setItem('gratitudeNotes', JSON.stringify(gratitudeNotes));
        loadGratitudeNotes();
      }
    });
    
    gratitudeWall.appendChild(noteElement);
  });
}

// Daily tips
function showRandomTip() {
  dailyTip.textContent = tips[Math.floor(Math.random() * tips.length)];
}

// Affirmations slider
function startAffirmationSlider() {
  const affirmations = document.querySelectorAll('.affirmation');
  let currentIndex = 0;
  
  // Show first affirmation
  affirmations[currentIndex].classList.add('active');
  
  // Rotate affirmations every 8 seconds
  setInterval(() => {
    affirmations[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % affirmations.length;
    affirmations[currentIndex].classList.add('active');
  }, 8000);
}

// PWA functionality
function handleBeforeInstallPrompt(e) {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  // Show the install prompt
  installPrompt.style.display = 'block';
}

function installPWA() {
  if (!deferredPrompt) return;
  
  // Show the install prompt
  deferredPrompt.prompt();
  
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    // Reset the deferred prompt variable
    deferredPrompt = null;
    // Hide the install prompt
    installPrompt.style.display = 'none';
  });
}

function dismissInstallPrompt() {
  installPrompt.style.display = 'none';
}

// Mobile menu
function toggleMobileMenu() {
  navLinks.classList.toggle('active');
  menuToggle.innerHTML = navLinks.classList.contains('active') ? 
    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
}

// Wellness Tools
// Breathing exercise
function startBreathingExercise() {
  startBreathingBtn.disabled = true;
  stopBreathingBtn.disabled = false;
  
  let cycle = 0;
  const totalCycles = 4;
  
  breathText.textContent = 'Breathe In';
  breathingCircle.style.transform = 'scale(1)';
  
  breathingInterval = setInterval(() => {
    cycle++;
    
    if (cycle > totalCycles * 2) {
      stopBreathingExercise();
      return;
    }
    
    if (cycle % 2 === 1) {
      // Inhale phase
      breathText.textContent = 'Breathe In';
      breathingCircle.style.transform = 'scale(1)';
      setTimeout(() => {
        breathText.textContent = 'Hold';
      }, 4000);
    } else {
      // Exhale phase
      breathText.textContent = 'Breathe Out';
      breathingCircle.style.transform = 'scale(0.5)';
    }
  }, 15000); // Total cycle time (4s in, 7s hold, 8s out)
}

function stopBreathingExercise() {
  clearInterval(breathingInterval);
  breathText.textContent = 'Ready';
  breathingCircle.style.transform = 'scale(0.5)';
  startBreathingBtn.disabled = false;
  stopBreathingBtn.disabled = true;
}

// Sound therapy
function toggleSound(e) {
  const soundBtn = e.currentTarget;
  const soundOption = soundBtn.closest('.sound-option');
  const audio = soundOption.querySelector('audio');
  
  // Stop any currently playing sound
  if (currentSound && currentSound !== audio) {
    currentSound.pause();
    currentSound.currentTime = 0;
    const currentBtn = document.querySelector(`.sound-btn[data-sound="${currentSound.dataset.sound}"]`);
    currentBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
  
  if (audio.paused) {
    audio.play();
    audio.volume = volumeControl.value;
    soundBtn.innerHTML = '<i class="fas fa-pause"></i>';
    currentSound = audio;
  } else {
    audio.pause();
    audio.currentTime = 0;
    soundBtn.innerHTML = '<i class="fas fa-play"></i>';
    currentSound = null;
  }
}

function adjustVolume() {
  if (currentSound) {
    currentSound.volume = volumeControl.value;
  }
}

// Pomodoro timer
function startTimer() {
  if (isRunning) return;
  
  isRunning = true;
  startTimerBtn.disabled = true;
  pauseTimerBtn.disabled = false;
  
  timerInterval = setInterval(updateTimer, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  startTimerBtn.disabled = false;
  pauseTimerBtn.disabled = true;
}

function resetTimer() {
  pauseTimer();
  isWorking = true;
  modeDisplay.textContent = 'Work';
  timeLeft = parseInt(workDurationInput.value) * 60;
  updateTimerDisplay();
}

function updateTimer() {
  timeLeft--;
  
  if (timeLeft <= 0) {
    // Switch mode
    isWorking = !isWorking;
    modeDisplay.textContent = isWorking ? 'Work' : 'Break';
    timeLeft = (isWorking ? parseInt(workDurationInput.value) : parseInt(breakDurationInput.value)) * 60;
    
    // Play notification sound
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
    audio.volume = 0.3;
    audio.play();
    
    // Show notification
    if (Notification.permission === 'granted') {
      new Notification(isWorking ? 'Break time is over!' : 'Time for a break!', {
        body: isWorking ? 'Get back to work!' : 'Take a few minutes to relax.',
        icon: 'https://i.pinimg.com/736x/b9/f7/b4/b9f7b4e8108b3be189ce87c8b867f10c.jpg'
      });
    }
  }
  
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  minutesDisplay.textContent = minutes.toString().padStart(2, '0');
  secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function updateTimerSettings() {
  if (!isRunning) {
    timeLeft = (isWorking ? parseInt(workDurationInput.value) : parseInt(breakDurationInput.value)) * 60;
    updateTimerDisplay();
  }
}

// Meditation timer
function setMeditationTimer(e) {
  const minutes = parseInt(e.currentTarget.dataset.minutes);
  customMinutes.value = minutes;
}

function startMeditationTimer() {
  const minutes = parseInt(customMinutes.value) || 5;
  let timeLeft = minutes * 60;
  
  startMeditationBtn.style.display = 'none';
  stopMeditationBtn.style.display = 'inline-block';
  
  updateMeditationDisplay(timeLeft);
  
  meditationInterval = setInterval(() => {
    timeLeft--;
    updateMeditationDisplay(timeLeft);
    
    if (timeLeft <= 0) {
      stopMeditationTimer();
      // Play completion sound
      const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-singing-bowl-meditation-1903.mp3');
      audio.volume = 0.3;
      audio.play();
    }
  }, 1000);
}

function stopMeditationTimer() {
  clearInterval(meditationInterval);
  startMeditationBtn.style.display = 'inline-block';
  stopMeditationBtn.style.display = 'none';
  meditationTime.textContent = '00:00';
}

function updateMeditationDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  meditationTime.textContent = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Mood check
function selectMood(e) {
  const color = e.currentTarget.dataset.color;
  const mood = moodSuggestions[color];
  
  // Update selected state
  colorOptions.forEach(option => {
    option.style.border = option === e.currentTarget ? '3px solid var(--primary-color)' : 'none';
  });
  
  // Show mood suggestions
  moodResult.innerHTML = `
    <h4>${mood.title}</h4>
    <p>Here are some suggestions that might help:</p>
    <ul>
      ${mood.suggestions.map(s => `<li>${s}</li>`).join('')}
    </ul>
  `;
}

// Tab switching
function switchTab(e) {
  const tabId = e.currentTarget.dataset.tab;
  
  // Update active tab button
  document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.classList.remove('active');
  });
  e.currentTarget.classList.add('active');
  
  // Show corresponding content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  document.getElementById(tabId).classList.add('active');
}

// Request notification permission
function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    currentTheme = 'dark';
  }
  
  init();
  requestNotificationPermission();
  
  // Initialize timer display
  updateTimerDisplay();
});