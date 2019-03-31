'use strict';

var generatePlayerBoard = function generatePlayerBoard(numRows, numCols) {
    var board = [];
    for (var i = 0; i < numRows; i++) {
        var row = [];
        for (var j = 0; j < numCols; j++) {
            row.push(' ');
        }
        board.push(row);
    }
    return board;
};

var randomInt = function randomInt(num) {
    return Math.floor(Math.random() * num);
};

var generateBombBoard = function generateBombBoard(numRows, numCols, bombs) {
    var board = [];
    for (var i = 0; i < numRows; i++) {
        var row = [];
        for (var j = 0; j < numCols; j++) {
            row.push(null);
        }
        board.push(row);
    }

    numBombPlaced = 0;
    while (numBombPlaced < bombs) {
        var randomRowIndex = randomInt(numRows);
        var randomColIndex = randomInt(numCols);
        if (board[randomRowIndex][randomColIndex] !== 'B') {
            board[randomRowIndex][randomColIndex] = 'B';
            numBombPlaced++;
        }
    }
    return board;
};

var getNumberofNeighborBombs = function getNumberofNeighborBombs(bombBoard, rowIndex, colIndex) {
    var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    var numOfRows = bombBoard.length;
    var numOfCols = bombBoard[0].length;
    var numOfBombs = 0;

    neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColIndex = colIndex + offset[1];

        if (neighborRowIndex >= 0 && neighborRowIndex < numOfRows && neighborColIndex >= 0 && neighborColIndex < numOfCols) {

            if (bombBoard[neighborRowIndex][neighborColIndex] === 'B') {
                numOfBombs++;
            }
        }
    });
    return numOfBombs;
};

var flipTile = function flipTile(playerBoard, bombBoard, rowIndex, colIndex) {
    if (rowIndex < 0 || rowIndex >= playerBoard.length || colIndex < 0 || colIndex >= playerBoard[0].length) {
        console.log('EPIC FAIL!\nYou tried to flip a tile outside of the game board!');
        return;
    } else if (playerBoard[rowIndex][colIndex] !== ' ') {
        console.log('This tile has already been flipped!');
        return;
    } else if (bombBoard[rowIndex][colIndex] === 'B') {
        playerBoard[rowIndex][colIndex] = 'B';
    } else {
        playerBoard[rowIndex][colIndex] = getNumberofNeighborBombs(bombBoard, rowIndex, colIndex);
    }
};

var printBoard = function printBoard(board) {
    var printBoard = board.map(function (row) {
        return row.join(' | ');
    }).join('\n');
    return printBoard;
};

var playerBoard = generatePlayerBoard(3, 4);
var bombBoard = generateBombBoard(3, 4, 5);

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