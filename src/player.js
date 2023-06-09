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
  }

  boardLogic(invert, x, y, iterator, value) {
    if (iterator === 5) {
      return 0;
    }

    if (invert === "horizontal") {
      if (y + this.ships[iterator].length > 9) {
        for (let i = 0; i < this.ships[iterator].length; i++) {
          if (this.board[x][y - i] !== "w") {
            this.board[x][y - i] = value;
          }
        }
      } else {
        for (let i = 0; i < this.ships[iterator].length; i++) {
          if (this.board[x][y + i] !== "w") {
            this.board[x][y + i] = value;
          }
        }
      }
    } else {
      if (x + this.ships[iterator].length > 9) {
        for (let i = 0; i < this.ships[iterator].length; i++) {
          if (this.board[x - i][y] !== "w") {
            this.board[x - i][y] = value;
          }
        }
      } else {
        for (let i = 0; i < this.ships[iterator].length; i++) {
          if (this.board[x + i][y] !== "w") {
            this.board[x + i][y] = value;
          }
        }
      }
    }
  }

  isHit() {
    this.hits++;
  }

  placeShips() {
    let iterator = 0;
    let invert = "horizontal";
    const playerSquares = document.querySelectorAll(".player-square");
    const invertBtn = document.querySelector(".invert");

    invertBtn.addEventListener("click", () => {
      invert = invert === "horizontal" ? "vertical" : "horizontal";
      invertBtn.textContent = `${invert}`;
    });

    playerSquares.forEach((ele) => {
      ele.addEventListener("mouseenter", (e) => {
        let target = e.target;
        let x = Number(target.getAttribute("x"));
        let y = Number(target.getAttribute("y"));

        this.boardLogic(invert, x, y, iterator, "z");

        e.stopImmediatePropagation();
        this.renderBoard(playerSquares);
      });
    });

    playerSquares.forEach((ele) => {
      ele.addEventListener("mouseleave", (e) => {
        let target = e.target;
        let x = Number(target.getAttribute("x"));
        let y = Number(target.getAttribute("y"));

        this.boardLogic(invert, x, y, iterator, "p");

        e.stopImmediatePropagation();
        this.renderBoard(playerSquares);
      });
    });

    const handleClick = (e) => {
      const playerInstruct = document.querySelector(".player-instruct");
      let target = e.target;
      let x = Number(target.getAttribute("x"));
      let y = Number(target.getAttribute("y"));

      this.boardLogic(invert, x, y, iterator, "w");
      e.stopImmediatePropagation();
      this.renderBoard(playerSquares);

      playerSquares.forEach((ele) => {
        ele.addEventListener("click", handleClick);
      });

      iterator++;

      if (iterator >= 5) {
        const showComputerBoard = document.querySelector(".computer-container");
        playerSquares.forEach((ele) => {
          ele.style.pointerEvents = "none";
        });

        showComputerBoard.style.display = "flex";
        playerInstruct.remove();
        invertBtn.remove();
      }
      if (iterator < 5) {
        playerInstruct.textContent = `Place your ${this.ships[iterator].name}`;
      }
    };

    playerSquares.forEach((ele) => {
      ele.addEventListener("click", handleClick);
    });
  }

  renderBoard(playerBoard) {
    this.board.flat().forEach((ele, i) => {
      if (ele === "z") {
        playerBoard[i].style.backgroundColor = "#202a44";
        playerBoard[i].style.color = "#202a44";
      } else if (ele === "w") {
        playerBoard[i].style.backgroundColor = "black";
        playerBoard[i].style.color = "black";
        playerBoard[i].textContent = "x";
      } else if (ele === "p") {
        playerBoard[i].style.backgroundColor = "#ddd";
        playerBoard[i].style.color = "#ddd";
      }
    });
  }
}