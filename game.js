const userText = document.querySelector("#userText"); //Score
const cpuText = document.querySelector("#cpuText"); //Score
const playButtons = document.querySelectorAll(".chooser"); // Rock paper scissors buttons

let userPLAY;
let cpuPLAY;
let resultText;
let gamesPlayed;
let userScore;
let cpuScore;

// Save game state so page refresh keeps scores
if (localStorage.getItem("GAMEstate") == null){
  localStorage.clear();
  gamesPlayed = 1;
  userScore = 0;
  cpuScore = 0;

  localStorage.setItem("GAMEstate", gamesPlayed);
  localStorage.setItem("USERscore", userScore);
  localStorage.setItem("CPUscore", cpuScore);

} else {
  gamesPlayed = localStorage.getItem("GAMEstate");
  userScore = localStorage.getItem("USERscore");
  cpuScore = localStorage.getItem("CPUscore");
}

// Initialize round number to 1 and user scores to 0
const instructions = document.querySelector("#instructions")
const roundNumber = document.querySelector("#roundNumber")
if (gamesPlayed == 1){
  roundNumber.textContent = 1
  userText.textContent = 0;
  cpuText.textContent = 0;

} else {
  roundNumber.textContent = gamesPlayed;
  userText.textContent = userScore;
  cpuText.textContent = cpuScore;
}

// Upon clicking the rock paper scissors images
playButtons.forEach(button => button.addEventListener("click", () => {

  userPLAY = button.id;
  cpuTurn();
  generateResults();
  localStorage.setItem("GAMEstate", gamesPlayed);
  localStorage.setItem("USERscore", userScore);
  localStorage.setItem("CPUscore", cpuScore);
  console.log()


}));

// Calculate cpu choice
function cpuTurn(){
  const randNum = Math.floor(Math.random() * 3) + 1;

  switch(randNum){
    case 1:
      cpuPLAY = "Rock"
      break;
    case 2:
      cpuPLAY = "Paper"
      break;
    case 3:
      cpuPLAY = "Scissors"
      break;
  }
}

// Generate the game results
function generateResults(){
  const gameState = document.createElement("article")
  gamesPlayed++;

  // Set the round number on top of page to the number of games played
  roundNumber.textContent = gamesPlayed;

  // Current score counter in top of page
  const userR = document.createElement("h5")
  userR.textContent = `User Played: ${userPLAY}`;
  gameState.appendChild(userR);

  const cpuR = document.createElement("h5")
  cpuR.textContent = `CPU Played: ${cpuPLAY}`;
  gameState.appendChild(cpuR);

  // Text under RPS images that tell user what they picked and what the cpu picked
  const userPlayed = document.querySelector("#userPick");
  const cpuPlayed = document.querySelector("#cpuPick");
  userPlayed.textContent = `You Played: ${userPLAY}`;
  cpuPlayed.textContent = `CPU Played: ${cpuPLAY}`;

  // Determine who won, and increment score counters
  const results = document.querySelector("#results");
  if (userPLAY === "Rock" && cpuPLAY == "Scissors" || userPLAY === "Scissors" && cpuPLAY == "Paper" || userPLAY === "Paper" && cpuPLAY == "Rock"){
    resultText = "You win!";
    userScore++;

  } else if (userPLAY === "Rock" && cpuPLAY == "Paper" || userPLAY === "Scissors" && cpuPLAY == "Rock" || userPLAY === "Paper" && cpuPLAY == "Scissors"){
    resultText = "You Lose!";
    cpuScore++;

  } else if (userPLAY === cpuPLAY){
    resultText = "You Tied!";
  }

  // Set the text to 'you win', 'you lose' or 'you tied'
  results.textContent = resultText;
  userText.textContent = userScore;
  cpuText.textContent = cpuScore;

  // Game end
  if (cpuScore == 5 || userScore == 5){
    userPlayed.innerHTML = "&nbsp;";
    cpuPlayed.innerHTML = "&nbsp;";
    results.innerHTML = "&nbsp;";

    let alertBox = document.querySelector('#alert-box');
    let winnerText = document.querySelector('#winner-text');

    // Set correct text in alert box
    if (cpuScore == 5){
      winnerText.textContent = "You Lose!";
    } else {
      winnerText.textContent = "You Win!";
    }
    // Open alert box
    alertBox.classList.add("modal-open");

    // Reset game and close alert box
    let alertReset = document.querySelector('#my-modal');
    alertReset.addEventListener("click", () => {
      alertBox.classList.remove("modal-open");
      resetGame();
    })

  }

 
}

 // Reset the game, and all the counters
 // Call localStorage.clear();
 const reset = document.querySelector("#resetButton");
 reset.addEventListener("click", resetGame);
function resetGame(){
  const userPlayed = document.querySelector("#userPick");
  const cpuPlayed = document.querySelector("#cpuPick");
  gamesPlayed = userScore = cpuScore = 0;
  roundNumber.textContent = 1;
  userText.textContent = 0;
  cpuText.textContent = 0;
  userPlayed.innerHTML = "&nbsp;";
  cpuPlayed.innerHTML = "&nbsp;";
  results.innerHTML = "&nbsp;";
  localStorage.clear();
}

// Light and dark mode toggle
let checkbox = document.querySelector('.light-dark-mode');
let html = document.querySelector('html');
checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    html.setAttribute('data-theme', 'synthwave');
  } else {
    html.setAttribute('data-theme', 'halloween');
  }
});


