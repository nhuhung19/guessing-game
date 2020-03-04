//1. set the random number
let randomNumber = Math.ceil(Math.random() * 100); // get the random number between 0 to 1

//2. input box
let userGuess = document.getElementById('userInput')

userGuess.disabled = true

let resultArea = document.getElementById('resultArea')

let chanceArea = document.getElementById('chanceArea')

let btnGuess = document.getElementById('guessButton')

btnGuess.disabled = true

let guessHistory = document.getElementById('guessHistory')

let resetButton = document.getElementById('resetButton')

resetButton.disabled = true

let btnStart = document.getElementById('btnStart')

let chance = 3

let history = []

let message = ''

let historyGames = []

// let exm ={ history, timer:5}

chanceArea.innerHTML = `Your chance is: ${chance}`

//3. when user click button
btnGuess.addEventListener("click", guess)
btnStart.addEventListener('click', startGame)
resetButton.addEventListener('click', resetAll)

let time = 30 // time start from 0
let myTime; // timer will be assign to this variable


function guess() {
    //3.a read a value input
    let userNumber = parseInt(userGuess.value)
        //3.b compare with user typed number


    document.getElementById('userInput').value = ""
    let checkNumber = history.indexOf(userNumber)
    if (checkNumber === -1) {
        history.push(userNumber)
        if (userNumber === randomNumber) {
            document.getElementById("guessButton").disabled = true;
            message = "yeahhh correct!!! smart!!"
            guessHistory.innerHTML = `History ${history}`
            clearInterval(myTime)
        } else if (userNumber > randomNumber) {
            chance = chance - 1
            message = "Too high...guess again!!!"
            guessHistory.innerHTML = `History ${history}`
            gameOver()
            chanceArea.innerHTML = `Your chance is: ${chance}`
        } else if (userNumber < randomNumber) {
            chance = chance - 1
            message = "Too low...guess again!!!"
            guessHistory.innerHTML = `History ${history}`
            gameOver()
            chanceArea.innerHTML = `Your chance is: ${chance}`
        }
        //3.c show the result
        resultArea.innerHTML = `${message}`

    } else {
        resultArea.innerHTML = `You already type number ${userNumber}`
    }
}

function gameOver() {
    if (chance === 0) {
        message = "Game over!!!"
        document.getElementById("guessButton").disabled = true;
        clearInterval(myTime)
    }
    return message
}

function startGame() {
    clearInterval(myTime)
    userGuess.disabled = false
    resetButton.disabled = false
    btnGuess.disabled = false
    btnStart.disabled = true
    timecounting()

}

function resetAll() {
    btnGuess.disabled = true
    userGuess.disabled = true
    resetButton.disabled = true
    btnStart.disabled = false
    clearInterval(myTime)
    time = 30
    document.getElementById('timecount').innerHTML = `Available time: ${time}`
    randomNumber = Math.ceil(Math.random() * 100)
    document.getElementById('userInput').value = ""
    history = []
    guessHistory.innerHTML = `History ${history}`
    message = ''
    resultArea.innerHTML = `${message}`
    chance = 3
    chanceArea.innerHTML = `Your chance is: ${chance}`
}

function timecounting() {
    myTime = setInterval(() => {
            time -= 1
            document.getElementById('timecount').innerHTML = `Available time: ${time}`
            if (time == 0) {
                clearInterval(myTime)
                document.getElementById("guessButton").disabled = true;
                message = "Game over!!!"
                resultArea.innerHTML = `${message}`
            }
        }, 1000) // every 1 second, it will add 1 into time variable (computer use millisecond so 1000 is 1 second)
}