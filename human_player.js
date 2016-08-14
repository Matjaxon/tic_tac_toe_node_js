class HumanPlayer {
  constructor(name) {
    this.name = name;
    this.mark = null;
  }

  promptMove(reader, board, moveCallback) {
    reader.question("Where would you like to place your mark? \n > ", (res) => {
      res = res.split(', ');
      let move = [];
      res.forEach( el => move.push(parseInt(el)));
      if (board.empty(move)) {
        moveCallback(move);
      } else {
        console.log("Invalid move. Please try again.");
        this.promptMove(reader, board, moveCallback);
      }
    });
  }
}

module.exports = HumanPlayer;
