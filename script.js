
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

    const checkWin = (mark) => {
        let matchingCounter = 0;
        for(let i = 0 ; i < 3 ; i++){
            matchingCounter = 0;
            for(let j = 0; j < 3 ; j++){
                if(board[i][j].getValue() !== mark)
                    break;
                matchingCounter++;
            }
            if (matchingCounter === 3){
                return true;
            }
        }
        for(let j = 0 ; j < 3 ; j++){
            matchingCounter = 0;
            for(let i = 0; i < 3 ; i++){
                if(board[i][j].getValue() !== mark)
                    break;
                matchingCounter++;
            }
            if (matchingCounter === 3){
                return true;
            }
        }

        if (
            board[0][0].getValue() === mark &&
            board[1][1].getValue() === mark &&
            board[2][2].getValue() === mark
          )
            return true;
          
          if (
            board[0][2].getValue() === mark &&
            board[1][1].getValue() === mark &&
            board[2][0].getValue() === mark
          )
            return true;
        return false;
    }
//
//
//  x o x   0
//  o x 0   1
//  o x o   2
// 
//  0 1 2
//

    return {
        getBoard,
        chooseCell,
        printBoard,
        checkWin
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
        if(board.checkWin(currentPlayer.getMark())){
            board.printBoard();
            console.log(`${currentPlayer.getName()} has won the game!`);
            return;
        }
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
//  x o x   0
//  o x 0   1
//  o x o   2
// 
//  0 1 2
//