//your JS code here. If required.
let player1;
let player2;

let currentPlayer = "X";
let gameOver = false;


let form = document.getElementById("nameForm");


form.addEventListener("submit", function (event) {

  event.preventDefault();

  player1 = document.getElementsByName("player1")[0].value;
  player2 = document.getElementsByName("player2")[0].value;

  if (player1 === "" || player2 === "") {
    alert("Please enter both player names.");
    return;
  }

  document.getElementById("nameForm").style.display = "none";

  document.getElementById("boardPage").style.display = "block";

  document.getElementById("message").innerText =
    player1 + " (X) turn";
});


let cells = document.querySelectorAll(".board button");


cells.forEach(function (cell) {

  cell.addEventListener("click", function () {

    if (gameOver) {
      return;
    }

    if (cell.innerText !== "") {
      return;
    }

    cell.innerText = currentPlayer;


    if (checkWinner()) {

      let winner;

      if (currentPlayer === "X") {
        winner = player1;
      } else {
        winner = player2;
      }

      document.getElementById("message").innerText =
        winner + " Won 🎉";

      gameOver = true;

      return;
    }


    if (checkDraw()) {

      document.getElementById("message").innerText =
        "It's a draw!";

      gameOver = true;

      return;
    }


    if (currentPlayer === "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }


    let player;

    if (currentPlayer === "X") {
      player = player1;
    } else {
      player = player2;
    }

    document.getElementById("message").innerText =
      player + " (" + currentPlayer + ") turn";

  });

});


function checkWinner() {

  let winningPatterns = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

  ];


  for (let pattern of winningPatterns) {

    let a = cells[pattern[0]].innerText;
    let b = cells[pattern[1]].innerText;
    let c = cells[pattern[2]].innerText;


    if (a !== "" && a === b && b === c) {
      return true;
    }
  }

  return false;
}


function checkDraw() {

  for (let cell of cells) {

    if (cell.innerText === "") {
      return false;
    }

  }

  return true;
}