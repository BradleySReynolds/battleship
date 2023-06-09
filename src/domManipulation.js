import ComputerPlayer from "./computer";
import Player from "./player";
import Logic from "./gameLogic";

export default function renderDom() {
  const compCon = document.querySelector(".computer-board");
  const playerCon = document.querySelector(".player-board");

  const computer = new ComputerPlayer();
  const player = new Player();
  const game = new Logic(player, computer);

  player.board.forEach((row, i) =>
    row.forEach((_, j) => {
      let playerSquare = document.createElement("div");
      playerSquare.classList.add("player-square");
      playerSquare.setAttribute("x", i);
      playerSquare.setAttribute("y", j);
      playerSquare.textContent = player.board[i][j];
      playerCon.append(playerSquare);
    })
  );

  player.playerSquares = document.querySelectorAll(".player-square");

  player.placeShips();

  computer.positionShips();

  computer.board.forEach((row, i) =>
    row.forEach((_, j) => {
      let square = document.createElement("div");
      square.classList.add("square");
      square.textContent = computer.board[i][j];
      compCon.append(square);
    })
  );

  const squares = document.querySelectorAll(".square");
  const playerSquares = document.querySelectorAll(".player-square");

  squares.forEach((ele) => {
    function handleClick(e) {
      if (e.target.textContent === "x") {
        e.target.style.color = "red";
        computer.isHit();
      } else {
        e.target.style.color = "black";
      }
      console.log(player.hits, computer.hits);
      game.checkwin();
      game.computerMove();
      player.renderBoard(playerSquares);
      e.target.removeEventListener("click", handleClick);
    }

    ele.addEventListener("click", handleClick);
  });
}
