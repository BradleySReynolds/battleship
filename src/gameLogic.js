export default class Logic {
  constructor(player, computer) {
    this.player = player;
    this.computer = computer;
    this.turn = true;
    this.gameover = false;
    this.computerMoves = [];
    this.winner = null;
  }

  checkwin() {
    if (this.player.hits === 17) {
      this.gameover = true;
      this.winner = "Computer";
    } else if (this.computer.hits === 17) {
      this.gameover = true;
      this.winner = "Player";
    }

    if (this.gameover === true) {
      const newGameBtn = document.createElement("button");
      document.body.innerHTML = "";
      document.body.innerHTML = `
      <div class="winner-container">
        <p class='winner-text'>The ${this.winner} wins!</p>
        <button class="winner-btn">Play Again</button>
      </div>`;

      const playAgain = document.querySelector(".winner-btn");
      playAgain.addEventListener("click", () => {
        location.reload();
      });
    }
  }

  computerMove() {
    if (this.gameover === false) {
      const playerSquares = document.querySelectorAll(".player-square");
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);
      if (this.computerMoves.includes(JSON.stringify([x, y]))) {
        this.computerMove();
      } else {
        if (this.player.board[y][x] === "w") {
          this.player.isHit();
          this.player.board[y][x] = "i";
          this.player.board.flat().forEach((ele, i) => {
            if (ele === "i") {
              playerSquares[i].style.textContent = "x";
              playerSquares[i].style.color = "red";
            }
          });
        } else {
          this.player.board[y][x] = "m";
          this.player.board.flat().forEach((ele, i) => {
            if (ele === "m") {
              playerSquares[i].style.textContent = "o";
              playerSquares[i].style.color = "black";
            }
          });
        }
        this.computerMoves.push(JSON.stringify([x, y]));
      }
    }
  }
}
