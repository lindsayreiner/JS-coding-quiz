//DOM Elements

//Instruction page
var instructionPage = document.getElementById("intro-page");
var highscoreButton = document.getElementById("view-highscores");
var timeEl = document.getElementById("timer");
var startButton = document.getElementById("start-button");
var highscorePage = document.getElementById("highscores");
var timeInterval;

//Question page
var questionContainer = document.getElementById("questions-page");
var questionEl = document.getElementById("question");
var answerOne = document.getElementById("ans1");
var answerTwo = document.getElementById("ans2");
var answerThree = document.getElementById("ans3");
var answerFour = document.getElementById("ans4");

var answerCheck = document.getElementById("answer-check");

//Quiz end page
var quizEndPage = document.getElementById("end-quiz");
var submitName = document.getElementById("submit-name");
var endGameScore = document.getElementById("end-game-score");
var savedName = document.getElementById("player-name");
var highscoreNames = localStorage.getItem("player-name");
var highscoreList = document.getElementById("highscore-list");
// var previousScores = localStorage.getItem("")


//Highscore page
var goBackBtn = document.getElementById("hs-goback");
var clearHighscores = document.getElementById("hs-clear");

//questionLoop function variables
var currentQ = '';
var currentIndex = 0;

//Questions array

var questions = [
    {
        question: 'How does a computer read Javascript code?',
        choices: ['a. it goes in the order you tell it to go', 'b. bottom up', 'c. it executes functions before it reads anything else', 'd. top down'],
        correctAnswer: 'd. top down'
    },
    {
        question: 'How do you call a function named helloKitty?',
        choices: ['a. function helloKitty() =', 'b. helloKitty()', 'c. call.helloKitty()', 'd. helloKitty.functionCall'],
        correctAnswer: 'b. helloKitty()'
    },
    {
        question: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
        choices: ['a. if (i > 5)', 'b. if i >= 5', 'c. if (i!=5)', 'd. if i < 6'],
        correctAnswer: 'c. if (i!=5)'
    },
    {
        question: 'What will the following code return: Boolean(10>9)?',
        choices: ['a. true', 'b. 1', 'c. false', 'd. undefined'],
        correctAnswer: 'a. true'
    },
    {
        question: 'What is an array?',
        choices: ['a. a declared variable', 'b. a list of properties for a variable', 'c. a global variable', 'd. a flat, circular creature you find in the ocean'],
        correctAnswer: 'b. a list of properties for a variable'
    },
    {
        question: 'Which is NOT an example of a DOM query?',
        choices: ['a. getElementById()', 'b. querySelector()', 'c. parentNode()', 'd. getElementsByTagName()'],
        correctAnswer: 'c. parentNode()'
    },
    {
        question: 'What method is used to add a new element to the DOM tree?',
        choices: ['a. appendChild()', 'b. createTextNode()', 'c. createElement()', 'd. appendDomTree()'],
        correctAnswer: 'a. appendChild()'
    },
    {
        question: 'What is an NOT an example of an event type?',
        choices: ['a. keydown', 'b. mouseup', 'c. click', 'd. zoomout'],
        correctAnswer: 'd. zoomout'
    },
    {
        question: 'If a variable is intended to be used in multiple functions, how must the variable be declared?',
        choices: ['a. from the top of the DOM tree', 'b. in the local scope', 'c. in the global scope', 'd. within a function'],
        correctAnswer: 'c. in the global scope'
    },
    {
        question: 'What does the property Math.random() do?',
        choices: ['a. picks a random number between 1 and 10', 'b. picks a random number between 0 and 100', 'c. picks a random number between 0 and 1', 'd. picks a random number between the numbers you specify inside the ()'],
        correctAnswer: 'c. picks a random number between 0 and 1'
    }
];

//Start button event listener

highscoreButton.addEventListener("click", viewHighscores)
startButton.addEventListener("click", startQuiz);
goBackBtn.addEventListener("click", function () {
    highscorePage.classList.add("hidden");
    instructionPage.classList.remove("hidden");
})

function viewHighscores() {
    instructionPage.classList.add("hidden");
    questionContainer.classList.add("hidden");
    quizEndPage.classList.add("hidden");
    highscorePage.classList.remove("hidden")

}

//Starts questions and timer

function startQuiz() {
    instructionPage.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    startTimer();
    questionLoop();
}

var secondsLeft = 60;

function startTimer() {
    timeInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timeInterval);
            questionContainer.classList.add("hidden");
            quizEndPage.classList.remove("hidden");
        }
    }, 1000);

}

//Question loop
function questionLoop() {
    answerCheck.textContent = '';
    currentQ = questions[currentIndex];
    questionEl.textContent = questions[currentIndex].question;
    answerOne.textContent = questions[currentIndex].choices[0];
    answerTwo.textContent = questions[currentIndex].choices[1];
    answerThree.textContent = questions[currentIndex].choices[2];
    answerFour.textContent = questions[currentIndex].choices[3];
    currentIndex++;
    if (currentIndex === 10) {
        clearInterval(timeInterval);
        quizCompleted();
    }
}


answerOne.addEventListener("click", checkAnswer)
answerTwo.addEventListener("click", checkAnswer)
answerThree.addEventListener("click", checkAnswer)
answerFour.addEventListener("click", checkAnswer)


function checkAnswer(e) {
    e.preventDefault();
    if (currentQ.correctAnswer === e.target.innerText) {
        answerCheck.textContent = "Correct!";
        secondsLeft += 10;
        setTimeout(function () {
            questionLoop();
        }, 1000)


        // endGameScore.value = localStorage.getItem("end-game-score");
        // localStorage.setItem('end-game-score', endGameScore.value);

    } else {
        answerCheck.textContent = "Wrong! The correct answer is " + currentQ.correctAnswer;
        if (secondsLeft > 10) {
            secondsLeft -= 10;
            setTimeout(function () {
                questionLoop();
            }, 1000)
        } else {
            clearInterval(timeInterval);
            quizCompleted();
        }
    }
}

function quizCompleted() {
    questionContainer.classList.add('hidden');
    quizEndPage.classList.remove('hidden');
    endGameScore.textContent = secondsLeft;
    clearInterval(timeInterval);
}

//var savedName = document.getElementById("player-name");
//var submitName = document.getElementById("submit-name");
//var highscorePage = document.getElementById("highscores")
//var highscoreNames = localStorage.getItem("player-name");
// var previousScores = localStorage.getItem("")
//var endGameScore = document.getElementById("end-game-score");

submitName.addEventListener("click", function (event) {
    if (savedName === '') {
        alert("You must enter your name to proceed.");
        return;
    };

    if (window.localStorage) {
        savedName.value = localStorage.getItem("player-name");

        savedName.addEventListener('input', function () {
            localStorage.setItem('player-name', savedName.value);
        })
    }

    // endGameScore.value = localStorage.getItem("end-game-score");
    // localStorage.setItem('end-game-score', endGameScore.value);

});






/*var highscoreButton = document.getElementById("view-highscores");
var highscorePage = document.getElementById("highscores");
var goBackBtn = document.getElementById("hs-goback");
var clearHighscores = document.getElementById("hs-clear");*/
//var highscoreList = document.getElementById("highscore-list");

function showHighscores() {
    instructionPage.classList.add("hidden");
    questionContainer.classList.add("hidden");
    quizEndPage.classList.add('hidden');
    highscorePage.classList.remove('hidden');
};

    // function clearHighscores() {


    // }