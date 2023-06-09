import createGameboard from "./gameboard";
import Ship from "./ship";

export default class ComputerPlayer {
  constructor() {
    this.board = createGameboard();
    this.ships = [
      new Ship("Carrier", 5),
      new Ship("Battleship", 4),
      new Ship("Destroyer", 3),
      new Ship("Submarine", 3),
      new Ship("Patrol Boat", 2),
    ];
    this.hits = 0;
  }

  positionShips() {
    this.ships.forEach((ele) => {
      let randomX, randomY, rotated;
      let valid = false;

      outerLoop: while (!valid) {
        rotated = Math.floor(Math.random() * 2);
        randomX = Math.floor(Math.random() * 10);
        randomY = Math.floor(Math.random() * 10);
        if (rotated === 0) {
          if (randomX + ele.length > 9) {
            for (let i = ele.length; i > 0; i--) {
              if (this.board[randomY][randomX - i] === "x") {
                continue outerLoop;
              }
            }
          } else {
            for (let i = 0; i < ele.length; i++) {
              ele.location.push([randomX + i, randomY]);
              if (this.board[randomY][randomX + i] === "x") {
                continue outerLoop;
              }
            }
          }
        } else {
          if (randomY + ele.length > 9) {
            for (let i = ele.length; i > 0; i--) {
              if (this.board[randomY - i][randomX] === "x") {
                continue outerLoop;
              }
            }
          } else {
            for (let i = 0; i < ele.length; i++) {
              if (this.board[randomY + i][randomX] === "x") {
                continue outerLoop;
              }
            }
          }
        }

        valid = true;
      }

      if (rotated === 0) {
        if (randomX + ele.length > 9) {
          for (let i = ele.length; i > 0; i--) {
            ele.location.push([randomX - i, randomY]);
            this.board[randomY][randomX - i] = "x";
          }
        } else {
          for (let i = 0; i < ele.length; i++) {
            ele.location.push([randomX + i, randomY]);
            this.board[randomY][randomX + i] = "x";
          }
        }
      } else {
        if (randomY + ele.length > 9) {
          for (let i = ele.length; i > 0; i--) {
            ele.location.push([randomX, randomY - i]);
            this.board[randomY - i][randomX] = "x";
          }
        } else {
          for (let i = 0; i < ele.length; i++) {
            ele.location.push([randomX, randomY + i]);
            this.board[randomY + i][randomX] = "x";
          }
        }
      }
    });
  }

  isHit() {
    this.hits++;
  }
}
