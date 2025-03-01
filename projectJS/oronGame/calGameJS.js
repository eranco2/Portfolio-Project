const buttonModes1 = document.querySelectorAll("#containerModes");
let operatorLevel = document.getElementById("selectOperator");

const number1 = document.getElementById('number1');
const number2 = document.getElementById('number2');
const result = document.getElementById('result');
const check = document.getElementById('send');
const operator = document.getElementById('operators');
const points = document.getElementById('countPoints');
const incentives = document.getElementById('incentive');
const wrongAlert = document.getElementById('wrong');
const alerts = document.getElementById('alert');
const memoryTable = document.getElementById('resultsMemory');
const bodyTableMemory = document.getElementById('bodyTable');

let selectedValue = "";
let xp = 0;
let correctAnswerPoints = 0;
let wrongAnswerPoints = 0;

function generateRandomNumber(min, max) { // פונקציה להגרלה רנדומלית של מספר.
    number1.innerText = Math.round(Math.random() * (max - min) + min);
    number2.innerText = Math.round(Math.random() * (max - min) + min);
    operator.innerText = whichOperatr()
}


operatorLevel.addEventListener("change", (e) => {
    operatorLevel = e.target.value;
    whichDifficultyMode();
})

const easyOperators = ["+", "-"]; // מערך של האופרטורים
const hardOperators = ["*", "/"];
const allOperator = [...easyOperators, ...hardOperators]
function whichOperatr() {
    if (operatorLevel === "+&-") {
        const randomOperator = Math.floor(Math.random() * easyOperators.length)
        return easyOperators[randomOperator]
    } else if (operatorLevel === "*&/") {
        const randomOperator = Math.floor(Math.random() * hardOperators.length)
        return hardOperators[randomOperator]
    } else if (operatorLevel === "all") {
        const randomOperator = Math.floor(Math.random() * allOperator.length);
        return allOperator[randomOperator]
    } else {
        const randomOperator = Math.floor(Math.random() * allOperator.length);
        return allOperator[randomOperator]
    }
}

// ...........................................................


function whichDifficultyMode() { // קורא לפונקציה לפי רמות קושי
    switch (selectedValue) {
        case "easy":
            generateRandomNumber(1, 10);
            break;
        case "medium":
            generateRandomNumber(10, 100);
            break;
        case "hard":
            generateRandomNumber(100, 1000);
            break;
    }
}

containerModes.addEventListener("click", (event) => { // מחבר בין הכפתור לפונקציה
    if (event.target.tagName === "BUTTON") {
        if (wrongAnswerPoints >= 5) {
            resetGame();
        }
        selectedValue = event.target.value;
        whichDifficultyMode(selectedValue);
    }
})

check.addEventListener("click", () => {
    check.disabled = true; // מבטל את הכפתור לאחר התחלת הפונקציה

    const num1 = Number(number1.innerText);
    const num2 = Number(number2.innerText);
    const currentOperator = operator.innerText;
    switch (currentOperator) {
        case "+":
            correctAnswer = num1 + num2;
            break;
        case "-":
            correctAnswer = num1 - num2;
            break;
        case "*":
            correctAnswer = num1 * num2;
            break;
        case "/":
            correctAnswer = parseFloat((num1 / num2).toFixed(2));
            break;

    }


    if (Number(result.value) === Number(correctAnswer)) {
        console.log("good job");
        xp += 1;
        correctAnswerPoints += 1;
        levelUP()
        points.innerText = `נקודות :${correctAnswerPoints}/10`
    } else {
        wrongAnswerPoints += 1
        if (wrongAnswerPoints === 4) {
            wrongAlert.innerText = "...נותר לך נסיון אחרון";
        }
        else if (wrongAnswerPoints === 5) {
            endGame()
        }
        alerts.innerText = `טעות , התשובה היא ${correctAnswer} . יאללה תנסו שוב !`;
    }


    if (xp >= 7 && xp <= 9) {
        incentives.innerText = `כל הכבוד ! רק עוד ${10 - correctAnswerPoints} נקודות לשלב הבא`
    } else if (xp >= 17 && xp <= 19) {
        incentives.innerText = `כל הכבוד ! רק עוד ${10 - correctAnswerPoints} נקודות לשלב הבא`
    } else if (xp >= 27 && xp <= 29) {
        incentives.innerText = `כל הכבוד ! רק עוד ${10 - correctAnswerPoints} נקודות`
    } else { incentives.innerText = "" };

    memory(num1, currentOperator, num2, result, correctAnswer);
})



const repeatGame = check.addEventListener("click", () => {
    if (wrongAnswerPoints >= 5) {
        return;
    }
    setTimeout(() => {
        check.disabled = false;
        result.value = "";
        alerts.innerText = ""
        whichDifficultyMode(selectedValue);
    }, 1000);
})

function levelUP() {
    if (xp === 10) {
        selectedValue = "medium"
        alert("level up! medium");
    } else if (xp === 20) {
        selectedValue = "hard"
        alert("level up! hard");
    }
}

function endGame() {
    alert(`מצטערים יש לך 5 טעויות, התוצאה שלך היא ${correctAnswerPoints} תשובות נכונות`)
    check.disabled = true;
    alerts.innerText = "לחץ על אחת מרמות הקושי כדי להתחיל מחדש !"
}

function resetGame() {
    xp = 0;
    correctAnswerPoints = 0;
    wrongAnswerPoints = 0;

    check.disabled = false;

    points.innerText = `נקודות :${correctAnswerPoints}/10`;
    incentives.innerText = "";
    result.value = "";
    bodyTableMemory.innerHTML = "";
}


// הוספת זיכרון למשחק !
function memory(num1, currentOperator, num2, result, correctAnswer) {
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
    <td>${num1} ${currentOperator} ${num2} = ${result.value}</td>
    <td>${Number(result.value) === correctAnswer ? '✓' : ` ${correctAnswer}`}</td>
    `

    bodyTableMemory.appendChild(newRow);
};