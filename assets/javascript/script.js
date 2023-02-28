const questions = [
    {
        question:"What tag is used to define – and place – an interactive button in an HTML document?",
        choices: ["<button>", "<interactive>", "<form>", "<input>"],
        answer: "<button>"
    },
    {
        question:"What tag is used to render or transform text into an emphasized (italics) version?",
        choices: ["<a>", "<blockquote>", "<em>", "<strong>"],
        answer: "<em>"
    },
    {
        question:"What declaration MUST be included as the first item in an HTML document before the tag and is used to provide instructions to the web browser?",
        choices: ["<caption>", "<code>", "<!DOCTYPE>", "<html>"],
        answer: "<!DOCTYPE>"
    },
    {
        question:"What is the name of the property that is used to define the special state of an element?",
        choices: ["Style", "Syntax", "Pseudo-class", "Alignment"],
        answer: "Pseudo-class"
    },
    {
        question:"What is the box called in CSS that wraps around every HTML element?",
        choices: ["Float", "Margin", "Wrap", "Box Model"],
        answer: "Box Model"
    },
    {
        question:"What is the name of CSS design that calls for fluid and adaptable elements based on the device resolution or size?",
        choices: ["Evolution", "Shifting", "Responsive", "Cascading"],
        answer: "Responsive"
    },
    {
        question:"In JavaScript, what element is used to store multiple values in a single variable?",
        choices: ["Functions", "Variables", "Arrays", "Objects"],
        answer: "Arrays"
    },
    {
        question:"What is a JavaScript element that represents either TRUE or FALSE values?",
        choices: ["Event", "Condition", "Boolean", "Variable"],
        answer: "Boolean"
    },
    {
        question:"In JavaScript, what element is used to store and manipulate text, usually in multiples?",
        choices: ["Recorders", "Variables", "Arrays", "Strings"],
        answer: "Strings"
    }
  ];

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timer;
let highScores = [];

function startQuiz() {
    // Hide the start screen
    document.getElementById("start-screen").style.display = "none";
    // Show the quiz
    document.getElementById("quiz").style.display = "block";
    // Start the timer
    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("time-left").textContent = timeLeft;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
    // Show the first question
    showQuestion();
}

function showQuestion() {
    // Get the current question object from the array
    let question = questions[currentQuestion];
    // Update the title with the current question
    document.getElementById("question-title").textContent = question.question;
    // Clear out any old question choices
    document.getElementById("question-choices").innerHTML = "";
    // Loop over the choices
    question.choices.forEach(function(choice, i) {
        // Create a new button for each choice
        let choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);
        choiceNode.textContent = i + 1 + ". " + choice;
        // Attach an event listener to each choice
        choiceNode.onclick = questionClick;
        // Display on the page
        document.getElementById("question-choices").append(choiceNode);
    });
}

function questionClick(event) {
    // Check if user guessed wrong
    if (event.target.value !== questions[currentQuestion].answer) {
        // Penalize time
        timeLeft -= 10;
        if (timeLeft < 0) {
            timeLeft = 0;
        }
        // Display new time on page
        document.getElementById("time-left").textContent = timeLeft;
    } else {
        // Increase score
        score++;
        // Display new score on page
        document.getElementById("score").textContent = score;
    }
    // Check if we've run out of questions
    if (currentQuestion === questions.length - 1) {
        endQuiz();
    } else {
        currentQuestion++;
        showQuestion();
    }
}

function endQuiz() {
    // Stop the timer
    clearInterval(timer);
    // Show the end screen
    document.getElementById("end-screen").style.display = "block";
    // Show the final score
    document.getElementById("final-score").textContent = score;
    // Hide the questions section
    document.getElementById("quiz").style.display = "none";
}

function saveHighScore() {
    // Get value of input box
    let initials = document.getElementById("initials").value.trim();
    // Make sure value wasn't empty
    if (initials !== "") {
        // Get saved scores from localstorage, or if not any, set to empty array
        let highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];
        // Format new score object for current user
        let newScore = {
            score: score,
            initials: initials
        };
        // Save to localstorage
        highScores.push(newScore);
        window.localStorage.setItem("highScores", JSON.stringify(highScores));
        // Redirect to next page
        window.location.href = "highscores.html";
    }
}

function loadHighScores() {
    // Get saved scores from localstorage, or if not any, set to empty array
    let highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];
    // Sort highscores by score property in descending order
    highScores.sort(function(a, b) {
        return b.score - a.score;
    });
    highScores.forEach(function(score) {
        // Create li tag for each high score
        let liTag = document.createElement("li");
        liTag.textContent = score.initials + " - " + score.score;
        // Display on page
        let olEl = document.getElementById("highScores");
        olEl.appendChild(liTag);
    });
}

function clearHighScores() {
    window.localStorage.removeItem("highScores");
    window.location.href = "highscores.html";
}

// Start the quiz
document.getElementById("start-btn").onclick = startQuiz;
// Save the high score
document.getElementById("save-btn").onclick = saveHighScore;
// Clear the high scores
document.getElementById("clear-btn").onclick = clearHighScores;
// Load the high scores
loadHighScores();
