// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const journalText = document.getElementById('journal-text');
const saveEntryBtn = document.getElementById('save-entry');
const clearEntryBtn = document.getElementById('clear-entry');
const entriesList = document.getElementById('entries-list');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const startBreathingBtn = document.getElementById('start-breathing');
const stopBreathingBtn = document.getElementById('stop-breathing');
const breathingCircle = document.querySelector('.breathing-circle .circle');
const breathText = document.querySelector('.breath-text');
const soundBtns = document.querySelectorAll('.sound-btn');
const volumeControl = document.getElementById('volume');

// Global Variables
let breathingInterval;
let currentSound = null;
let isBreathingActive = false;
const aiResponses = [
    "I hear you. Would you like to talk more about that?",
    "That sounds challenging. How has this been affecting you?",
    "Thank you for sharing that with me. I'm here to listen.",
    "I can understand why you'd feel that way. What do you think might help?",
    "Your feelings are valid. Would you like to explore some coping strategies?",
    "It takes courage to talk about these things. How can I support you right now?",
    "I'm here for you. What's been the hardest part about this?",
    "That sounds really difficult. Have you noticed any patterns in how you're feeling?",
    "I appreciate you opening up. What would be most helpful for you right now?",
    "You're not alone in this. Would you like to try a relaxation exercise?"
];

// Initialize the app
function init() {
    // Load journal entries from local storage
    loadJournalEntries();
    
    // Set up event listeners
    setupEventListeners();
}

// Set up all event listeners
function setupEventListeners() {
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Chat functionality
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Journal functionality
    saveEntryBtn.addEventListener('click', saveJournalEntry);
    clearEntryBtn.addEventListener('click', clearJournalEntry);

    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            switchTab(tabId, btn);
        });
    });

    // Breathing exercise
    startBreathingBtn.addEventListener('click', startBreathingExercise);
    stopBreathingBtn.addEventListener('click', stopBreathingExercise);

    // Sound therapy
    soundBtns.forEach(btn => {
        btn.addEventListener('click', () => toggleSound(btn));
    });

    // Volume control
    volumeControl.addEventListener('input', adjustVolume);
}

// Chat Functions
function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    // Add user message to chat
    addMessage(message, 'user');

    // Clear input
    userInput.value = '';

    // Simulate AI typing
    setTimeout(() => {
        simulateTyping();
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

function simulateTyping() {
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('message', 'ai-message', 'typing');
    
    const dots = document.createElement('div');
    dots.classList.add('typing-dots');
    dots.innerHTML = '<span></span><span></span><span></span>';
    
    typingIndicator.appendChild(dots);
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate AI response after delay
    setTimeout(() => {
        // Remove typing indicator
        chatMessages.removeChild(typingIndicator);
        
        // Get random AI response
        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        addMessage(randomResponse, 'ai');
    }, 1500 + Math.random() * 2000);
}

// Journal Functions
function saveJournalEntry() {
    const entryText = journalText.value.trim();
    if (entryText === '') {
        alert('Please write something before saving.');
        return;
    }

    const entry = {
        text: entryText,
        date: new Date().toISOString()
    };

    // Get existing entries or initialize empty array
    let entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    
    // Add new entry
    entries.unshift(entry);
    
    // Save to local storage
    localStorage.setItem('journalEntries', JSON.stringify(entries));
    
    // Reload entries
    loadJournalEntries();
    
    // Clear textarea
    journalText.value = '';
    
    // Show success message
    alert('Entry saved successfully!');
}

function clearJournalEntry() {
    if (journalText.value.trim() !== '' && !confirm('Are you sure you want to clear this entry?')) {
        return;
    }
    journalText.value = '';
}

function loadJournalEntries() {
    const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    entriesList.innerHTML = '';

    if (entries.length === 0) {
        entriesList.innerHTML = '<p>No entries yet. Start journaling to see them here.</p>';
        return;
    }

    entries.forEach(entry => {
        const entryItem = document.createElement('div');
        entryItem.classList.add('entry-item');
        
        const entryDate = document.createElement('div');
        entryDate.classList.add('entry-date');
        entryDate.textContent = new Date(entry.date).toLocaleString();
        
        const entryPreview = document.createElement('div');
        entryPreview.classList.add('entry-preview');
        entryPreview.textContent = entry.text.length > 150 ? entry.text.substring(0, 150) + '...' : entry.text;
        
        entryItem.appendChild(entryDate);
        entryItem.appendChild(entryPreview);
        
        // Add click to view full entry
        entryItem.addEventListener('click', () => {
            if (confirm('Would you like to view this full entry?')) {
                alert(`Entry from ${new Date(entry.date).toLocaleString()}:\n\n${entry.text}`);
            }
        });
        
        entriesList.appendChild(entryItem);
    });
}

// Wellness Tools Functions
function switchTab(tabId, clickedBtn) {
    // Update active tab button
    tabBtns.forEach(btn => btn.classList.remove('active'));
    clickedBtn.classList.add('active');
    
    // Show corresponding content
    tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabId) {
            content.classList.add('active');
        }
    });
}

