import createGameboard from "./gameboard";
import Ship from "./ship";

export default class Player {
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
    this.iterator = 0;
    this.invert = "horizontal";
    this.instruct = document.querySelector(".player-instruct");
    this.playerSquares = null;
    this.showComputerBoard = document.querySelector(".computer-container");
    this.invertBtn = document.querySelector(".invert");
  }

  boardLogic(x, y, value, invert = this.invert, iterator = this.iterator) {
    if (iterator === 5) {
      return 0;
    }

    if (invert === "horizontal") {
      if (y + this.ships[iterator].length > 9) {
        for (let i = 0; i < this.ships[iterator].length; i++) {
          if (this.board[x][y - i] !== "placed") {
            this.board[x][y - i] = value;
          }
        }
      } else {
        for (let i = 0; i < this.ships[iterator].length; i++) {
          if (this.board[x][y + i] !== "placed") {
            this.board[x][y + i] = value;
          }
        }
      }
    } else {
      if (x + this.ships[iterator].length > 9) {
        for (let i = 0; i < this.ships[iterator].length; i++) {
          if (this.board[x - i][y] !== "placed") {
            this.board[x - i][y] = value;
          }
        }
      } else {
        for (let i = 0; i < this.ships[iterator].length; i++) {
          if (this.board[x + i][y] !== "placed") {
            this.board[x + i][y] = value;
          }
        }
      }
    }
  }

  isHit() {
    this.hits++;
  }

  findXandY(target) {
    let x = Number(target.getAttribute("x"));
    let y = Number(target.getAttribute("y"));

    return [x, y];
  }

  iteratorLogic(iterator = this.iterator) {
    if (iterator >= 5) {
      this.playerSquares.forEach((square) => {
        square.style.pointerEvents = "none";
      });

      this.showComputerBoard.style.display = "flex";
      this.instruct.remove();
      this.invertBtn.remove();
    }
    if (iterator < 5) {
      this.instruct.textContent = `Place your ${this.ships[iterator].name}`;
    }
  }

  placeShips() {
    const handleMouseEnter = (e) => {
      let target = e.target;
      let [x, y] = this.findXandY(target);
      this.boardLogic(x, y, "hovered");
      this.renderBoard();
    };

    const handleMounseLeave = (e) => {
      let target = e.target;
      let [x, y] = this.findXandY(target);
      this.boardLogic(x, y, "exit");
      this.renderBoard();
    };

    const handleClick = (e) => {
      let target = e.target;
      let [x, y] = this.findXandY(target);
      this.boardLogic(x, y, "placed");
      this.renderBoard();

      this.iterator++;

      this.iteratorLogic();
    };

    this.playerSquares.forEach((square) => {
      square.addEventListener("mouseenter", handleMouseEnter);
      square.addEventListener("mouseleave", handleMounseLeave);
      square.addEventListener("click", handleClick);
    });

    this.invertBtn.addEventListener("click", () => {
      this.invert = this.invert === "horizontal" ? "vertical" : "horizontal";
      this.invertBtn.textContent = `${this.invert}`;
    });
  }

  renderBoard(playerBoard = this.playerSquares) {
    const boardValueClassMap = {
      hovered: "ship-hit",
      placed: "ship-placed",
      exit: "ship-empty",
    };

    this.board.flat().forEach((ele, i) => {
      const element = playerBoard[i];
      const className = boardValueClassMap[ele];
      element.classList.remove("ship-placed", "ship-hit", "ship-empty");
      element.classList.add(className);

      if (ele === "placed") {
        element.textContent = "x";
      }
    });
  }
}
