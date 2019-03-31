'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* Class that generates a board, 
defines the size of the board and the number of bombs */
var Board = exports.Board = function () {
    function Board(numberOfRows, numberOfColumns, numberOfBombs) {
        _classCallCheck(this, Board);

        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }

    _createClass(Board, [{
        key: 'flipTile',
        value: function flipTile(rowIndex, colIndex) {
            if (rowIndex < 0 || rowIndex >= this._playerBoard.length || colIndex < 0 || colIndex >= this._playerBoard[0].length) {
                console.log('EPIC FAIL!\nYou tried to flip a tile outside of the game board!');
                return;
            } else if (this._playerBoard[rowIndex][colIndex] !== ' ') {
                console.log('This tile has already been flipped!');
                return;
            } else if (this._bombBoard[rowIndex][colIndex] === 'B') {
                this._playerBoard[rowIndex][colIndex] = 'B';
            } else {
                this._playerBoard[rowIndex][colIndex] = this.getNumberofNeighborBombs(rowIndex, colIndex);
            }
            this._numberOfTiles--;
        }
    }, {
        key: 'getNumberofNeighborBombs',
        value: function getNumberofNeighborBombs(rowIndex, colIndex) {
            var _this = this;

            var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
            var numOfRows = this._bombBoard.length;
            var numOfCols = this._bombBoard[0].length;
            var numOfBombs = 0;

            neighborOffsets.forEach(function (offset) {
                var neighborRowIndex = rowIndex + offset[0];
                var neighborColIndex = colIndex + offset[1];

                if (neighborRowIndex >= 0 && neighborRowIndex < numOfRows && neighborColIndex >= 0 && neighborColIndex < numOfCols) {

                    if (_this._bombBoard[neighborRowIndex][neighborColIndex] === 'B') {
                        numOfBombs++;
                    }
                }
            });
            return numOfBombs;
        }
    }, {
        key: 'hasSafeTiles',
        value: function hasSafeTiles() {
            return this._numberOfTiles !== this._numberOfBombs;
        }
    }, {
        key: 'print',
        value: function print() {
            return this._playerBoard.map(function (row) {
                return row.join(' | ');
            }).join('\n');
        }
    }, {
        key: 'playerBoard',
        get: function get() {
            return this._playerBoard;
        }
    }, {
        key: 'bombBoard',
        get: function get() {
            return this._bombBoard;
        }
    }], [{
        key: 'generatePlayerBoard',
        value: function generatePlayerBoard(numRows, numCols) {
            var board = [];
            for (var i = 0; i < numRows; i++) {
                var row = [];
                for (var j = 0; j < numCols; j++) {
                    row.push(' ');
                }
                board.push(row);
            }
            return board;
        }
    }, {
        key: 'randomInt',
        value: function randomInt(num) {
            return Math.floor(Math.random() * num);
        }
    }, {
        key: 'generateBombBoard',
        value: function generateBombBoard(numRows, numCols, bombs) {
            var board = [];
            for (var i = 0; i < numRows; i++) {
                var row = [];
                for (var j = 0; j < numCols; j++) {
                    row.push(null);
                }
                board.push(row);
            }

            var numBombPlaced = 0;
            while (numBombPlaced < bombs) {
                var randomRowIndex = Board.randomInt(numRows);
                var randomColIndex = Board.randomInt(numCols);
                if (board[randomRowIndex][randomColIndex] !== 'B') {
                    board[randomRowIndex][randomColIndex] = 'B';
                    numBombPlaced++;
                }
            }
            return board;
        }
    }]);

    return Board;
}();