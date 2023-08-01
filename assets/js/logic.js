// Global variables
const startButton = document.getElementById('start');
const timerDisplay = document.getElementById('time');
const questionTitle = document.getElementById('question-title');
const choicesContainer = document.getElementById('choices');
const feedbackDiv = document.getElementById('feedback');
const finalScoreSpan = document.getElementById('final-score');
const initialsInput = document.getElementById('initials');
const submitButton = document.getElementById('submit');

let currentQuestionIndex = 0;
let timeLeft = 60; // Set the initial timer value (in seconds)
let timerInterval;
let score = 0;

// Event listener for when the start button is clicked
startButton.addEventListener('click', startQuiz);

// Function to start the quiz
function startQuiz() {
  startButton.parentElement.classList.add('hide');
  document.getElementById('questions').classList.remove('hide');

  // Start the timer
  timerInterval = setInterval(updateTimer, 1000);
  updateQuestion();
}

// Function to update the timer display
function updateTimer() {
  timeLeft--;
  if (timeLeft <= 0) {
    endQuiz();
  } else {
    timerDisplay.textContent = timeLeft;
  }
}

// Function to display the current question and choices
function updateQuestion() {
  if (currentQuestionIndex >= questions.length) {
    endQuiz();
    return;
  }

  const question = questions[currentQuestionIndex];
  questionTitle.textContent = question.question;
  choicesContainer.innerHTML = ''; // Clear previous choices

  question.choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.textContent = choice;
    button.classList.add('choice');
    button.addEventListener('click', () => checkAnswer(index));
    choicesContainer.appendChild(button);
  });
}

// Function to check the user's answer
function checkAnswer(choiceIndex) {
  const question = questions[currentQuestionIndex];
  const isCorrect = question.correctIndex === choiceIndex;

  if (isCorrect) {
    score += 10; // Increase score for correct answer
  } else {
    timeLeft -= 10; // Decrease time for incorrect answer
    if (timeLeft <= 0) {
      endQuiz();
      return;
    }
  }

  showFeedback(isCorrect);
}

// Function to show feedback on the answer
function showFeedback(isCorrect) {
  feedbackDiv.textContent = isCorrect ? 'Correct!' : 'Wrong!';
  feedbackDiv.classList.remove('hide');

  // Hide feedback after 1 second
  setTimeout(() => {
    feedbackDiv.classList.add('hide');
    currentQuestionIndex++;
    updateQuestion();
  }, 1000);
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timerInterval);

  // Display final score
  document.getElementById('questions').classList.add('hide');
  document.getElementById('end-screen').classList.remove('hide');
  finalScoreSpan.textContent = score;
}

// Event listener for when the submit button is clicked
submitButton.addEventListener('click', saveScore);

// Function to save the user's initials and score
function saveScore() {
  const initials = initialsInput.value.trim();
  if (initials === '') return;

  // Save initials and score using your preferred method (e.g., local storage, database, etc.)
  // Example using local storage:
  const highScores = JSON.parse(localStorage.getItem('highScores') || '[]');
  highScores.push({ initials, score });
  localStorage.setItem('highScores', JSON.stringify(highScores));

  // Redirect to highscores.html or any other page to view high scores
  window.location.href = 'highscores.html';
}