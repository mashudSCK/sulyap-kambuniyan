const socket = io();

// Screen elements
const landingScreen = document.getElementById('landing-screen');
const waitingScreen = document.getElementById('waiting-screen');
const chatScreen = document.getElementById('chat-screen');
const disconnectedScreen = document.getElementById('disconnected-screen');

// Button elements
const startBtn = document.getElementById('start-btn');
const cancelWaitingBtn = document.getElementById('cancel-waiting-btn');
const endChatBtn = document.getElementById('end-chat-btn');
const newChatBtn = document.getElementById('new-chat-btn');

// Message elements
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages-container');
const disconnectMessage = document.getElementById('disconnect-message');

// User info elements
const usernameInput = document.getElementById('username-input');
const onlineCountElement = document.getElementById('online-count');
const typingIndicator = document.getElementById('typing-indicator');
const yourNameText = document.getElementById('your-name-text');

// Modal elements
const exitModal = document.getElementById('exit-modal');
const modalStayBtn = document.getElementById('modal-stay-btn');
const modalEndBtn = document.getElementById('modal-end-btn');

// Reply functionality elements
const replyPreview = document.getElementById('reply-preview');
const replyMessageText = document.getElementById('reply-message-text');
const replyLabel = document.getElementById('reply-label');
const cancelReplyBtn = document.getElementById('cancel-reply-btn');

// Feedback elements
const feedbackBtn = document.getElementById('feedback-btn');
const feedbackModal = document.getElementById('feedback-modal');
const closeFeedbackBtn = document.getElementById('close-feedback-btn');
const starRating = document.getElementById('star-rating');
const stars = document.querySelectorAll('.star');
const feedbackText = document.getElementById('feedback-text');
const charCount = document.getElementById('char-count');
const submitFeedbackBtn = document.getElementById('submit-feedback-btn');
const thankyouModal = document.getElementById('thankyou-modal');

// Notification sound
const notificationSound = document.getElementById('notification-sound');

// NEW: Shout-out elements
const shoutoutForm = document.getElementById('shoutout-form');
const shoutoutInput = document.getElementById('shoutout-input');
const shoutoutCharCount = document.getElementById('shout-char-count');
const shoutsContainer = document.getElementById('shoutouts-container');

// State variables
let isInChat = false;
let typingTimeout = null;
let replyingToMessage = null;
let replyingToMessageId = null;
let selectedRating = 0;
let messageCounter = 0;
let shoutRefreshInterval = null;

// Get referral parameter from URL
const urlParams = new URLSearchParams(window.location.search);
const referralCode = urlParams.get('ref') || '';

// ================================
// SHOUT-OUT WALL FUNCTIONS
// ================================

// Load shout-outs from server
async function loadShoutouts() {
  try {
    const response = await fetch('/get_shouts.php');
    const data = await response.json();
    
    if (data.success && Array.isArray(data.shouts)) {
      displayShoutouts(data.shouts);
    } else {
      shoutsContainer.innerHTML = '<div class="no-shouts">Wala pang shout-outs. Maging una!</div>';
    }
  } catch (error) {
    console.error('Error loading shout-outs:', error);
    shoutsContainer.innerHTML = '<div class="loading-shouts">Error loading shout-outs</div>';
  }
}

// Display shout-outs
function displayShoutouts(shouts) {
  if (shouts.length === 0) {
    shoutsContainer.innerHTML = '<div class="no-shouts">Wala pang shout-outs. Maging una!</div>';
    return;
  }
  
  // Sort by timestamp, newest first
  const sortedShouts = shouts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  shoutsContainer.innerHTML = sortedShouts.map(shout => {
    const date = new Date(shout.timestamp);
    const timeAgo = getTimeAgo(date);
    
    return `
      <div class="shoutout-item">
        <div class="shoutout-text">${escapeHtml(shout.text)}</div>
        <div class="shoutout-meta">
          <span class="shoutout-icon">🌿</span>
          <span>${timeAgo}</span>
        </div>
      </div>
    `;
  }).join('');
}

