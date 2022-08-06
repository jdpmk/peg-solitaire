const N = 7;

const PegType = {
  OOB: 0,
  EMPTY: 1,
  FILLED: 2
};

const Status = {
  SELECTING_SRC: 0,
  SELECTING_DST: 1
};

const Symbol = {
  EMPTY: "\u25E6",
  FILLED: "\u29BF",
  OOB: "."
};

const DIRS = [
  [0, 2],
  [2, 0],
  [0, -2],
  [-2, 0]
];

function setPegInUi(i, j, type) {
  const peg = document.getElementById(`r${i}c${j}`);

  if (type == PegType.EMPTY) {
    peg.innerText = Symbol.EMPTY;
  } else if (type == PegType.FILLED) {
    peg.innerText = Symbol.FILLED;
  }
}

function validDestinationForSource(i, j) {
  const [src_i, src_j] = src; 

  const btw_i = src_i == i ? src_i : Math.min(src_i, i) + 1;
  const btw_j = src_j == j ? src_j : Math.min(src_j, j) + 1;

  return 0 <= i && i < N && 0 <= j && j < N &&
         board[i][j] == PegType.EMPTY &&
         (Math.abs(src_i - i) == 2) != (Math.abs(src_j - j) == 2) &&
         board[btw_i][btw_j] == PegType.FILLED;
}

function performMove() {
  const [src_i, src_j] = src; 
  const [dst_i, dst_j] = dst; 

  const btw_i = src_i == dst_i ? src_i : Math.min(src_i, dst_i) + 1;
  const btw_j = src_j == dst_j ? src_j : Math.min(src_j, dst_j) + 1;

  board[src_i][src_j] = PegType.EMPTY;
  board[btw_i][btw_j] = PegType.EMPTY;
  board[dst_i][dst_j] = PegType.FILLED;

  setPegInUi(src_i, src_j, PegType.EMPTY);
  setPegInUi(btw_i, btw_j, PegType.EMPTY);
  setPegInUi(dst_i, dst_j, PegType.FILLED);
}

function checkMoreMovesPossible() {
  let possible = false;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j] == PegType.FILLED) {
        src = [i, j];
        for (const [di, dj] of DIRS) {
          if (validDestinationForSource(i + di, j + dj)) {
            possible = true;
          }
        }
      }
    }
  }

  if (!possible) {
    const msg = document.getElementById("msg");
    msg.innerText = "Game Over!";
  }
}

function selectPeg(i, j) {
  if (game_status == Status.SELECTING_SRC) {
    if (board[i][j] == PegType.FILLED) {
      src = [i, j];
      game_status = Status.SELECTING_DST;
    }
  } else if (game_status == Status.SELECTING_DST) {
    if (board[i][j] == PegType.EMPTY) {
      if (validDestinationForSource(i, j)) {
        dst = [i, j];
        performMove();
        src = [-1, -1];
        dst = [-1, -1];
        game_status = Status.SELECTING_SRC;
        checkMoreMovesPossible();
      }
    } else if (board[i][j] == PegType.FILLED) {
      src = [i, j];
    }
  }
}

function initializeGame() {
  const board = Array(N).fill(0).map(() => new Array(N));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (C_isOutOfBounds(i, j)) {
        board[i][j] = PegType.OOB;
      } else if (C_isCenter(i, j)) {
        board[i][j] = PegType.EMPTY;
      } else {
        board[i][j] = PegType.FILLED;
      }
    }
  }

  function createRow(i) {
    const row = document.createElement("div");

    row.className = "row";
    row.id = `r${i}`;

    return row;
  }
  
  function createPeg(i, j) {
    const peg = document.createElement("div");

    peg.className = "peg";
    peg.id = `r${i}c${j}`;
    if (C_isOutOfBounds(i, j)) {
      peg.innerText = Symbol.OOB;
      peg.className = "peg oob";
    } else if (C_isCenter(i, j)) {
      peg.innerText = Symbol.EMPTY;
    } else {
      peg.innerText = Symbol.FILLED;
    }

    peg.onclick = function() {
      selectPeg(i, j);
    };

    return peg;
  }
  
  const ui = document.getElementById("board");

  for (let i = 0; i < N; i++) {
    const row = createRow(i);
    for (let j = 0; j < N; j++) {
      const peg = createPeg(i, j);
      row.appendChild(peg);
    }
    ui.appendChild(row);
  }

  return [board, ui];
}

const [board, ui] = initializeGame();

let game_status = Status.SELECTING_SRC;
let src = [-1, -1];
let dst = [-1, -1];
