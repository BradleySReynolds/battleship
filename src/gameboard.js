export default function createGameboard() {
  let board = [];
  for (let i = 0; i < 10; i++) {
    let row = [];
    for (let j = 0; j < 10; j++) {
      row.push("o");
    }
    board.push(row);
  }

  return board;
}