// Get "time ago" string
function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

// Submit shout-out
async function submitShoutout(text) {
  try {
    const response = await fetch('/add_shout.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text })
    });
    
    const data = await response.json();
    
    if (data.success) {
      shoutoutInput.value = '';
      shoutoutCharCount.textContent = '0';
      loadShoutouts(); // Reload to show new shout
      
      // Show success feedback
      showShoutoutSuccess();
    } else {
      alert(data.message || 'Error posting shout-out');
    }
  } catch (error) {
    console.error('Error submitting shout-out:', error);
    alert('Error posting shout-out. Please try again.');
  }
}

// Show success animation
function showShoutoutSuccess() {
  const btn = shoutoutForm.querySelector('.btn-shout');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<span>✓ Posted!</span>';
  btn.style.background = 'linear-gradient(135deg, #0B6E4F, #0E8F65)';
  
  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.style.background = '';
  }, 2000);
}

// Shout-out form submission
shoutoutForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = shoutoutInput.value.trim();
  
  if (text.length === 0) {
    alert('Please enter a message');
    return;
  }
  
  if (text.length > 200) {
    alert('Message is too long (max 200 characters)');
    return;
  }
  
  submitShoutout(text);
});

// Character counter for shout-out
shoutoutInput.addEventListener('input', () => {
  const length = shoutoutInput.value.length;
  shoutoutCharCount.textContent = length;
  
  // Change color when approaching limit
  if (length > 180) {
    shoutoutCharCount.style.color = '#C44536';
  } else if (length > 150) {
    shoutoutCharCount.style.color = '#F2C94C';
  } else {
    shoutoutCharCount.style.color = '';
  }
});

// Auto-refresh shout-outs every 10 seconds
function startShoutoutRefresh() {
  if (shoutRefreshInterval) {
    clearInterval(shoutRefreshInterval);
  }
  shoutRefreshInterval = setInterval(() => {
    loadShoutouts();
  }, 10000); // 10 seconds
}

// Stop auto-refresh
function stopShoutoutRefresh() {
  if (shoutRefreshInterval) {
    clearInterval(shoutRefreshInterval);
    shoutRefreshInterval = null;
  }
}

// ================================
// CORE CHAT FUNCTIONS
// ================================

function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
  
  if (screen === chatScreen) {
    messageInput.focus();
    stopShoutoutRefresh(); // Stop refreshing when in chat
  } else if (screen === landingScreen) {
    loadShoutouts(); // Load when returning to landing
    startShoutoutRefresh(); // Start auto-refresh
  } else {
    stopShoutoutRefresh();
  }
}

function addMessage(text, type = 'received', messageId = null, replyData = null) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  
  if (!messageId) {
    messageId = `msg-${Date.now()}-${messageCounter++}`;
  }
  messageDiv.dataset.messageId = messageId;
  
  const bubbleDiv = document.createElement('div');
  bubbleDiv.className = 'message-bubble';
  
  if (replyData) {
    bubbleDiv.classList.add('with-reply');
    
    const replyQuote = document.createElement('div');
    replyQuote.className = 'reply-quote';
    replyQuote.dataset.originalMessageId = replyData.originalMessageId;
    
    replyQuote.innerHTML = `
      <div class="reply-quote-icon">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M3.5 8H12.5M3.5 8L7 4.5M3.5 8L7 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="reply-quote-content">
        <div class="reply-quote-label">Replied to</div>
        <div class="reply-quote-text">${escapeHtml(replyData.originalText)}</div>
      </div>
    `;
    
    replyQuote.addEventListener('click', (e) => {
      e.stopPropagation();
      scrollToOriginalMessage(replyData.originalMessageId);
    });
    
    bubbleDiv.appendChild(replyQuote);
  }
  
  const messageText = document.createElement('div');
  messageText.className = 'message-text';
  messageText.textContent = text;
  bubbleDiv.appendChild(messageText);
  
  if (type === 'received') {
    bubbleDiv.addEventListener('click', () => {
      if (isInChat) {
        setReplyMessage(text, messageId);
        bubbleDiv.classList.add('replying');
        setTimeout(() => bubbleDiv.classList.remove('replying'), 300);
      }
    });
  }
  
  messageDiv.appendChild(bubbleDiv);
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  return messageDiv;
}