function startBreathingExercise() {
    if (isBreathingActive) return;
    isBreathingActive = true;
    
    let cycle = 0;
    const totalCycles = 3; // Number of complete 4-7-8 cycles
    
    // Disable start button
    startBreathingBtn.disabled = true;
    
    // Breathing animation
    breathingInterval = setInterval(() => {
        if (cycle >= totalCycles) {
            stopBreathingExercise();
            return;
        }
        
        // Breathe in (4 seconds)
        breathText.textContent = 'Breathe In';
        breathingCircle.style.transform = 'scale(1.2)';
        breathingCircle.style.backgroundColor = 'rgba(108, 99, 255, 0.3)';
        
        setTimeout(() => {
            // Hold (7 seconds)
            breathText.textContent = 'Hold';
            breathingCircle.style.transform = 'scale(1.1)';
            breathingCircle.style.backgroundColor = 'rgba(76, 175, 80, 0.3)';
            
            setTimeout(() => {
                // Breathe out (8 seconds)
                breathText.textContent = 'Breathe Out';
                breathingCircle.style.transform = 'scale(1)';
                breathingCircle.style.backgroundColor = 'rgba(255, 101, 132, 0.3)';
                
                setTimeout(() => {
                    // Rest between cycles
                    breathText.textContent = 'Rest';
                    breathingCircle.style.transform = 'scale(1)';
                    breathingCircle.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    cycle++;
                }, 8000);
            }, 7000);
        }, 4000);
    }, 19000); // Total cycle time (4+7+8)
}

function stopBreathingExercise() {
    clearInterval(breathingInterval);
    isBreathingActive = false;
    
    // Reset display
    breathText.textContent = 'Ready';
    breathingCircle.style.transform = 'scale(1)';
    breathingCircle.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    
    // Re-enable start button
    startBreathingBtn.disabled = false;
}

function toggleSound(btn) {
    const soundName = btn.getAttribute('data-sound');
    const soundElement = btn.parentElement.querySelector('audio');
    
    // If this sound is already playing, stop it
    if (currentSound === soundElement) {
        soundElement.pause();
        soundElement.currentTime = 0;
        currentSound = null;
        btn.innerHTML = '<i class="fas fa-play"></i>';
        return;
    }
    
    // Stop any currently playing sound
    if (currentSound) {
        currentSound.pause();
        currentSound.currentTime = 0;
        const currentBtn = document.querySelector(`.sound-btn[data-sound="${currentSound.parentElement.getAttribute('data-sound')}"]`);
        if (currentBtn) currentBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
    
    // Play the selected sound
    soundElement.volume = volumeControl.value;
    soundElement.loop = true;
    soundElement.play();
    currentSound = soundElement;
    btn.innerHTML = '<i class="fas fa-stop"></i>';
}

function adjustVolume() {
    if (currentSound) {
        currentSound.volume = volumeControl.value;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);



// Wellness Tools State
const wellnessApp = {
  breathing: {
    active: false,
    timeouts: [],
    currentCycle: 0,
    totalCycles: 3
  },
  sound: {
    currentElement: null,
    currentButton: null
  }
};

// Breathing Exercise Functions
function startBreathingExercise() {
  if (wellnessApp.breathing.active) return;
  
  wellnessApp.breathing.active = true;
  wellnessApp.breathing.currentCycle = 0;
  
  const breathingCircle = document.querySelector('.breathing-circle .circle');
  const breathText = document.querySelector('.breath-text');
  const startBtn = document.getElementById('start-breathing');
  const stopBtn = document.getElementById('stop-breathing');
  
  // Update button states
  if (startBtn) startBtn.disabled = true;
  if (stopBtn) stopBtn.disabled = false;
  
  function runBreathingCycle() {
    if (!wellnessApp.breathing.active || wellnessApp.breathing.currentCycle >= wellnessApp.breathing.totalCycles) {
      stopBreathingExercise();
      return;
    }
    
    // Breathe in (4 seconds)
    updateBreathingDisplay('Breathe In', 'scale(1.2)', 'rgba(108, 99, 255, 0.3)');
    
    wellnessApp.breathing.timeouts.push(setTimeout(() => {
      // Hold (7 seconds)
      updateBreathingDisplay('Hold', 'scale(1.1)', 'rgba(76, 175, 80, 0.3)');
      
      wellnessApp.breathing.timeouts.push(setTimeout(() => {
        // Breathe out (8 seconds)
        updateBreathingDisplay('Breathe Out', 'scale(1)', 'rgba(255, 101, 132, 0.3)');
        
        wellnessApp.breathing.timeouts.push(setTimeout(() => {
          // Rest between cycles
          updateBreathingDisplay('Rest', 'scale(1)', 'rgba(255, 255, 255, 0.2)');
          
          wellnessApp.breathing.currentCycle++;
          
          // Start next cycle if not finished
          if (wellnessApp.breathing.currentCycle < wellnessApp.breathing.totalCycles && 
              wellnessApp.breathing.active) {
            wellnessApp.breathing.timeouts.push(
              setTimeout(runBreathingCycle, 2000) // 2 second rest
            );
          } else {
            stopBreathingExercise();
          }
        }, 8000));
      }, 7000));
    }, 4000));
  }
  
  // Clear any existing timeouts
  clearBreathingTimeouts();
  
  // Start first cycle
  runBreathingCycle();
}

function updateBreathingDisplay(text, transform, bgColor) {
  const breathText = document.querySelector('.breath-text');
  const breathingCircle = document.querySelector('.breathing-circle .circle');
  
  if (breathText) breathText.textContent = text;
  if (breathingCircle) {
    breathingCircle.style.transform = transform;
    breathingCircle.style.backgroundColor = bgColor;
  }
}

function clearBreathingTimeouts() {
  wellnessApp.breathing.timeouts.forEach(timeout => clearTimeout(timeout));
  wellnessApp.breathing.timeouts = [];
}

function stopBreathingExercise() {
  wellnessApp.breathing.active = false;
  clearBreathingTimeouts();
  
  updateBreathingDisplay('Ready', 'scale(1)', 'rgba(255, 255, 255, 0.2)');
  
  const startBtn = document.getElementById('start-breathing');
  const stopBtn = document.getElementById('stop-breathing');
  
  if (startBtn) startBtn.disabled = false;
  if (stopBtn) stopBtn.disabled = true;
}

// Sound Therapy Functions
function toggleSound(clickedBtn) {
  if (!clickedBtn) return;

  const soundOption = clickedBtn.closest('.sound-option');
  if (!soundOption) return;

  const soundElement = soundOption.querySelector('audio');
  if (!soundElement) return;

  // If clicking the currently playing sound
  if (wellnessApp.sound.currentElement === soundElement) {
    stopCurrentSound();
    return;
  }

  // Stop any currently playing sound first
  if (wellnessApp.sound.currentElement) {
    stopCurrentSound();
  }

  // Play the new sound
  playSound(soundElement, clickedBtn);
}

function playSound(soundElement, button) {
  const volumeControl = document.getElementById('volume');
  soundElement.volume = volumeControl ? volumeControl.value : 0.5;
  soundElement.loop = true;

  const playPromise = soundElement.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        wellnessApp.sound.currentElement = soundElement;
        wellnessApp.sound.currentButton = button;
        
        if (button) {
          const icon = button.querySelector('i');
          if (icon) icon.className = 'fas fa-stop';
        }
      })
      .catch(error => {
        console.error("Audio playback failed:", error);
        showAudioError(soundElement.parentElement);
      });
  }
}

