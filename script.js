"use strict";

//Setting the status of the game
let isGamePlaying = true;
//Setting the status of the current player
let currentPlayer = 1;
//Setting the scores
let player1Score = 0;
let player2Score = 0;
let tiesScore = 0;

//DOM Elements
const squares = document.querySelectorAll(".square");
const statusGame = document.querySelector(".status");
const resetButton = document.querySelector(".reset-btn");
const player1Text = document.querySelector(".player1");
const player2Text = document.querySelector(".player2");
const tiesText = document.querySelector(".ties");

// On load
player1Text.textContent = `PLAYER 1 : ${player1Score}`;
player2Text.textContent = `PLAYER 2 : ${player2Score}`;
tiesText.textContent = `TIES : ${player1Score}`;

squares.forEach((item) => {
  item.addEventListener("click", function () {
    //Check if the current square has been pressed
    if (item.innerHTML === "" && !isGameOver()) {
      //Displays the choice from the player
      item.innerHTML = currentPlayer === 1 ? "X" : "O";
      //Change the current player
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      statusGame.textContent = `Player ${currentPlayer}'s turn.`;

      if (checkWin()) {
        statusGame.textContent = `Player${currentPlayer} wins the game !`;
        if (currentPlayer === 1) {
          player1Score += 1;
          player1Text.textContent = `PLAYER 1 : ${player1Score}`;
        } else {
          player2Score += 1;
          player2Text.textContent = `PLAYER 2 : ${player2Score}`;
        }
      } else if (checkDraw()) {
        statusGame.textContent = `It's a draw !`;
        tiesScore += 1;
        tiesText.textContent = `TIES : ${tiesScore}`;
      }
    }
  });
});

// Reseting the game
resetButton.addEventListener("click", function () {
  // Clearing every square
  squares.forEach((item) => {
    item.innerHTML = "";
  });
  // Reseting other variables
  isGamePlaying = true;
  currentPlayer = 1;
  statusGame.textContent = `Player ${currentPlayer}'s turn.`;
  let player1Score = 0;
  let player2Score = 0;
  let tiesScore = 0;
});

function checkWin() {
  //check rows
  for (let i = 0; i < 3; i++) {
    if (
      squares[i * 3].innerHTML !== "" &&
      squares[i * 3].innerHTML === squares[i * 3 + 1].innerHTML &&
      squares[i * 3 + 1].innerHTML === squares[i * 3 + 2].innerHTML
    ) {
      return true;
    }
  }

  //check columns
  for (let i = 0; i < 3; i++) {
    if (
      squares[i].innerHTML !== "" &&
      squares[i].innerHTML === squares[i + 3].innerHTML &&
      squares[i + 3].innerHTML === squares[i + 6].innerHTML
    ) {
      return true;
    }
  }

  //Check diagonals
  if (
    squares[0].innerHTML !== "" &&
    squares[0].innerHTML === squares[4].innerHTML &&
    squares[4].innerHTML === squares[8].innerHTML
  ) {
    return true;
  }

  if (
    squares[2].innerHTML !== "" &&
    squares[2].innerHTML === squares[4].innerHTML &&
    squares[6].innerHTML === squares[4].innerHTML
  ) {
    return true;
  }
  return false;
}

function checkDraw() {
  for (const square of squares) {
    if (square.innerHTML === "") {
      return false;
    }
  }
  return true; //All squares have been played. The game is a draw
}

function isGameOver() {
  return checkWin() || checkDraw();
}