function scrollToOriginalMessage(messageId) {
  const originalMessage = document.querySelector(`[data-message-id="${messageId}"]`);
  if (originalMessage) {
    originalMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const bubble = originalMessage.querySelector('.message-bubble');
    if (bubble) {
      bubble.classList.add('highlight');
      setTimeout(() => bubble.classList.remove('highlight'), 1000);
    }
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function addSystemMessage(text) {
  const systemDiv = document.createElement('div');
  systemDiv.className = 'system-message';
  systemDiv.innerHTML = `<p>${text}</p>`;
  messagesContainer.appendChild(systemDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function clearMessages() {
  messagesContainer.innerHTML = '';
}

function setReplyMessage(message, messageId) {
  replyingToMessage = message;
  replyingToMessageId = messageId;
  replyMessageText.textContent = message;
  replyLabel.textContent = 'Replying to';
  replyPreview.style.display = 'flex';
  messageInput.focus();
}

function clearReplyMessage() {
  replyingToMessage = null;
  replyingToMessageId = null;
  replyPreview.style.display = 'none';
}

function playNotificationSound() {
  notificationSound.volume = 0.4;
  notificationSound.currentTime = 0;
  notificationSound.play().catch(err => {
    console.log('Could not play notification sound:', err);
  });
}

// ================================
// EVENT LISTENERS
// ================================

startBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim() || 'Stranger';
  socket.emit('start-chat', { username });
  showScreen(waitingScreen);
});

cancelWaitingBtn.addEventListener('click', () => {
  socket.emit('end-chat');
  showScreen(landingScreen);
});

endChatBtn.addEventListener('click', () => {
  showExitModal();
});

modalStayBtn.addEventListener('click', () => {
  hideExitModal();
});

modalEndBtn.addEventListener('click', () => {
  hideExitModal();
  socket.emit('end-chat');
  isInChat = false;
  disconnectMessage.textContent = 'Natapos mo ang chat.';
  showScreen(disconnectedScreen);
});

newChatBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim() || 'Stranger';
  socket.emit('start-chat', { username });
  showScreen(waitingScreen);
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (message && isInChat) {
    let replyData = null;
    if (replyingToMessage && replyingToMessageId) {
      replyData = {
        originalText: replyingToMessage,
        originalMessageId: replyingToMessageId
      };
    }
    
    addMessage(message, 'sent', null, replyData);
    
    const messageData = {
      message: message,
      replyTo: replyData ? {
        text: replyingToMessage,
        messageId: replyingToMessageId
      } : null
    };
    
    socket.emit('send-message', messageData);
    messageInput.value = '';
    clearReplyMessage();
    messageInput.focus();
    socket.emit('stop-typing');
  }
});

// Typing indicator
let typingTimer;
messageInput.addEventListener('input', () => {
  if (!isInChat) return;
  
  socket.emit('typing');
  
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    socket.emit('stop-typing');
  }, 1000);
});

cancelReplyBtn.addEventListener('click', clearReplyMessage);

// ================================
// SOCKET EVENT HANDLERS
// ================================

socket.on('waiting', (data) => {
  showScreen(waitingScreen);
});

socket.on('chat-start', (data) => {
  isInChat = true;
  clearMessages();
  clearReplyMessage();
  messageCounter = 0;
  showScreen(chatScreen);
  
  yourNameText.textContent = `Nakikipag-usap ka kay ${data.partnerName}`;
  
  playNotificationSound();
  
  setTimeout(() => {
    addSystemMessage('🎉 Nakakonekta ka na! Simulan ang pag-uusap.');
  }, 300);
});

