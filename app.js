

let isStarted = false;
const board = document.getElementById('board');
const rows = 6;
const cols = 7;
let currentPlayer = 'red';


// creates my board
for(let row = 0; row < rows; row++){
    for(let col = 0; col < cols; col++){
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.col = col;
        board.appendChild(cell)
    }
};

function getLowestEmptyCell(col){
    for (let row =rows -1; row >= 0; row--){
        const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        if (!cell.classList.contains('red') && !cell.classList.contains('yellow')) {
            return {row, col};
        }
    }
    return null; //full
};


document.getElementById('start').addEventListener('click', () => {
    if (!isStarted) {
        isStarted = true;
        document.getElementById('startDisplay').style.display = 'block';
        startGame(); //calls game
    }
});

document.getElementById('restart').addEventListener('click', () => {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('red', 'yellow');
        if (cell.querySelector('img')){
            cell.removeChild(cell.querySelector('img'));
        }
    });
    currentPlayer = 'red'
    isStarted = false;
    document.getElementById('startDisplay').style.display = 'none';
    board.removeEventListener('click', boardClickHandler);
});




function placePiece(row, col, color){
    const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    if (!cell || cell.querySelector('img')) return;

    cell.classList.add(color);

    const img = document.createElement('img');
    img.src =color === 'red' ? 'images/ghost_2.png' : 'images/ghost_1.png';
    img.alt = color + ' chip'
    cell.appendChild(img);
};

function startGame(){
    board.addEventListener('click', boardClickHandler)
};


function boardClickHandler(event) {
    const target = event.target.closest('.cell');
    if (!target) return;

    const col = parseInt(target.dataset.col);
    const pos = getLowestEmptyCell(col);
    if (!pos) return; // column full

    placePiece(pos.row, pos.col, currentPlayer);
    if (checkWin(pos.row, pos.col, currentPlayer)) {
        document.getElementById('winMessage').textContent =
            currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1) + ' wins!';
        board.removeEventListener('click', boardClickHandler);
        return;
    }
    currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
}

function checkWin(row, col, color) {
    function count(dirRow, dirCol){
        let r = row + dirRow;
        let c = col + dirCol;
        let count = 0;
        while (
            r >= 0 && r < rows &&
            c >= 0 && c < cols &&
            document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`).classList.contains(color)
        ){
            count++;
            r += dirRow;
            c += dirCol;
        }
        return count;
    }
    //Horizontal
    if (count(0, -1) + 1 + count(0, 1) >= 4) return true;
    // Vertical
    if (count(-1, 0) + 1 + count(1, 0) >= 4) return true;
    // Diagonal /
    if (count(-1, 1) + 1 + count(1, -1) >= 4) return true;
    // Diagonal \
    if (count(-1, -1) + 1 + count(1, 1) >= 4) return true;

    return false;
}