function stopCurrentSound() {
  if (wellnessApp.sound.currentElement) {
    wellnessApp.sound.currentElement.pause();
    wellnessApp.sound.currentElement.currentTime = 0;
    
    if (wellnessApp.sound.currentButton) {
      const icon = wellnessApp.sound.currentButton.querySelector('i');
      if (icon) icon.className = 'fas fa-play';
    }
    
    wellnessApp.sound.currentElement = null;
    wellnessApp.sound.currentButton = null;
  }
}

function adjustVolume() {
  if (wellnessApp.sound.currentElement) {
    const volumeControl = document.getElementById('volume');
    if (volumeControl) {
      wellnessApp.sound.currentElement.volume = volumeControl.value;
    }
  }
}

function showAudioError(container) {
  const existingError = container.querySelector('.sound-error');
  if (existingError) existingError.remove();

  const errorMsg = document.createElement('div');
  errorMsg.className = 'sound-error';
  errorMsg.textContent = "Please click anywhere on the page first to enable audio";
  errorMsg.style.cssText = `
    color: #ff4444;
    margin-top: 10px;
    font-size: 0.9em;
    padding: 5px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  `;
  
  container.appendChild(errorMsg);

  setTimeout(() => {
    if (errorMsg.parentNode === container) {
      container.removeChild(errorMsg);
    }
  }, 5000);
}

// Tab Switching Function
function switchTab(tabId, clickedBtn) {
  // Update active tab button
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
  });
  clickedBtn.classList.add('active');
  clickedBtn.setAttribute('aria-selected', 'true');
  
  // Show corresponding content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
    content.setAttribute('aria-hidden', 'true');
    if (content.id === tabId) {
      content.classList.add('active');
      content.setAttribute('aria-hidden', 'false');
    }
  });
}

// Initialize Wellness Tools
function setupWellnessTools() {
  // Breathing exercise
  const startBtn = document.getElementById('start-breathing');
  const stopBtn = document.getElementById('stop-breathing');
  
  if (startBtn) startBtn.addEventListener('click', startBreathingExercise);
  if (stopBtn) {
    stopBtn.addEventListener('click', stopBreathingExercise);
    stopBtn.disabled = true;
  }
  
  // Sound therapy
  document.querySelectorAll('.sound-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSound(btn);
    });
  });
  
  // Volume control
  const volumeControl = document.getElementById('volume');
  if (volumeControl) {
    volumeControl.addEventListener('input', adjustVolume);
  }
  
  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      switchTab(tabId, btn);
    });
  });
  
  // Initialize first tab
  const defaultTab = document.querySelector('.tab-btn.active');
  if (defaultTab) {
    switchTab(defaultTab.getAttribute('data-tab'), defaultTab);
  }
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', setupWellnessTools);