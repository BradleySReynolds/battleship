// Import necessary modules and classes
import ComputerPlayer from "./computer";
import Player from "./player";
import Logic from "./gameLogic";

// Define a function to render the game on the DOM
export default function renderDom() {
  // Get container elements for computer and player game boards
  const compCon = document.querySelector(".computer-board");
  const playerCon = document.querySelector(".player-board");

  // Create instances of ComputerPlayer, Player, and Logic classes
  const computer = new ComputerPlayer();
  const player = new Player();
  const game = new Logic(player, computer);

  // Render player's game board on the DOM
  player.board.forEach((row, i) =>
    row.forEach((_, j) => {
      // Create a square element for each cell in the board
      let playerSquare = document.createElement("div");
      playerSquare.classList.add("player-square");
      playerSquare.setAttribute("x", i); // Store x-coordinate as an attribute
      playerSquare.setAttribute("y", j); // Store y-coordinate as an attribute
      playerSquare.textContent = player.board[i][j]; // Set the content of the square
      playerCon.append(playerSquare); // Append the square to the player's container
    })
  );

  // Store references to player squares
  player.playerSquares = document.querySelectorAll(".player-square");

  // Place the player's ships on the board
  player.placeShips();

  // Position the computer's ships on its board
  computer.positionShips();

  // Render the computer's game board on the DOM
  computer.board.forEach((row, i) =>
    row.forEach((_, j) => {
      // Create a square element for each cell in the computer's board
      let square = document.createElement("div");
      square.classList.add("square");
      square.textContent = computer.board[i][j]; // Set the content of the square
      compCon.append(square); // Append the square to the computer's container
    })
  );

  // Get references to all square elements on the computer's board
  const squares = document.querySelectorAll(".square");
  // Get references to all square elements on the player's board
  const playerSquares = document.querySelectorAll(".player-square");

  // Attach click event listeners to computer's board squares
  squares.forEach((ele) => {
    function handleClick(e) {
      // Check if the square contains an "x" (hit)
      if (e.target.textContent === "x") {
        e.target.style.color = "red"; // Change color to red for a hit
        computer.isHit(); // Increment computer's hit count
      } else {
        e.target.style.color = "black"; // Change color to black for a miss
      }

      // Check if the game has been won
      game.checkwin();
      // Perform the computer's move
      game.computerMove();
      // Check again if the game has been won
      game.checkwin();
      // Render the updated player's board
      player.renderBoard(playerSquares);
      // Remove the click event listener to prevent further clicks on this square
      e.target.removeEventListener("click", handleClick);
    }

    // Attach the click event listener to the square element
    ele.addEventListener("click", handleClick);
  });
}
