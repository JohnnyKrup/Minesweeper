// function to create the board
const printBoard = board => {
    console.log('Current Board:');
    for(let i = 0; i < board.length; i++){
        console.log(board[i].join(' | '));
    }
};

const boardSize = num => {
    const space = ' ';
    const spearator = ' | ';
    const board = [];
    let row = [];
    for(let i = 0; i < num; i++){
        for(let j = 0; j < num; j++){
            row[j] = space;
        }
        board[i] = row.join(spearator);
        console.log(board[i]);
    }
    return board;
}

// board size
const board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];

printBoard(board);

// set hard coded values
board[0][1] = '1';
board[2][2] = 'B';

printBoard(board);

console.log('------- Dynamic Board 3x3 ------');
boardSize(3);
console.log('------- Dynamic Board 4x4 ------');
boardSize(4);