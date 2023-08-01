// Retrieve the high scores from local storage and display them on the highscores.html page
const highScoresList = document.getElementById('highscores');
const clearButton = document.getElementById('clear');

// Event listener for when the clear button is clicked
clearButton.addEventListener('click', clearHighScores);

// Function to retrieve high scores from local storage and display them on the page
function displayHighScores() {
  const highScores = JSON.parse(localStorage.getItem('highScores') || '[]');

  // Sort high scores in descending order
  highScores.sort((a, b) => b.score - a.score);

  highScoresList.innerHTML = ''; // Clear previous scores

  highScores.forEach((scoreEntry) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${scoreEntry.initials}: ${scoreEntry.score}`;
    highScoresList.appendChild(listItem);
  });
}

// Function to clear high scores from local storage and update the displayed list
function clearHighScores() {
  localStorage.removeItem('highScores');
  displayHighScores();
}

// Display the high scores when the highscores.html page loads
window.addEventListener('load', displayHighScores);