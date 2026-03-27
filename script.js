const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const cells = Array.from(document.querySelectorAll(".cell"));

let boardState;
let currentPlayer;
let gameActive;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function initGame() {
  boardState = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.className = "cell";
    cell.disabled = false;
  });

  statusText.textContent = "Player X's turn";
}

function handleMove(index) {
  if (!gameActive || boardState[index]) return;

  boardState[index] = currentPlayer;

  const cell = cells[index];
  cell.textContent = currentPlayer;
  cell.classList.add("taken", currentPlayer.toLowerCase());

  const winnerLine = getWinningLine();
  if (winnerLine) {
    gameActive = false;
    winnerLine.forEach((i) => cells[i].classList.add("win"));
    statusText.textContent = `Player ${currentPlayer} wins!`;
    return;
  }

  if (boardState.every((cell) => cell !== "")) {
    gameActive = false;
    statusText.textContent = "It's a draw!";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function getWinningLine() {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      return pattern;
    }
  }
  return null;
}

board.addEventListener("click", (e) => {
  const cell = e.target.closest(".cell");
  if (!cell) return;

  const index = Number(cell.dataset.index);
  handleMove(index);
});

restartBtn.addEventListener("click", initGame);

initGame();
