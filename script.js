const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const modeSelect = document.getElementById("mode");
const difficultySelect = document.getElementById("difficulty");
let difficulty = "hard";

let board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;
let gameMode = "pvp";

const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function saveGame() {
  localStorage.setItem(
    "ticTacToe",
    JSON.stringify({
      board,
      currentPlayer,
      gameActive,
      gameMode,
      difficulty,
    }),
  );
}

function loadGame() {
  const saved = localStorage.getItem("ticTacToe");
  if (!saved) return;

  const data = JSON.parse(saved);

  board = data.board;
  currentPlayer = data.currentPlayer;
  gameActive = data.gameActive;
  gameMode = data.gameMode;
  difficulty = data.difficulty || "hard";
  difficultySelect.value = difficulty;

  modeSelect.value = gameMode;
}

function init() {
  boardEl.innerHTML = "";

  board.forEach((value, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;

    cell.textContent = value;
    if (value) cell.classList.add(value.toLowerCase());

    cell.addEventListener("click", handleCellClick);

    boardEl.appendChild(cell);
  });

  statusEl.textContent = gameActive
    ? `Player ${currentPlayer}'s turn`
    : "Game Over";
}

function handleCellClick(e) {
  const index = e.target.dataset.index;

  makeMove(index);

  if (gameMode === "ai" && currentPlayer === "O" && gameActive) {
    setTimeout(computerMove, 300);
  }
}

function makeMove(index) {
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;

  const cell = document.querySelector(`[data-index='${index}']`);
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  const pattern = getWinningPattern();

  if (pattern) {
    highlightWinner(pattern);
    statusEl.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    saveGame();
    return;
  }

  if (board.every((cell) => cell !== "")) {
    statusEl.textContent = "It's a draw!";
    gameActive = false;
    saveGame();
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusEl.textContent = `Player ${currentPlayer}'s turn`;

  saveGame();
}

function randomMove() {
  let emptyIndexes = board
    .map((cell, i) => (cell === "" ? i : null))
    .filter((i) => i !== null);

  const randomIndex =
    emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

  makeMove(randomIndex);
}

function mediumMove() {
  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = "O";
      if (getWinner() === "O") {
        board[i] = "";
        makeMove(i);
        return;
      }
      board[i] = "";
    }
  }

  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = "X";
      if (getWinner() === "X") {
        board[i] = "";
        makeMove(i);
        return;
      }
      board[i] = "";
    }
  }

  randomMove();
}

function computerMove() {
  if (difficulty === "easy") {
    randomMove();
  } else if (difficulty === "medium") {
    mediumMove();
  } else {
    bestMove();
  }
}

function bestMove() {
  let bestScore = -Infinity;
  let move;

  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = "O";

      let score = minimax(board, 0, false, -Infinity, Infinity);

      board[i] = "";

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  makeMove(move);
}

function minimax(board, depth, isMaximizing, alpha, beta) {
  const result = getWinner();

  if (result !== null) {
    if (result === "O") return 10 - depth;
    if (result === "X") return depth - 10;
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;

    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "O";
        let score = minimax(board, depth + 1, false, alpha, beta);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
        alpha = Math.max(alpha, bestScore);

        if (beta <= alpha) {
          break;
        }
      }
    }

    return bestScore;
  } else {
    let bestScore = Infinity;

    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "X";
        let score = minimax(board, depth + 1, true, alpha, beta);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
        beta = Math.min(beta, bestScore);

        if (beta <= alpha) {
          break;
        }
      }
    }

    return bestScore;
  }
}

function getWinner() {
  for (let pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (board.every((cell) => cell !== "")) return "draw";

  return null;
}

function getWinningPattern() {
  for (let pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return pattern;
    }
  }
  return null;
}

function highlightWinner(pattern) {
  pattern.forEach((index) => {
    const cell = document.querySelector(`[data-index='${index}']`);
    cell.classList.add("winner");
  });
}

function resetGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;

  statusEl.textContent = "Player X's turn";

  saveGame();
  init();
}

modeSelect.addEventListener("change", () => {
  gameMode = modeSelect.value;
  updateDifficultyVisibility();
  resetGame();
});

difficultySelect.addEventListener("change", () => {
  difficulty = difficultySelect.value;
  resetGame();
});

function updateDifficultyVisibility() {
  if (gameMode === "ai") {
    difficultySelect.style.display = "block";
  } else {
    difficultySelect.style.display = "none";
  }
}

loadGame();
init();
updateDifficultyVisibility();

if (gameMode === "ai" && currentPlayer === "O" && gameActive) {
  setTimeout(computerMove, 200);
}
