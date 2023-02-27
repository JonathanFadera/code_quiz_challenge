var questions = [
    {
        question:"What tag is used to define – and place – an interactive button in an HTML document?",
        answers: ["<button>", "<interactive>", "<form>", "<input>"],
        correctAnswer: "<button>"
    },
    
    {
        question:"What tag is used to render or transform text into an emphasized (italics) version?",
        answers: ["<a>", "<blockquote>", "<em>", "<strong>"],
        correctAnswer: "<em>"
    },

    {
        question:"What declaration MUST be included as the first item in an HTML document before the tag and is used to provide instructions to the web browser?",
        answers: ["<caption>", "<code>", "<!DOCTYPE>", "<html>"],
        correctAnswer: "<!DOCTYPE>"
    },

    {
        question:"What is the name of the property that is used to define the special state of an element?",
        answers: ["Style", "Syntax", "Pseudo-class", "Alignment"],
        correctAnswer: "Pseudo-class"
    },

    {
        question:"What is the box called in CSS that wraps around every HTML element?",
        answers: ["Float", "Margin", "Wrap", "Box Model"],
        correctAnswer: "Box Model"
    },

    {
        question:"What is the name of CSS design that calls for fluid and adaptable elements based on the device resolution or size?",
        answers: ["Evolution", "Shifting", "Responsive", "Cascading"],
        correctAnswer: "Responsive"
    },

    {
        question:"In JavaScript, what element is used to store multiple values in a single variable?",
        answers: ["Functions", "Variables", "Arrays", "Objects"],
        correctAnswer: "Arrays"
    },

    {
        question:"What is a JavaScript element that represents either TRUE or FALSE values?",
        answers: ["Event", "Condition", "Boolean", "Variable"],
        correctAnswer: "Boolean"
    },

    {
        question:"In JavaScript, what element is used to store and manipulate text, usually in multiples?",
        answers: ["Recorders", "Variables", "Arrays", "Strings"],
        correctAnswer: "Strings"
    }],

const divStartScreen = document.querySelector("#start-screen");
const startButton = document.querySelector("#start-button");
const divQuestions = document.querySelector("#questions");
const h2Question = document.querySelector("#question-words");
const divChoices = document.querySelector("#choices");
const spanTime = document.querySelector("#time");
const divEndScreen = document.querySelector("#end-screen");
const spanFinalScore = document.querySelector("#final-score");
const inputInitials = document.querySelector("#initials");
const buttonSubmit = document.querySelector("#submit-initials");
const divFeedback = document.querySelector("#feedback");

let questionIndex = 0;
let countdownTimer = 0;
let orderList = document.createElement("ol");
divChoices.appendChild(orderList);
let ol = document.querySelector("ol");

ol.addEventListener("click", function(event) {
    let userChoice = event.target.textContent;
    let correctAnswer = questions[questionIndex].correctAnswer;
    if (userChoice === correctAnswer) {
        divFeedback.textContent = "Correct!";
    } else {
        divFeedback.textContent = "Wrong!";
        countdownTimer -= 10;
    }
    questionIndex++;
    if (questionIndex >= questions.length) {
        endQuiz();
    } else {
        displayQuestion();
    }
});

function startButton() {
function message(string) {
    console.log(string);
    let p1 = document.createElement("p");
    p1.textContent = string;
    divEndScreen.appendChild(p1);
    let clearId = setInterval(function() {
        p1.textContent = "";
        console.log(p1.textContent = "");
        setTimeout(function() {
            clearInterval(clearId);
        }, 1000);
    }, 1000);
}

function startCountDown() {
    countdownTimer = 60;
    spanTime.textContent = countdownTimer;
    let intervalId = setInterval(function() {
        countdownTimer--;
        spanTime.textContent = countdownTimer;
        console.log(countdownTimer);
        if (countdownTimer > 0 && questionIndex < questions.length) {
            clearInterval(intervalId);
            spanTime.textContent = countdownTimer;
            divQuestions.setAttribute("class", "hide");
            divEndScreen.setAttribute("class", "start");
            spanFinalScore.textContent = countdownTimer;
        }
        if (countdownTimer <= 0) {
            clearInterval(intervalId);
            spanTime.textContent = 0;
            divQuestions.setAttribute("class", "hide");
            divEndScreen.setAttribute("class", "start");
            spanFinalScore.textContent = 0;
        }
    }, 1000);
}

function stopCountDown() {
    if (index < questions.length) {
        h2Question.textContent = questions[index].question;
        console.log(index);
        console.log(questions.length);
        for (let i = 0; i < questions[index].answers.length; i++) {
            let li = document.createElement("li");
            li.textContent = questions[index].answers[i];
            orderList.appendChild(li);
        let buttonAnswer = document.createElement("button");
        buttonAnswer.setAttribute("data-state", i);
        buttonAnswer.textContent = questions[index].answers[i];
        li.appendChild(buttonAnswer);
        }
} else {
    h2Question.textContent = "";}
}

startButton.addEventListener("click", function() {
    divStartScreen.setAttribute("class", "hide");
    divQuestions.setAttribute("class", "start");
    startCountDown();
    displayQuestion();
});

let highscores = JSON.parse(localStorage.getItem("highscores"));
buttonSubmit.addEventListener("click", function() {
    event.preventDefault();
    let initialStore = inputInitials.value;
    let currentScore = {
        initials: initialStore,
        score: countdownTimer
    };
    highscores.push(currentScore);
    console.log(currentScore);
    highscores.sort(function(a, b) {
        if (a.score > b.score) {
            return -1;
        }
        if (a.score < b.score) {
            return 1;
        }
        if (a.score == b.score) {
            return 0;
        }
    });
    localStorage.setItem("highscores", JSON.stringify(highscores));
    document.location.href = "highscores.html";
});