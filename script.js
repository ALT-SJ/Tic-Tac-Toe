const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');
let board = Array(9).fill(null);
let currentPlayer = 'X';
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');

    if (board[index] || !isGameActive) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        message.textContent = `${currentPlayer} wins!`;
        isGameActive = false;
    } else if (board.every(cell => cell)) {
        message.textContent = 'Draw!';
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
}

function restartGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    isGameActive = true;
    cells.forEach(cell => cell.textContent = '');
    message.textContent = '';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
