//DOM Elements

//Instruction page
var instructionPage = document.getElementById("intro-page");
var highscoreButton = document.getElementById("view-highscores");
var timeEl = document.getElementById("timer");
var startButton = document.getElementById("start-button");
var highscorePage = document.getElementById("highscores");
var timeInterval = 0;

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

//Highscore page
var goBackBtn = document.getElementById("hs-goback");
var clearHighscores = document.getElementById("hs-clear");

//questionLoop function variables
var currentQ = '';
var currentIndex = 0;

//Questions array

var questions = [
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
    currentIndex = 0;
    timeInterval = 0;
    secondsLeft = 60;
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

//Question loop - checks question index from array, ensures timer is still running, inserts into hardcoded buttons 
function questionLoop() {
    if (currentIndex > questions.length - 1 || secondsLeft === 0) {
        clearInterval(timeInterval);
        quizCompleted();
    }
    if (currentIndex >= questions.length) return;
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


//Answer check function, turns off buttons once an answer is clicked, adds 10 secs/points if correct and subtracts 10 if wrong, if timer is less than 10 points and question is wrong the game ends.
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

//Submit button for high score list- saves name and score in an array and displays it on the high scores page. 
submitName.addEventListener("click", function (e) {
    e.preventDefault();

    var allHighscores = JSON.parse(localStorage.getItem("allHighscores")) || [];

    localStorage.setItem('end-game-score', endGameScore.value);

    if (savedName.value === '') {
        alert("You must enter your name to proceed.");
        return;

    };


    var highscoresCombined = {
        name: savedName.value,
        score: secondsLeft
    };

    allHighscores.push(highscoresCombined);
    localStorage.setItem('allHighscores', JSON.stringify(allHighscores))

    showHighscores();

});


function showHighscores() {
    instructionPage.classList.add("hidden");
    questionContainer.classList.add("hidden");
    quizEndPage.classList.add('hidden');
    highscorePage.classList.remove('hidden');
    var allHighscores = JSON.parse(localStorage.getItem("allHighscores")) || [];
    highscoreList.innerHTML = '';
    for (var i = 0; i < allHighscores.length; i++) {
        var listItem = document.createElement('li');
        listItem.textContent = allHighscores[i].name + ' - ' + allHighscores[i].score;
        highscoreList.appendChild(listItem);

    }
};




clearHighscores.addEventListener("click", function (event) {
    localStorage.clear();
    showHighscores();

})
