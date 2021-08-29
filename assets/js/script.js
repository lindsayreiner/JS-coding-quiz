//DOM Elements

//Instruction page
var instructionPage = document.getElementById("intro-page");
var highscoreButton = document.getElementById("view-highscores");
var timeEl = document.getElementById("timer");
var startButton = document.getElementById("start-button");

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
var nameSubmission = document.getElementById("submit-name");
var endGameScore = document.getElementById("final-score");
var savedName = document.getElementById("player-name");

//Highscore page
var goBackBtn = document.getElementById("hs-goback");
var clearHighscores = document.getElementById("hs-clear");

//Function variables
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
        correctAnswer: 'c.parentNode()'
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
        correctAnswer: 'b. a list of properties for a variable'
    },
    {
        question: 'What does the property Math.random() do?',
        choices: ['a. picks a random number between 1 and 10', 'b. picks a random number between 0 and 100', 'c. picks a random number between 0 and 1', 'd. picks a random number between the numbers you specify inside the ()'],
        correctAnswer: 'c.picks a random number between 0 and 1'
    }
];

//Start button event listener

startButton.addEventListener("click", startQuiz);

//Question loop

function startQuiz() {
    instructionPage.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    startTimer();
    questionLoop();
}

var secondsLeft = 60;

function startTimer() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (secondsLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            endGameScore = secondsLeft;
            // question page hides, score screen appears
            questionContainer.classList.add("hidden");
            quizEndPage.classList.remove("hidden");
        }

    }, 1000);

}

function questionLoop() {
    questionEl.textContent = questions[currentIndex].question;
    answerOne.textContent = questions[currentIndex].choices[0];
    answerTwo.textContent = questions[currentIndex].choices[1];
    answerThree.textContent = questions[currentIndex].choices[2];
    answerFour.textContent = questions[currentIndex].choices[3];
}


answerOne.addEventListener("click", checkAnswer),
    answerTwo.addEventListener("click", checkAnswer),
    answerThree.addEventListener("click", checkAnswer),
    answerFour.addEventListener("click", checkAnswer)


function checkAnswer() {
    if (questions[currentIndex].correctAnswer === questions[currentIndex].choices[answer]) {
        answerCheck.textContent = "Correct!";
        secondsLeft += 5;
    } else {
        answerCheck.textContent = "Wrong! The correct answer is " + questions[currentIndex].correctAnswer;
        if (secondsLeft > 10) {
            secondsLeft -= 10;
            questionLoop();
        } else {
            clearInterval(timeInterval);
            // quizCompleted();
        }
    }


    if (currentIndex <= questions.length) {
        for (i = 0; i <= questions.length; i++) {
            questionLoop();
        }

    } else {
        quizCompleted();
    }
}

function quizCompleted() {
    questionContainer.classList.add('hidden');
    quizEndPage.classList.remove('hidden');
    endGameScore.textContent = endGameScore;
}








