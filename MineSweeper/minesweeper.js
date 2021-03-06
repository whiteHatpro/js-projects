class Bd {
    constructor(numberOfRows, numberOfColumns, nb) {
        this._numberOfRows = numberOfRows;
        this._numberOfColumns = numberOfColumns;
        this._nb = nb;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._p = Bd.generatePlayerBoard(numberOfRows, numberOfColumns);   
        this._bombBoard = Bd.generateBombBoard(numberOfRows, numberOfColumns);   
    }
    
    get playerBoard() {
        return this._p;
    }
    
    flipTile(rowIndex, columnIndex) {
        if (this._p[rowIndex][columnIndex] !== ' ') {
            console.log('This tile has already been flipped!');
            return;
        } else if (bombBoard[rowIndex][columnIndex] === 'B') {
            this._p[rowIndex][columnIndex] = 'B';
        } else {
            this._p[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        }
        this._numberOfTiles--;   
    }
    
    getNumberOfNeighborBombs(rowIndex, columnIndex) {
        let neighborOffsets = [ [-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1] ];
        let numberOfRows = this._bombBoard.length;
        let numberOfColumns = this._bombBoard[0].length;
        this._nb = 0;
        neighborOffsets.forEach(offset => {
            let neighborRowIndex = rowIndex + offset[0];
            let neighborColumnIndex = columnIndex + offset[1];
            if (neighborRowIndex >= 0 && neighborRowIndex <= this._numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= this._numberOfColumns) {
                if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                    this._nb += 1;
                }
            }
        });
        return this._nb;
    }
}





const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
    let board = [];
    for (let i = 0; i < numberOfRows; i++) {
        let row = [];
        for (let j = 0; j < numberOfColumns; j++) {
            row.push(' ');
        }
        board.push(row);
    }
    return board;
};

const generateBombBoard = (numberOfRows, numberOfColumns, nb) => {
    let board = [];
    for (let i = 0; i < numberOfRows; i++) {
        let row = [];
        for (let j = 0; j < numberOfColumns; j++) {
            row.push(null);
        }
        board.push(row);
    }

    let nbPlaced = 0;
    while (nbPlaced <= nb) { 
        
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
            board[randomRowIndex][randomColumnIndex] = 'B';
            nbPlaced += 1;   
        }
    }
    return board;
};

const printBoard = (board) => {
    console.log(board.map(row => row.join(' | ')).join('\n'));
};

let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);


console.log('Updated Player Board');
printBoard(playerBoard);