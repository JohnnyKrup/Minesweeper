/* class to make player moves 
 and determines if the game is finished or not */
class Game {
    constructor(numberOfRows, numberOfColumns, numberOfBombs){
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }

    playMove(rowIndex, colIndex){
        this._board.flipTile(rowIndex, colIndex);
        if(this._board.playerBoard[rowIndex][colIndex] === 'B'){
            console.log('GAME OVER');
            console.log(this._board.print());
        } else if(!this._board.hasSafeTiles){
            console.log('YOU WON!');
        } else {
            console.log('Current Board:');
            console.log(this._board.print());
        }
    }
}

/* Class that generates a board, 
defines the size of the board and the number of bombs */
class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs){
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }

    get playerBoard(){
        return this._playerBoard;
    }

    get bombBoard(){
        return this._bombBoard;
    }

    flipTile(rowIndex, colIndex){
        if(rowIndex < 0 || rowIndex >= this._playerBoard.length
            || colIndex < 0 || colIndex >= this._playerBoard[0].length){
                console.log('EPIC FAIL!\nYou tried to flip a tile outside of the game board!');
                return;
        }
        else if(this._playerBoard[rowIndex][colIndex] !== ' '){
            console.log('This tile has already been flipped!');
            return;
        } else if(this._bombBoard[rowIndex][colIndex] === 'B'){
            this._playerBoard[rowIndex][colIndex] = 'B';
        } else {
            this._playerBoard[rowIndex][colIndex] = this.getNumberofNeighborBombs(rowIndex, colIndex);
        }
        this._numberOfTiles--;
    }

    getNumberofNeighborBombs(rowIndex, colIndex){
        const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
        const numOfRows = this._bombBoard.length;
        const numOfCols = this._bombBoard[0].length;
        let numOfBombs = 0;
    
        neighborOffsets.forEach(offset => {
            const neighborRowIndex = rowIndex + offset[0];
            const neighborColIndex = colIndex + offset[1];
    
            if(neighborRowIndex >= 0 && neighborRowIndex < numOfRows
                && neighborColIndex >= 0 && neighborColIndex < numOfCols){
                
                    if(this._bombBoard[neighborRowIndex][neighborColIndex] === 'B'){
                        numOfBombs++;
                    }
            }
        });
        return numOfBombs;
    }

    hasSafeTiles(){
        return this._numberOfTiles !== this._numberOfBombs;
    }

    print(){
        return this._playerBoard.map(row => row.join(' | ')).join('\n');        
    }

    static generatePlayerBoard(numRows, numCols){
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

    static randomInt(num){
        return Math.floor(Math.random() * num);
    }
    
    static generateBombBoard(numRows, numCols, bombs){
        let board = [];
        for(let i = 0; i < numRows; i++){
            let row = [];
            for(let j = 0; j < numCols; j++){
                row.push(null);
            }
            board.push(row);
        }
    
        let numBombPlaced = 0;
        while(numBombPlaced < bombs){
            let randomRowIndex = Board.randomInt(numRows);
            let randomColIndex = Board.randomInt(numCols);
            if(board[randomRowIndex][randomColIndex] !== 'B'){
                board[randomRowIndex][randomColIndex] = 'B';
                numBombPlaced++;
            }       
        }
        return board;
    }
}


const g = new Game(3, 3, 3);
g.playMove(0,0);