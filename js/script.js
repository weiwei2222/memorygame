"use strict";

const cardsEL = document.querySelectorAll(".memory-card");
const movesEl = document.getElementById("moves");
const timerEl = document.getElementById("timer");
const reset = document.getElementById("reset");
const winEl = document.querySelector(".win");
let checkFlip = false;
let firstCard, secondCard;
let lockCard = false;
let moves = 0;
let seconds = 0;
let minutes = 0;
let timer = false;
let match = 0;

document.body.onload = shuffle();

// reset the game
function resetGame() {
  winEl.classList.add("hidden");
  cardsEL.forEach((card) => card.classList.remove("hidden"));
  cardsEL.forEach((card) => card.classList.remove("flip"));
  cardsEL.forEach((card) => card.addEventListener("click", flipCard));
  match = 0;
  moves = 0;
  movesEl.textContent = moves;
  clearInterval(timer);
  timerEl.textContent = 0;
  seconds = 0;
  minutes = 0;
  shuffle();
}
// reset 2 cords
function reset2Cords() {
  [checkFlip, lockCard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
// flipcard when user click a card. and the moves and timer will start.
function flipCard() {
  if (lockCard) return;
  if (this === firstCard) return;
  this.classList.add("flip");
  moves++;
  if (moves == 1) {
    timer = setInterval(updateTimer, 1000);
  }
  if (!checkFlip) {
    checkFlip = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  checkFlip = false;
  movesEl.textContent = moves;
  checkMatch();
  stateGame();
}
// check 2 cards match or not, if it is match, 2 cards turn to disablecards, if it isn't match, turn to unflipcards
// and also check all card wether match. if it is match 8 times,the moves and timer will stop.
function checkMatch() {
  if (firstCard.dataset.animal === secondCard.dataset.animal) {
    match++;
    disableCards();
    return;
  } else {
    unflipCards();
  }
}
function stateGame() {
  if (match == 8 && minutes <= 1) {
    clearInterval(timer);
    cardsEL.forEach((card) => card.classList.add("hidden"));
    winEl.classList.remove("hidden");
  } else if (minutes >= 1) {
    clearInterval(timer);
    cardsEL.forEach((card) => card.classList.add("hidden"));
    winEl.classList.remove("hidden");
    winEl.textContent = "You lose...";
  }
}
// disable 2 cards
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  reset2Cords();
}
// unflip 2 cards
function unflipCards() {
  lockCard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    reset2Cords();
  }, 1000);
}
// shuffle all cards. and change all cards order.
function shuffle() {
  cardsEL.forEach((card) => {
    let randomNum = Math.floor(Math.random() * 16);
    card.style.order = randomNum;
  });
}
// this is game timer.
function updateTimer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  timerEl.textContent = `${minutes} : ${seconds}`;
}
// Start game and reset game button
cardsEL.forEach((card) => card.addEventListener("click", flipCard));
reset.addEventListener("click", resetGame);
