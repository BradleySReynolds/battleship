// Import necessary modules and classes
import createGameboard from "./gameboard"; // Import the function to create a gameboard
import Ship from "./ship"; // Import the Ship class

// Class representing the player's actions and logic
export default class Player {
  constructor() {
    this.board = createGameboard(); // Create a gameboard for the player
    this.ships = [
      new Ship("Carrier", 5),
      new Ship("Battleship", 4),
      new Ship("Destroyer", 3),
      new Ship("Submarine", 3),
      new Ship("Patrol Boat", 2),
    ]; // Create an array of ships with different lengths

    this.hits = 0; // Initialize the hit count to track successful hits on the player's ships
    this.iterator = 0; // Iterator to keep track of the ship placement progress
    this.invert = "horizontal"; // Orientation of ship placement
    this.instruct = document.querySelector(".player-instruct"); // Element displaying placement instructions
    this.playerSquares = null; // Collection of player's squares on the board
    this.showComputerBoard = document.querySelector(".computer-container"); // Element displaying the computer's board
    this.invertBtn = document.querySelector(".invert"); // Button to toggle ship orientation
  }

  // Method to handle ship placement logic on the board
  boardLogic(x, y, value, invert = this.invert, iterator = this.iterator) {
    if (iterator === 5) {
      return 0; // All ships have been placed, exit the function
    }

    let condition;

    if (invert === "horizontal") {
      condition = y + this.ships[iterator].length > 9 ? "-" : "+"; // Determine the direction to place the ship
      for (let i = 0; i < this.ships[iterator].length; i++) {
        if (this.board[x][eval(`${y}${condition}${i}`)] !== "placed") {
          this.board[x][eval(`${y}${condition}${i}`)] = value; // Place the ship on the board
        }
      }
    } else {
      condition = x + this.ships[iterator].length > 9 ? "-" : "+"; // Determine the direction to place the ship
      for (let i = 0; i < this.ships[iterator].length; i++) {
        if (this.board[eval(`${x}${condition}${i}`)][y] !== "placed") {
          this.board[eval(`${x}${condition}${i}`)][y] = value; // Place the ship on the board
        }
      }
    }
  }

  // Method to record a successful hit on the player's ships
  isHit() {
    this.hits++;
  }

  // Method to find x and y coordinates from an HTML element
  findXandY(target) {
    let x = Number(target.getAttribute("x"));
    let y = Number(target.getAttribute("y"));

    return [x, y];
  }

  // Method to handle the logic for ship placement iteration
  iteratorLogic(iterator = this.iterator) {
    if (iterator >= 5) {
      // All ships have been placed
      this.playerSquares.forEach((square) => {
        square.style.pointerEvents = "none"; // Disable further placement
      });

      // Show the computer's board and remove placement instructions
      this.showComputerBoard.style.display = "flex";
      this.instruct.remove();
      this.invertBtn.remove();
    }
    if (iterator < 5) {
      this.instruct.textContent = `Place your ${this.ships[iterator].name}`; // Update placement instruction
    }
  }

  // Method to handle ship placement and orientation toggling
  placeShips(invertBtn = this.invertBtn) {
    const handleMouseEnter = (e) => {
      let target = e.target;
      let [x, y] = this.findXandY(target);
      this.boardLogic(x, y, "hovered"); // Highlight ship placement area
      this.renderBoard();
    };

    const handleMouseLeave = (e) => {
      let target = e.target;
      let [x, y] = this.findXandY(target);
      this.boardLogic(x, y, "exit"); // Remove highlight when cursor leaves
      this.renderBoard();
    };

    const handleClick = (e) => {
      let target = e.target;
      let [x, y] = this.findXandY(target);

      this.boardLogic(x, y, "placed"); // Place the ship on the board
      this.renderBoard();

      this.iterator++; // Move to the next ship

      this.iteratorLogic();
    };

    // Attach event listeners for ship placement and orientation toggling
    this.playerSquares.forEach((square) => {
      square.addEventListener("mouseenter", handleMouseEnter);
      square.addEventListener("mouseleave", handleMouseLeave);
      square.addEventListener("click", handleClick);
    });

    invertBtn.addEventListener("click", () => {
      this.invert = this.invert === "horizontal" ? "vertical" : "horizontal"; // Toggle ship orientation
      invertBtn.textContent = `${this.invert}`; // Update the button text
    });
  }

  // Method to render the player's game board with ship placement
  renderBoard(playerBoard = this.playerSquares) {
    const boardValueClassMap = {
      hovered: "ship-hit", // Highlighted ship placement area
      placed: "ship-placed", // Placed ship
      exit: "ship-empty", // Area where ship placement was exited
    };

    // Loop through each element on the board
    this.board.flat().forEach((ele, i) => {
      const element = playerBoard[i];
      const className = boardValueClassMap[ele];
      element.classList.remove("ship-placed", "ship-hit", "ship-empty");
      element.classList.add(className); // Apply appropriate styling class

      if (ele === "placed") {
        element.textContent = "x"; // Display ship placement marker
      }
    });
  }
}
