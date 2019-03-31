'use strict';

// function to create the board
var printBoard = function printBoard(board) {
    console.log('Current Board:');
    for (var i = 0; i < board.length; i++) {
        console.log(board[i].join(' | '));
    }
};

var boardSize = function boardSize(num) {
    var space = ' ';
    var spearator = ' | ';
    var board = [];
    var row = [];
    for (var i = 0; i < num; i++) {
        for (var j = 0; j < num; j++) {
            row[j] = space;
        }
        board[i] = row.join(spearator);
        console.log(board[i]);
    }
    return board;
};

// board size
var board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];

printBoard(board);

// set hard coded values
board[0][1] = '1';
board[2][2] = 'B';

printBoard(board);

console.log('------- Dynamic Board 3x3 ------');
boardSize(3);
console.log('------- Dynamic Board 4x4 ------');
boardSize(4);