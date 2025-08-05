// Quiz Data
const quizData = {
  english: [
    {
      name: "Dragon Ball",
      picture: "images/dragon-ball-z-goku.gif",
      japaneseName: "ドラゴンボール"
    },
    {
      name: "Attack On Titan",
      picture: "images/AttackonTitanFinal.jpg",
      japaneseName: "進撃の巨人"
    },
    {
      name: "Naruto",
      picture: "https://res.cloudinary.com/jerrick/image/upload/v1616592065/605b3cc118e784001e22da0d.jpg",
      japaneseName: "ナルト"
    },
    {
      name: "Demon Slayer",
      picture: "https://cdn.vox-cdn.com/thumbor/gcVHhhZ4VwVswvbDPvI-RfQ7ECQ=/1400x1050/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/19721018/Tanjiro__Demon_Slayer_.png",
      japaneseName: "鬼滅の刃"
    },
    {
      name: "Ghost in the Shell",
      picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8VBbI5HMki5cmjP_Gq0TdyA6VZn_0_fmkhg&usqp=CAU",
      japaneseName: "攻殻機動隊"
    }
  ]
};

// DOM Elements
const welcomeScreen = document.getElementById('welcomeScreen');
const quizScreen = document.getElementById('quizScreen');
const resultsScreen = document.getElementById('resultsScreen');
const usernameInput = document.getElementById('usernameInput');
const languageSelect = document.getElementById('languageSelect');
const startBtn = document.getElementById('startBtn');
const quizImage = document.getElementById('quizImage');
const optionsContainer = document.getElementById('optionsContainer');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const timerCircle = document.getElementById('timerCircle');
const timerValue = document.getElementById('timerValue');
const resultsTitle = document.getElementById('resultsTitle');
const scoreText = document.getElementById('scoreText');
const scoreValue = document.getElementById('scoreValue');
const scoreCircle = document.getElementById('scoreCircle');
const scorePercentage = document.getElementById('scorePercentage');
const characterGif = document.getElementById('characterGif');
const restartBtn = document.getElementById('restartBtn');

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;
let selectedLanguage = 'english';
let username = '';
let quizQuestions = [];

// Initialize the app
function init() {
  // Event Listeners
  usernameInput.addEventListener('input', validateInputs);
  languageSelect.addEventListener('change', validateInputs);
  startBtn.addEventListener('click', startQuiz);
  restartBtn.addEventListener('click', restartQuiz);
  
  // Disable start button initially
  startBtn.disabled = true;
}

// Validate inputs to enable start button
function validateInputs() {
  username = usernameInput.value.trim();
  selectedLanguage = languageSelect.value;
  
  startBtn.disabled = !(username && selectedLanguage);
}

// Start the quiz
function startQuiz() {
  username = usernameInput.value.trim();
  selectedLanguage = languageSelect.value;
  
  // Prepare quiz questions
  quizQuestions = [...quizData.english];
  shuffleArray(quizQuestions);
  
  // Show quiz screen
  welcomeScreen.style.display = 'none';
  quizScreen.style.display = 'block';
  
  // Load first question
  loadQuestion();
}

// Load a question
function loadQuestion() {
  resetTimer();
  startTimer();
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  // Update progress
  progressBar.style.width = `${(currentQuestionIndex / quizQuestions.length) * 100}%`;
  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
  
  // Set image
  quizImage.src = currentQuestion.picture;
  quizImage.alt = `Image from ${currentQuestion.name}`;
  
  // Prepare options
  const correctAnswer = selectedLanguage === 'english' ? currentQuestion.name : currentQuestion.japaneseName;
  let options = [correctAnswer];
  
  // Get 3 other random options
  const otherQuestions = quizQuestions.filter((_, index) => index !== currentQuestionIndex);
  shuffleArray(otherQuestions);
  
  for (let i = 0; i < 3 && i < otherQuestions.length; i++) {
    const option = selectedLanguage === 'english' 
      ? otherQuestions[i].name 
      : otherQuestions[i].japaneseName;
    options.push(option);
  }
  
  // Shuffle options
  shuffleArray(options);
  
  // Display options
  optionsContainer.innerHTML = '';
  options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.className = 'option-btn';
    button.addEventListener('click', () => selectAnswer(option, correctAnswer));
    optionsContainer.appendChild(button);
  });
}

