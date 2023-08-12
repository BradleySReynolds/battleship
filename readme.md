# Battleship Game

Welcome to the Battleship Game project! This project implements a classic battleship game where a player competes against a computer opponent to sink each other's fleet of ships. This README provides an overview of the project, its components, and instructions on how to use it.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Code Structure](#code-structure)
- [Contributing](#contributing)

## Overview

The Battleship Game project consists of the following main components:

- `gameboard.js`: Contains the function to create a gameboard for players.
- `ship.js`: Defines the Ship class used to create ships with different names and lengths.
- `computer.js`: Implements the ComputerPlayer class for the computer opponent.
- `player.js`: Implements the Player class for user interactions and ship placement.
- `gameLogic.js`: Provides the Logic class to manage game logic and flow.
- `render.js`: Implements the `renderDom` function to render the game interface in the DOM.

### Prerequisites

To run this project, you'll need:

- A web browser with JavaScript enabled.

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/bradleysreynolds/battleship-game.git
   ```

### Usage

1. Open the game in your web browser after following the installation steps.
2. Follow the provided instructions to place your ships on the gameboard.
3. Click on the computer's board to attack and sink their ships.
4. The game continues until either you or the computer sinks all the opponent's ships.

### Code Structure

- `createGameboard()`: Function to create the gameboard for players.
- `Ship` class: Defines ships with names and lengths.
- `ComputerPlayer` class: Manages computer player behavior and ship positioning.
- `Player` class: Handles user interactions, ship placement, and hit tracking.
- `Logic` class: Manages game logic and flow, including checking for wins.
- `renderDom()`: Function to render the game interface in the DOM.

### Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or create a pull request.
