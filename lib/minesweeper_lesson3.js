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
    bombArr = [];
    while (numBombPlaced < bombs) {
        var randomRowIndex = void 0;
        var randomColIndex = void 0;
        do {
            randomRowIndex = randomInt(numRows);
            randomColIndex = randomInt(numCols);
        } while (bombArr.includes([randomRowIndex, randomColIndex]) == true);

        board[randomRowIndex][randomColIndex] = 'B';
        bombArr.push([randomRowIndex, randomColIndex]);

        numBombPlaced++;
    }

    return board;
};

var printBoard = function printBoard(board) {
    var printBoard = board.map(function (row) {
        return row.join(' | ');
    }).join('\n');
    return printBoard;
};

console.log('\n-- player board --\n');
console.log(printBoard(generatePlayerBoard(3, 4)));
console.log('\n-- bomb board --\n');
console.log(printBoard(generateBombBoard(3, 4, 5)));