// Select an answer
function selectAnswer(selectedOption, correctAnswer) {
  clearInterval(timer);
  
  // Disable all options
  const optionButtons = document.querySelectorAll('.option-btn');
  optionButtons.forEach(button => {
    button.disabled = true;
    if (button.textContent === correctAnswer) {
      button.classList.add('correct');
    } else if (button.textContent === selectedOption && selectedOption !== correctAnswer) {
      button.classList.add('wrong');
    }
  });
  
  // Check if answer is correct
  if (selectedOption === correctAnswer) {
    score++;
  }
  
  // Move to next question or show results
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  }, 1500);
}

// Show results
function showResults() {
  quizScreen.style.display = 'none';
  resultsScreen.style.display = 'block';
  
  const percentage = Math.round((score / quizQuestions.length) * 100);
  
  // Update results
  resultsTitle.textContent = `Well done, ${username}!`;
  scoreValue.textContent = percentage;
  scorePercentage.textContent = `${percentage}%`;
  
  // Animate score circle
  const degrees = (percentage / 100) * 360;
  scoreCircle.style.background = `conic-gradient(var(--primary-color) ${degrees}deg, #f0f0f0 ${degrees}deg)`;
  
  // Set character GIF based on score
  if (percentage >= 80) {
    characterGif.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGJtY2Z5cGJ4Y3JwZ3N0Y2VlY2V6dXZ4dWZ1eGJ6eWx2eGJjZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3q2K5jinAlQuCLFe/giphy.gif";
  } else if (percentage >= 50) {
    characterGif.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2J0YjZ5bW9qZ2V6Y3Z2bGJqZGJ0bXJ0dTZ1M2R4Z2FjZ2N6ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKSha51ATTx9KzC/giphy.gif";
  } else {
    characterGif.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnJ5a3R4eWJ5bGJtZ3U0eXZ5Z2F4dW5xZ3R3Z2R5bWJ6eGJtZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKrNh1J76jIuVU4/giphy.gif";
  }
  
  // Save score to local storage
  saveScore(username, percentage);
}

// Save score to local storage
function saveScore(username, score) {
  const scores = JSON.parse(localStorage.getItem('animeQuizScores')) || [];
  scores.push({ username, score, date: new Date().toISOString() });
  localStorage.setItem('animeQuizScores', JSON.stringify(scores));
}

// Timer functions
function startTimer() {
  timeLeft = 10;
  updateTimerDisplay();
  
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    
    if (timeLeft <= 0) {
      clearInterval(timer);
      timeUp();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 10;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  timerValue.textContent = timeLeft;
  const degrees = (timeLeft / 10) * 360;
  timerCircle.style.background = `conic-gradient(var(--secondary-color) ${degrees}deg, transparent ${degrees}deg)`;
  
  // Change color when time is running out
  if (timeLeft <= 3) {
    timerCircle.style.background = `conic-gradient(var(--wrong-color) ${degrees}deg, transparent ${degrees}deg)`;
  }
}

function timeUp() {
  const optionButtons = document.querySelectorAll('.option-btn');
  optionButtons.forEach(button => {
    button.disabled = true;
    if (button.textContent === (selectedLanguage === 'english' 
        ? quizQuestions[currentQuestionIndex].name 
        : quizQuestions[currentQuestionIndex].japaneseName)) {
      button.classList.add('correct');
    }
  });
  
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  }, 1500);
}

// Restart quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultsScreen.style.display = 'none';
  welcomeScreen.style.display = 'block';
  
  // Reset inputs
  usernameInput.value = '';
  languageSelect.value = '';
  startBtn.disabled = true;
}

// Utility function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
