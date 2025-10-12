
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
        selectedCell.markCell(player.getMark());
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
});

function Player(name,mark){
    const playerName = name;
    const playerMark = mark
    
    const getName = () => playerName;
    const getMark = () => playerMark;

    return {
        getName,
        getMark
    }
}

const GameController =  (() => {
    const playerOne = Player("rzv","X");
    const playerTwo = Player("Niko","0");
    const board = GameBoard();

    let currentPlayer = playerOne;

    const switchCurrentPlayer = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }

    const getCurrentPlayer = () => currentPlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getCurrentPlayer().getName()}' turn.`);
    }

    const playRound = (row,column) =>{
        board.chooseCell(currentPlayer,row,column);
        //check for winner/tie
        switchCurrentPlayer();
        printNewRound();
    }

    printNewRound();

    return {
        getCurrentPlayer,
        playRound,
    }
})();



//
//
//  0 0 0   0
//  0 0 0   1
//  0 0 0   2
// 
//  0 1 2
//