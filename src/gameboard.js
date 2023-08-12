// Function to create a gameboard
export default function createGameboard() {
  let board = []; // Initialize an empty array to hold the gameboard

  // Loop to create rows for the gameboard
  for (let i = 0; i < 10; i++) {
    let row = []; // Initialize an empty array to represent a row

    // Loop to fill each row with cells
    for (let j = 0; j < 10; j++) {
      row.push("o"); // Fill the row with "o" to represent empty cells
    }

    board.push(row); // Add the row to the gameboard array
  }

  return board; // Return the complete gameboard
}
