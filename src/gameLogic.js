export default class Logic {
  constructor(player, computer) {
    this.player = player;
    this.computer = computer;
    this.turn = true;
    this.gameover = false;
    this.computerMoves = [];
    this.winner = null;
    this.playAgain = null;
  }

  checkwin() {
    if (this.player.hits === 17 || this.computer.hits === 17) {
      this.winner = this.player.hits === 17 ? "Computer" : "Player";
      this.gameover = true;
    }

    if (this.gameover === true) {
      document.body.innerHTML = "";
      document.body.innerHTML = `
      <div class="winner-container">
        <p class='winner-text'>${this.winner} wins!</p>
        <button class="winner-btn">Play Again</button>
      </div>`;

      this.playAgain = document.querySelector(".winner-btn");
      this.playAgain.addEventListener("click", () => {
        location.reload();
      });
    }
  }

  getRands() {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    return [x, y];
  }

  computerMove() {
    if (this.gameover === false) {
      const playerSquares = document.querySelectorAll(".player-square");
      let [x, y] = this.getRands();

      if (this.computerMoves.includes(JSON.stringify([x, y]))) {
        this.computerMove();
      } else {
        let hit = this.player.board[y][x] === "placed" ? "hit" : "miss";

        if (hit === "hit") {
          this.player.isHit();
        }

        this.player.board[y][x] = `${hit}`;
        this.player.board.flat().forEach((ele, i) => {
          if (ele === "hit") {
            playerSquares[i].style.textContent = "x";
            playerSquares[i].style.color = "red";
          } else if (ele === "miss") {
            playerSquares[i].style.textContent = "o";
            playerSquares[i].style.color = "black";
          }
        });
        this.computerMoves.push(JSON.stringify([x, y]));
      }
    }
  }
}
