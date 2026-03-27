const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let cells = [];
let currentPlayer = "X";
let gameActive = true;

// Winning patterns
const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// Create board
function createBoard() {
  board.innerHTML = "";
  cells = [];

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;

    cell.addEventListener("click", handleMove);

    board.appendChild(cell);
    cells.push(cell);
  }
}

// Handle move
function handleMove(e) {
  const cell = e.target;

  if (!gameActive || cell.textContent !== "") return;

  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  if (checkWin()) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (cells.every(cell => cell.textContent !== "")) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Check win
function checkWin() {
  return winPatterns.some(pattern => {
    return pattern.every(index => {
      return cells[index].textContent === currentPlayer;
    });
  });
}

// Restart game
restartBtn.addEventListener("click", () => {
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's Turn";
  createBoard();
});

// Init
createBoard();