socket.on('receive-message', (data) => {
  if (isInChat) {
    let replyData = null;
    if (data.replyTo) {
      replyData = {
        originalText: data.replyTo.text,
        originalMessageId: data.replyTo.messageId
      };
    }
    addMessage(data.message, 'received', null, replyData);
  }
});

socket.on('partner-left', (data) => {
  isInChat = false;
  disconnectMessage.textContent = data.message;
  showScreen(disconnectedScreen);
});

socket.on('online-count', (data) => {
  onlineCountElement.textContent = data.count;
});

socket.on('partner-typing', () => {
  if (typingIndicator) {
    typingIndicator.style.display = 'block';
  }
});

socket.on('partner-stop-typing', () => {
  if (typingIndicator) {
    typingIndicator.style.display = 'none';
  }
});

socket.on('disconnect', (reason) => {
  if (isInChat) {
    isInChat = false;
    disconnectMessage.textContent = 'Nawala ang koneksyon. I-check ang internet.';
    showScreen(disconnectedScreen);
  }
});

// ================================
// FEEDBACK MODAL
// ================================

feedbackBtn.addEventListener('click', () => {
  feedbackModal.classList.add('active');
  selectedRating = 0;
  feedbackText.value = '';
  charCount.textContent = '0';
  stars.forEach(star => star.classList.remove('active'));
});

closeFeedbackBtn.addEventListener('click', () => {
  feedbackModal.classList.remove('active');
});

stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.dataset.rating);
    stars.forEach((s, index) => {
      if (index < selectedRating) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });
  });
  
  star.addEventListener('mouseenter', () => {
    const rating = parseInt(star.dataset.rating);
    stars.forEach((s, index) => {
      if (index < rating) {
        s.style.filter = 'grayscale(0%)';
        s.style.opacity = '1';
      }
    });
  });
  
  star.addEventListener('mouseleave', () => {
    stars.forEach((s, index) => {
      if (index >= selectedRating) {
        s.style.filter = 'grayscale(100%)';
        s.style.opacity = '0.4';
      }
    });
  });
});

feedbackText.addEventListener('input', () => {
  charCount.textContent = feedbackText.value.length;
});

submitFeedbackBtn.addEventListener('click', () => {
  if (selectedRating === 0) {
    alert('Pumili ng rating bago mag-submit.');
    return;
  }
  
  const feedbackData = {
    rating: selectedRating,
    comment: feedbackText.value.trim(),
    timestamp: new Date().toISOString(),
    referralCode: referralCode
  };
  
  socket.emit('submit-feedback', feedbackData);
  
  feedbackModal.classList.remove('active');
  thankyouModal.classList.add('active');
  
  setTimeout(() => {
    thankyouModal.classList.remove('active');
  }, 3000);
});

// ================================
// MODAL HELPERS
// ================================

function showExitModal() {
  exitModal.classList.add('active');
}

function hideExitModal() {
  exitModal.classList.remove('active');
}

exitModal.addEventListener('click', (e) => {
  if (e.target === exitModal) {
    hideExitModal();
  }
});

feedbackModal.addEventListener('click', (e) => {
  if (e.target === feedbackModal) {
    feedbackModal.classList.remove('active');
  }
});

thankyouModal.addEventListener('click', (e) => {
  if (e.target === thankyouModal) {
    thankyouModal.classList.remove('active');
  }
});

window.addEventListener('beforeunload', (e) => {
  if (isInChat) {
    e.preventDefault();
    e.returnValue = 'Nasa aktibong chat ka. Sigurado kang aalis?';
    return e.returnValue;
  }
});

// ================================
// INITIALIZATION
// ================================

// Load shout-outs on page load
loadShoutouts();
startShoutoutRefresh();

console.log('🌿 Sulyap: Kambuniyan Edition initialized');
console.log('🎉 SKSU Kambuniyan Week 2025');
console.log('📣 Shout-out wall: ACTIVE');
