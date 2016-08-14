const Board = require('./board.js');
const HumanPlayer = require('./human_player.js');
const ComputerPlayer = require('./computer_player.js');
const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Game {
  constructor(player1, player2, reader1) {
    this.board = new Board();

    this.player1 = player1;
    this.player1.mark = "X";

    this.player2 = player2;
    this.player2.mark = "O";

    this.currentPlayer = player1;
  }

  run(reader1, completionCallback) {
    this.board.displayBoard();
    console.log(`${this.currentPlayer.name}'s` +
      `(${this.currentPlayer.mark}) turn.'`);
      
    this.currentPlayer.promptMove(reader1, this.board, (move) => {
      this.board.placeMark(move, this.currentPlayer.mark);
      if (this.board.over()) {
        completionCallback(this.board.over());
      } else {
        this.changePlayer();
        this.run(reader1, completionCallback);
      }
    });
  }

  changePlayer() {
    if (this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
    }
  }
}

let player1 = new HumanPlayer("Matt");
let player2 = new HumanPlayer("Ashley");

const game = new Game(player1, player2, reader);
game.run(reader, (overStatus) => {
  game.board.displayBoard();
  if (overStatus === "draw") {
    console.log(`The game was a draw.`);
  } else {
    console.log(`${game.currentPlayer.name} won!`);
  }
  console.log("Game Over");
  reader.close();
});
