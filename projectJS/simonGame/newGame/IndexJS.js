
const yellow = document.getElementById("yellow");
const green = document.getElementById("green");
const blue = document.getElementById("blue");
const red = document.getElementById("red");
const startButton = document.getElementById("startButton");
const endButton = document.getElementById("endButton");
const count = document.getElementById("count")


isPlayerTurn = false;
let successfulRounds = 0;

endButton.addEventListener('click', () => {
    resetGame()
    count.innerText = ""
    startButton.disabled = false
    isPlayerTurn = false;
})

startButton.addEventListener('click', () => {
    resetGame()
    count.innerText = "-"
    setTimeout(() => {
        playPattern();
    }, 800)
    startButton.disabled = true
})

let computerPatternArry = []

function addOne() {
    let randomFlash = Math.floor(Math.random() * 4) + 1;
    computerPatternArry.push(randomFlash);

    console.log("current : ", computerPatternArry);
    console.log("good round", successfulRounds);


}

function playPattern() {
    isPlayerTurn = false;

    addOne()
    for (let i = 0; i < computerPatternArry.length; i++) {
        setTimeout(() => {
            let colorIndex = computerPatternArry[i];
            flashButton(colorIndex);
        }, i * 800);
    }
    setTimeout(() => {
        isPlayerTurn = true;
    }, computerPatternArry.length * 500);


}

function flashButton(colorIndex) {
    switch (colorIndex) {
        case 1:
            green.style.backgroundColor = "lightgreen";
            setTimeout(() => green.style.backgroundColor = "darkgreen", 400)
            let audio1 = document.getElementById("clip1");
            audio1.play();
            break;
        case 2:
            red.style.backgroundColor = "tomato";
            setTimeout(() => red.style.backgroundColor = "red", 400)
            let audio2 = document.getElementById("clip2");
            audio2.play();
            break;
        case 3:
            yellow.style.backgroundColor = "lightyellow";
            setTimeout(() => yellow.style.backgroundColor = "yellow", 400)
            let audio3 = document.getElementById("clip3");
            audio3.play();
            break;
        case 4:
            blue.style.backgroundColor = "lightskyblue";
            setTimeout(() => blue.style.backgroundColor = "blue", 400)
            let audio4 = document.getElementById("clip4");
            audio4.play();
            break;
    }
}


green.addEventListener("click", () => handlePlayerClick(1));
red.addEventListener("click", () => handlePlayerClick(2));
yellow.addEventListener("click", () => handlePlayerClick(3));
blue.addEventListener("click", () => handlePlayerClick(4));


let playerTurnArry = []

function handlePlayerClick(colorIndex) {
    if (!isPlayerTurn) return;

    console.log("Player clicked:", colorIndex);

    flashButton(colorIndex)

    let currentStep = playerTurnArry.length;
    if (colorIndex === computerPatternArry[currentStep]) {
        playerTurnArry.push(colorIndex);


        if (playerTurnArry.length === computerPatternArry.length) {
            isPlayerTurn = false;
            successfulRounds++
            count.innerText = successfulRounds

            if (successfulRounds === 20) {
                win();
                return;
            }

            playerTurnArry = [];
            setTimeout(() => {
                playPattern();
            }, 1000);
        }

    } else {
        count.innerText = "WRONG"
        setTimeout(() => {
            resetGame();
        }, 1000)
    }
}

function resetGame() {
    startButton.disabled = false
    count.innerText = "-";
    computerPatternArry.length = 0
    playerTurnArry.length = 0
    successfulRounds = 0
    isPlayerTurn = false;
}


function win() {
    count.innerText = "WIN";
    startButton.disabled = false
    isPlayerTurn = false;
    computerPatternArry = [];
    playerTurnArry = [];
}

