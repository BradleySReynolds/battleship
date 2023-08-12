// Class representing the game logic
export default class Logic {
  constructor(player, computer) {
    this.player = player; // Reference to the player instance
    this.computer = computer; // Reference to the computer instance
    this.turn = true; // Flag indicating whose turn it is
    this.gameover = false; // Flag indicating if the game is over
    this.computerMoves = []; // Array to track computer's moves
    this.winner = null; // Store the winner of the game
    this.playAgain = null; // Button to play again
  }

  // Method to check if the game has been won
  checkwin() {
    if (this.player.hits === 17 || this.computer.hits === 17) {
      this.winner = this.player.hits === 17 ? "Computer" : "Player"; // Determine the winner
      this.gameover = true; // Set the gameover flag

      // Display game over message and play again button
      document.body.innerHTML = "";
      document.body.innerHTML = `
      <div class="winner-container">
        <p class='winner-text'>${this.winner} wins!</p>
        <button class="winner-btn">Play Again</button>
      </div>`;

      // Get the play again button and add event listener to reload the page
      this.playAgain = document.querySelector(".winner-btn");
      this.playAgain.addEventListener("click", () => {
        location.reload();
      });
    }
  }

  // Method to generate random x and y coordinates
  getRands() {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    return [x, y];
  }

  // Method for the computer's move
  computerMove() {
    if (this.gameover === false) {
      const playerSquares = document.querySelectorAll(".player-square");
      let [x, y] = this.getRands(); // Get random coordinates

      if (this.computerMoves.includes(JSON.stringify([x, y]))) {
        this.computerMove(); // If move has been made before, try again
      } else {
        let hit = this.player.board[y][x] === "placed" ? "hit" : "miss"; // Determine if it's a hit or miss

        if (hit === "hit") {
          this.player.isHit(); // Record a hit for the player
        }

        this.player.board[y][x] = `${hit}`; // Update the player's board
        this.player.board.flat().forEach((ele, i) => {
          if (ele === "hit") {
            playerSquares[i].style.textContent = "x"; // Display hit marker
            playerSquares[i].style.color = "red"; // Set hit marker color to red
          } else if (ele === "miss") {
            playerSquares[i].style.textContent = "o"; // Display miss marker
            playerSquares[i].style.color = "black"; // Set miss marker color to black
          }
        });

        this.computerMoves.push(JSON.stringify([x, y])); // Store the computer's move
      }
    }
  }
}
