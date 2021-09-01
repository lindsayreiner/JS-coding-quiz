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
var highscoreList = document.getElementById("highscore-list");
var highscoreNames = [];
var savedScores = [];


//Highscore page
var highscoreOne = document.getElementById("hs1");
var highscoreTwo = document.getElementById("hs2");
var highscoreThree = document.getElementById("hs3");
var highscoreFour = document.getElementById("hs4");
var highscoreFive = document.getElementById("hs5");
var goBackBtn = document.getElementById("hs-goback");
var clearHighscores = document.getElementById("hs-clear");

//questionLoop function variables
var currentQ = '';
var currentIndex = 0;

//Questions array

var questions = [
    // {
    //     question: 'Which is NOT an example of a DOM query?',
    //     choices: ['a. getElementById()', 'b. querySelector()', 'c. parentNode()', 'd. getElementsByTagName()'],
    //     correctAnswer: 'c. parentNode()'
    // },
    // {
    //     question: 'What method is used to add a new element to the DOM tree?',
    //     choices: ['a. appendChild()', 'b. createTextNode()', 'c. createElement()', 'd. appendDomTree()'],
    //     correctAnswer: 'a. appendChild()'
    // },
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

function turnOffButtons(isActive) {
    var buttons = document.getElementById("answers").children;
    for (i = 0; i < buttons.length; i++) {
        buttons[i].disabled = isActive;
    }
}

//Question loop
function questionLoop() {
    if (currentIndex > questions.length - 1 || secondsLeft === 0) {
        clearInterval(timeInterval);
        quizCompleted();
    }
    answerCheck.textContent = '';
    currentQ = questions[currentIndex];
    questionEl.textContent = questions[currentIndex].question;
    answerOne.textContent = questions[currentIndex].choices[0];
    answerTwo.textContent = questions[currentIndex].choices[1];
    answerThree.textContent = questions[currentIndex].choices[2];
    answerFour.textContent = questions[currentIndex].choices[3];
    turnOffButtons(false);
    currentIndex++;

}



answerOne.addEventListener("click", checkAnswer)
answerTwo.addEventListener("click", checkAnswer)
answerThree.addEventListener("click", checkAnswer)
answerFour.addEventListener("click", checkAnswer)


function checkAnswer(e) {
    e.preventDefault();
    turnOffButtons(true);

    if (currentQ.correctAnswer === e.target.innerText) {
        answerCheck.textContent = "Correct!";
        secondsLeft += 10;
        setTimeout(function () {
            questionLoop();
        }, 1000)

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

}


submitName.addEventListener("click", function (event) {
    event.preventDefault();
    // secondsLeft.value = localStorage.getItem("");
    localStorage.setItem('end-game-score', endGameScore.value);

    if (savedName.value === '') {
        alert("You must enter your name to proceed.");
        return;

    };

    if (window.localStorage) {

        localStorage.setItem('player-name', savedName.value);
        localStorage.setItem('end-game-score', secondsLeft.toString());
        showHighscores();
    };
});


function showHighscores() {
    instructionPage.classList.add("hidden");
    questionContainer.classList.add("hidden");
    quizEndPage.classList.add('hidden');
    highscorePage.classList.remove('hidden');
};

// var highscoreOne = document.getElementById("hs1");
// var highscoreTwo = document.getElementById("hs2");
// var highscoreThree = document.getElementById("hs3");
// var highscoreFour = document.getElementById("hs4");
// var highscoreFive = document.getElementById("hs5");
//var highscoreList = document.getElementById("highscore-list");

//var highscoreNames = [];
//var savedScores = [];
var combinedHighscore = highscoreNames + savedScores;
console.log(highscoreNames + savedScores);

function init() {
    // Get stored todos from localStorage
    var storedNames = JSON.parse(localStorage.getItem("player-name"));
    var storedScores = JSON.parse(localStorage.getItem("end-game-score"));

    // If todos were retrieved from localStorage, update the todos array to it
    if (storedTodos !== null) {
        todos = storedTodos;
    }

    // This is a helper function that will render todos to the DOM
    renderTodos();
}


clearHighscores.addEventListener("click", function (event) {
    localStorage.clear();
})

