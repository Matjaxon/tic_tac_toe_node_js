class Board {
  constructor() {
    this.grid = [[null, null, null],
      [null, null, null],
      [null, null, null]];
  }

  rowWin() {
    let winner = false;
    this.grid.forEach(row => {
      if (row[0] !== null && row.every((el) => el === row[0])) {
        winner = row[0];
      }
    });
    return winner;
  }

  colWin() {
    for (let i = 0; i < this.grid[0].length - 1; i++) {
      if (this.grid[0][i] !== null && this.grid[1][i] === this.grid[0][i] &&
        this.grid[2][i] === this.grid[0][i]) {
          return this.grid[0][i];
        }
      }
      return false;
    }

  diagWin() {
    if (this.grid[0][0] !== null &&
      this.grid[0][0] === this.grid[1][1] &&
      this.grid[0][0] === this.grid[2][2]) {
        return this.grid[0][0];

    } else if (this.grid[2][0] !== null &&
      this.grid[2][0] === this.grid[1][1] &&
      this.grid[2][0] === this.grid[0][2]) {
        return this.grid[2][2];

    } else {
      return false;
    }
  }

  won () {
    let winner = null;
    if (this.rowWin()) {
      winner = this.rowWin();
    } else if (this.colWin()) {
      winner = this.colWin();
    } else if (this.diagWin()) {
      winner = this.diagWin();
    }
    return winner;
  }

  over() {
    if (this.won()) {
      return this.won();
    } else if (this.boardFull()) {
      return "draw";
    } else {
      return false;
    }
  }

  boardFull() {
    if ([].concat(...this.grid).every(el => el !== null)) {
      return true;
    }
    return false;
  }

  empty(pos) {
    let row = pos[0];
    let col = pos[1];
    return (this.grid[row][col] === null) ? true : false;
  }

  placeMark(pos, mark) {
    if (this.empty(pos)) {
      this.grid[pos[0]][pos[1]] = mark;
      return 1;
    }
    return -1;
  }

  displayBoard() {
    console.log("   | 0 | 1 | 2 |" );
    console.log("----------------" );
    this.grid.forEach( (row, idx) => {
      console.log(` ${idx} | ${(row[0] === null) ? " " : row[0]} |` +
        ` ${(row[1] === null) ? " " : row[1]} |` +
        ` ${(row[2] === null) ? " " : row[2]} |`);
      console.log("----------------" );
    });
  }
}

module.exports = Board;
