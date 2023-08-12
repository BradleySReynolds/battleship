// Import the necessary modules
import createGameboard from "./gameboard"; // Importing the function to create a gameboard
import Ship from "./ship"; // Importing the Ship class

// Define the ComputerPlayer class
export default class ComputerPlayer {
  constructor() {
    // Initialize the ComputerPlayer's properties
    this.board = createGameboard(); // Create a gameboard for the player
    this.ships = [
      new Ship("Carrier", 5),
      new Ship("Battleship", 4),
      new Ship("Destroyer", 3),
      new Ship("Submarine", 3),
      new Ship("Patrol Boat", 2),
    ]; // Create an array of ships with different lengths
    this.hits = 0; // Initialize the hit count to track successful hits on the player's ships
  }

  // Method to position the ships on the gameboard
  positionShips() {
    this.ships.forEach((ele) => {
      let randomX, randomY, rotated;
      let valid = false;

      // Loop until a valid position is found for the ship
      outerLoop: while (!valid) {
        rotated = Math.floor(Math.random() * 2); // Randomly choose ship orientation (0 for horizontal, 1 for vertical)
        randomX = Math.floor(Math.random() * 10); // Random X coordinate
        randomY = Math.floor(Math.random() * 10); // Random Y coordinate
        if (rotated === 0) {
          if (randomX + ele.length > 9) {
            // Check if ship goes out of bounds horizontally
            for (let i = ele.length; i > 0; i--) {
              if (this.board[randomY][randomX - i] === "x") {
                continue outerLoop; // If overlap with another ship, restart the loop
              }
            }
          } else {
            // Valid position, update ship's location and check for overlaps
            for (let i = 0; i < ele.length; i++) {
              ele.location.push([randomX + i, randomY]);
              if (this.board[randomY][randomX + i] === "x") {
                continue outerLoop; // If overlap with another ship, restart the loop
              }
            }
          }
        } else {
          if (randomY + ele.length > 9) {
            // Check if ship goes out of bounds vertically
            for (let i = ele.length; i > 0; i--) {
              if (this.board[randomY - i][randomX] === "x") {
                continue outerLoop; // If overlap with another ship, restart the loop
              }
            }
          } else {
            // Valid position, update ship's location and check for overlaps
            for (let i = 0; i < ele.length; i++) {
              if (this.board[randomY + i][randomX] === "x") {
                continue outerLoop; // If overlap with another ship, restart the loop
              }
            }
          }
        }

        valid = true; // All checks passed, position is valid
      }

      // Place the ship on the gameboard
      if (rotated === 0) {
        if (randomX + ele.length > 9) {
          for (let i = ele.length; i > 0; i--) {
            ele.location.push([randomX - i, randomY]); // Update ship's location
            this.board[randomY][randomX - i] = "x"; // Mark the ship's position on the gameboard
          }
        } else {
          for (let i = 0; i < ele.length; i++) {
            ele.location.push([randomX + i, randomY]); // Update ship's location
            this.board[randomY][randomX + i] = "x"; // Mark the ship's position on the gameboard
          }
        }
      } else {
        if (randomY + ele.length > 9) {
          for (let i = ele.length; i > 0; i--) {
            ele.location.push([randomX, randomY - i]); // Update ship's location
            this.board[randomY - i][randomX] = "x"; // Mark the ship's position on the gameboard
          }
        } else {
          for (let i = 0; i < ele.length; i++) {
            ele.location.push([randomX, randomY + i]); // Update ship's location
            this.board[randomY + i][randomX] = "x"; // Mark the ship's position on the gameboard
          }
        }
      }
    });
  }

  // Method to record a successful hit on the player's ships
  isHit() {
    this.hits++;
  }
}
