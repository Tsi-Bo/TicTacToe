"use strict";

//Setting the status of the game
let isGamePlaying = true;

//Setting the status of the current player
let currentPlayer = 1;

const squares = document.querySelectorAll(".square");
const statusGame = document.querySelector(".status");

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
      } else if (checkDraw()) {
        statusGame.textContent = `It's a draw !`;
      }
    }
  });
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
