// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

import { Board } from './board';

/* class to make player moves 
 and determines if the game is finished or not */
 class Game {
    constructor(numberOfRows, numberOfColumns, numberOfBombs){
        if(numberOfBombs > numberOfRows * numberOfColumns){
            console.log('The number of bombs is larger than the available tiles!\nThe board could not be generated');
            console.log('Create a new Game or exit the current Game');
            return;
        }
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
        this._startTime = Date.now();
        console.log('Game Start: ' + this._startTime);
    }

    playTime(){
        return Math.floor((Date.now() - this._startTime)/1000);
    }

    playTimeFormatted(){
        let min = 0;
        let sec = this.playTime();
        if(sec > 60){
            min = Math.floor(sec/60);
            sec = (sec/60 - min) * 60;
            return 'You played ' + min + ' min & ' + sec + ' sec';
        }
        return 'You played ' + sec + ' sec';
    }

    playMove(rowIndex, colIndex){
        this._board.flipTile(rowIndex, colIndex);
        if(this._board.playerBoard[rowIndex][colIndex] === 'B'){
            console.log('GAME OVER');
            console.log(this.playTimeFormatted());
            console.log(this._board.print());
        } else if(this._board.hasSafeTiles === false){
            console.log('YOU WON!');
            console.log(this.playTimeFormatted());
        } else {
            console.log('Current Board:');
            console.log(this._board.print());
        }
    }
}