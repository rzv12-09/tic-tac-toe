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
        resetBoard,
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
    const resetScore = () => playerScore = 0;

    return {
        getName,
        getMark,
        getScore,
        incrementScore,
        resetScore
    }
}

const GameController = (name1 = "Player One", name2 = "Player Two") => {
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
            return -1;
        }
        if (board.checkWin(currentPlayer.getMark())) {
            board.printBoard();
            console.log(`${currentPlayer.getName()} has won the game!`);
            currentPlayer.incrementScore();
            printScore();
            //board.resetBoard();
            return 1;
        }

        if (board.isTie()) {
            console.log("Is tie");
            //board.resetBoard();
            return 2;
        }
        switchCurrentPlayer();
        printNewRound();
    }

    const getBoard = () => board.getBoard();
    const playersArray = [];
    playersArray.push(playerOne, playerTwo);

    const getPlayers = () => playersArray;
    const resetBoard = () => board.resetBoard();
    const resetGame = () => {
        board.resetBoard();
        playerOne.resetScore();
        playerTwo.resetScore();
        currentPlayer = playerOne;
    }

    printNewRound();

    return {
        getCurrentPlayer,
        playRound,
        getBoard,
        getPlayers,
        resetBoard,
        resetGame
    }
};

const ScreenController = (() => {
    const playerNames = document.querySelectorAll("input");
    const turnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");
    const invalidMoveDiv = document.querySelector(".invalid-move");
    const scoreboardDiv = document.querySelector(".scoreboard");
    const nextBtn = document.querySelector("#nextBtn");
    const resetBtn = document.querySelector("#resetBtn");

    const game = GameController(playerNames[0].value, playerNames[1].value);

    let gameActive = true;

    const updateScreen = () => {
        boardDiv.textContent = "";
        scoreboardDiv.textContent = "";
        invalidMoveDiv.textContent = ""

        const board = game.getBoard();
        const currentPlayer = game.getCurrentPlayer();
        const playersArray = game.getPlayers();

        const playerOneScoreDiv = document.createElement("p"); 
        playerOneScoreDiv.textContent = `${playersArray[0].getName()}'s score: ${playersArray[0].getScore()}`;
        scoreboardDiv.appendChild(playerOneScoreDiv);

        const playerTwoScoreDiv = document.createElement("p");
        playerTwoScoreDiv.textContent += `${playersArray[1].getName()}'s score: ${playersArray[1].getScore()}`;
        scoreboardDiv.appendChild(playerTwoScoreDiv);

        if(gameActive === true)
            turnDiv.textContent = `${currentPlayer.getName()}'s turn`;

        board.forEach((row, rIndex) => {
            row.forEach((column, cIndex) => {
        
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.textContent = column.getValue();
                boardDiv.appendChild(cellButton);

                if(gameActive === false)
                    return;
                cellButton.addEventListener("click", (e) => {
                    result = game.playRound(rIndex, cIndex);
                    if (result === -1) {
                        invalidMoveDiv.textContent = "Choose another cell!";
                        return;
                    }
                    if (result === 1) {
                        turnDiv.textContent = `${currentPlayer.getName()} has won the game!`;
                        gameActive = false;
                        updateScreen();
                        return;
                    }
                    if (result === 2) {
                        turnDiv.textContent = `It's a tie!`;
                        gameActive = false;
                        updateScreen();
                        return;
                    }
                    updateScreen();

                })
            })
        });

        
    };

    nextBtn.addEventListener("click",()=>{
        if (gameActive === false){
            game.resetBoard();
            gameActive = true;
            updateScreen();
        }
    })
    
    resetBtn.addEventListener("click",()=>{
        game.resetGame();
        gameActive = true;
        updateScreen();
    })

    updateScreen();

    return {
        updateScreen,
    }
});

const startGameBtn = document.getElementById("start-game");
startGameBtn.addEventListener("click", () => {
    const menuCard = document.querySelector(".player-names-card");
    const gameContainer = document.querySelector(".game-container");
    menuCard.style.display = "none";
    gameContainer.style.display = "flex";
    ScreenController();
})