const generatePlayerBoard = (numRows, numCols) => {
    let board = [];
    for(let i = 0; i < numRows; i++){
        let row = [];
        for(let j = 0; j < numCols; j++){
            row.push(' ');
        }
        board.push(row);
    }
    return board;
}

const randomInt = num => {
    return Math.floor(Math.random() * num);
}

const generateBombBoard = (numRows, numCols, bombs) => {
    let board = [];
    for(let i = 0; i < numRows; i++){
        let row = [];
        for(let j = 0; j < numCols; j++){
            row.push(null);
        }
        board.push(row);
    }

    numBombPlaced = 0;
    while(numBombPlaced < bombs){
        let randomRowIndex = randomInt(numRows);
        let randomColIndex = randomInt(numCols);
        if(board[randomRowIndex][randomColIndex] !== 'B'){
            board[randomRowIndex][randomColIndex] = 'B';
            numBombPlaced++;
        }       
    }
    return board;
}

const getNumberofNeighborBombs = (bombBoard, rowIndex, colIndex) => {
    const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    const numOfRows = bombBoard.length;
    const numOfCols = bombBoard[0].length;
    let numOfBombs = 0;

    neighborOffsets.forEach(offset => {
        const neighborRowIndex = rowIndex + offset[0];
        const neighborColIndex = colIndex + offset[1];

        if(neighborRowIndex >= 0 && neighborRowIndex < numOfRows
            && neighborColIndex >= 0 && neighborColIndex < numOfCols){
            
                if(bombBoard[neighborRowIndex][neighborColIndex] === 'B'){
                    numOfBombs++;
                }
        }
    });
    return numOfBombs;
}

const flipTile = (playerBoard, bombBoard, rowIndex, colIndex) => {
    if(rowIndex < 0 || rowIndex >= playerBoard.length
        || colIndex < 0 || colIndex >= playerBoard[0].length){
            console.log('EPIC FAIL!\nYou tried to flip a tile outside of the game board!');
            return;
    }
    else if(playerBoard[rowIndex][colIndex] !== ' '){
        console.log('This tile has already been flipped!');
        return;
    } else if(bombBoard[rowIndex][colIndex] === 'B'){
        playerBoard[rowIndex][colIndex] = 'B';
    } else {
        playerBoard[rowIndex][colIndex] = getNumberofNeighborBombs(bombBoard, rowIndex, colIndex);
    }
}

const printBoard = board => {
    let printBoard = board.map(row => row.join(' | ')).join('\n');
    return printBoard;
}

let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);

console.log('\n-- player board --\n');
console.log(printBoard(playerBoard));
console.log('\n-- bomb board --\n');
console.log(printBoard(bombBoard));
console.log('\n-- flip tile 0/0 --\n');
flipTile(playerBoard, bombBoard, 0, 0);
console.log('\n-- Update Player Board: --\n');
console.log(printBoard(playerBoard));
console.log('\n-- flip tile 2/3 --\n');
flipTile(playerBoard, bombBoard, 1, 2);
console.log('\n-- Update Player Board: --\n');
console.log(printBoard(playerBoard));