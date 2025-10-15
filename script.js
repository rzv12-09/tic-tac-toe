function Cell(player) {
    let value = "";

    const markCell = (player) => {
        value = player;
    }

    const getValue = () => value;
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

    const chooseCell = (player, row, column) => {
        const selectedCell = board[row][column];
        if (selectedCell.getValue()) {
            return -1;
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
        for (let i = 0; i < 3; i++) {
            matchingCounter = 0;
            for (let j = 0; j < 3; j++) {
                if (board[i][j].getValue() !== mark)
                    break;
                matchingCounter++;
            }
            if (matchingCounter === 3) {
                return true;
            }
        }
        for (let j = 0; j < 3; j++) {
            matchingCounter = 0;
            for (let i = 0; i < 3; i++) {
                if (board[i][j].getValue() !== mark)
                    break;
                matchingCounter++;
            }
            if (matchingCounter === 3) {
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

    const isTie = () => {
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                if (!board[i][j].getValue()) {
                    return false;
                }
        return true;
    }

    const resetBoard = () => {
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                board[i][j].markCell("");
    }

    return {
        getBoard,
        chooseCell,
        printBoard,
        checkWin,
        isTie,
        resetBoard
    }
});

function Player(name, mark) {
    const playerName = name;
    const playerMark = mark
    let playerScore = 0;

    const getName = () => playerName;
    const getMark = () => playerMark;
    const getScore = () => playerScore;
    const incrementScore = () => playerScore++;

    return {
        getName,
        getMark,
        getScore,
        incrementScore
    }
}

const GameController = ((name1 = "Player One",name2 = "Player Two") => {
    const playerOne = Player(name1, "X");
    const playerTwo = Player(name2, "0");
    const board = GameBoard();

    let currentPlayer = playerOne;

    const switchCurrentPlayer = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }

    const getCurrentPlayer = () => currentPlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getCurrentPlayer().getName()}'s turn.`);
    }

    const printScore = () => {
        console.log(`${playerOne.getName()}'s score: ${playerOne.getScore()}`);
        console.log(`${playerTwo.getName()}'s score: ${playerTwo.getScore()}`);
    }


    const playRound = (row, column) => {
        if (board.chooseCell(currentPlayer, row, column) === -1) {
            console.log("Please choose another cell!");
            return;
        }
        if (board.checkWin(currentPlayer.getMark())) {
            board.printBoard();
            console.log(`${currentPlayer.getName()} has won the game!`);
            currentPlayer.incrementScore();
            printScore();
            board.resetBoard();
            if(currentPlayer.getScore() < 3){
                switchCurrentPlayer();
                printNewRound();
            }
            return;
        }

        if (board.isTie()) {
            console.log("Is tie");
            board.resetBoard();
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

const startGameBtn = document.getElementById("start-game");
startGameBtn.addEventListener("click",()=>{
    const menuCard = document.querySelector(".player-names-card");
    const gameContainer = document.querySelector(".game-container");
    menuCard.style.display = "none";
    gameContainer.style.display = "flex";

})