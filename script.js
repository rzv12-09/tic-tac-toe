
function Cell(player) {
    let value = "";

    const markCell = (player) => {
        value = player;
    }

    const getValue = ()=> value;
    return {
        markCell,
        getValue
    };
}

const GameBoard = (() => {
    const board = [];

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const chooseCell = (player,row,column) => {
        const selectedCell = board[row][column];
        if(selectedCell.getValue()){
            console.log("Cell has already been chosen")
            return;
        } 
        selectedCell.markCell(player);
    }

    const printBoard = () => {
        for (let i = 0; i < 3; i++) {
            let rowPrint = "| "
            for (let j = 0; j < 3; j++) {
                rowPrint += board[i][j].getValue() + " | ";
            }
            console.log(rowPrint);
            console.log("-------------");
        }
    }

    return {
        getBoard,
        chooseCell,
        printBoard
    }
})();

GameBoard.chooseCell("X",1,2);
GameBoard.printBoard();


//
//
//  0 0 0   0
//  0 0 0   1
//  0 0 0   2
// 
//  0 1 2
//