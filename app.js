

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
    board.addEventListener('click', (event) => {
        const target = event.target.closest('.cell');
        if (!target) return;

        const col = parseInt(target.dataset.col);
        const pos = getLowestEmptyCell(col);
        if (!pos) return; // column full

        placePiece(pos.row, pos.col, currentPlayer);
        currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
    })
};


