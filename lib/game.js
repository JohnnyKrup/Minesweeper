'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

var _board = require('./board');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* class to make player moves 
 and determines if the game is finished or not */
var Game = function () {
    function Game(numberOfRows, numberOfColumns, numberOfBombs) {
        _classCallCheck(this, Game);

        if (numberOfBombs > numberOfRows * numberOfColumns) {
            console.log('The number of bombs is larger than the available tiles!\nThe board could not be generated');
            console.log('Create a new Game or exit the current Game');
            return;
        }
        this._board = new _board.Board(numberOfRows, numberOfColumns, numberOfBombs);
        this._startTime = Date.now();
        console.log('Game Start: ' + this._startTime);
    }

    _createClass(Game, [{
        key: 'playTime',
        value: function playTime() {
            return Math.floor((Date.now() - this._startTime) / 1000);
        }
    }, {
        key: 'playTimeFormatted',
        value: function playTimeFormatted() {
            var min = 0;
            var sec = this.playTime();
            if (sec > 60) {
                min = Math.floor(sec / 60);
                sec = (sec / 60 - min) * 60;
                return 'You played ' + min + ' min & ' + sec + ' sec';
            }
            return 'You played ' + sec + ' sec';
        }
    }, {
        key: 'playMove',
        value: function playMove(rowIndex, colIndex) {
            this._board.flipTile(rowIndex, colIndex);
            if (this._board.playerBoard[rowIndex][colIndex] === 'B') {
                console.log('GAME OVER');
                console.log(this.playTimeFormatted());
                console.log(this._board.print());
            } else if (this._board.hasSafeTiles === false) {
                console.log('YOU WON!');
                console.log(this.playTimeFormatted());
            } else {
                console.log('Current Board:');
                console.log(this._board.print());
            }
        }
    }]);

    return Game;
}();