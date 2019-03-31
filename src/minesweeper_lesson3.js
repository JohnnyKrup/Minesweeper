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
    bombArr = [];
    while(numBombPlaced < bombs){
        let randomRowIndex;
        let randomColIndex;
        do {
            randomRowIndex = randomInt(numRows);
            randomColIndex = randomInt(numCols);
        } while (bombArr.includes([randomRowIndex, randomColIndex]) == true);
            
        board[randomRowIndex][randomColIndex] = 'B';
        bombArr.push([randomRowIndex, randomColIndex]);
                
        numBombPlaced++;
    }

    return board;
}

const printBoard = board => {
    let printBoard = board.map(row => row.join(' | ')).join('\n');
    return printBoard;
}


console.log('\n-- player board --\n');
console.log(printBoard(generatePlayerBoard(3, 4)));
console.log('\n-- bomb board --\n');
console.log(printBoard(generateBombBoard(3, 4, 5)));