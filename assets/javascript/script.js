const questions = [
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
    }];
    const StartScreen = document.getElementById("start-screen");
    const StartButton = document.getElementById("start-btn");
    const divQuestions = document.getElementById("questions");
    const h2Question = document.getElementById("question-title");
    const divChoices = document.getElementById("choices");
    const spanTime = document.getElementById("time");
    const divEndScreen = document.getElementById("end-screen");
    const spanFinalScore = document.getElementById("final-score");
    const inputInitials = document.getElementById("initials");
    const buttonSubmit = document.getElementById("submit");
    const divFeedback = document.getElementById("feedback");

    let countdownTimer = 60;
    let questionIndex = 0;
    
    let orderList = document.createElement("ol");
    divChoices.appendChild(orderList);
    let ol = document.querySelector("ol");

    ol.addEventListener("click", function(event) {
        let element = event.target;
        if (element.matches("button")) {
          let state = element.getAttribute("data-state");
          if (state === questions[questionIndex].correctAnswer) {
            divFeedback.textContent = "Correct!";
          }
          else {
            divFeedback.textContent = "Wrong!";
            countdownTimer -= 10;
            if (countdownTimer < 0) {
              countdownTimer = 0;
            }
            spanTime.textContent = countdownTimer;
          }
          questionIndex++;
          ol.textContent = "";
          questions(questionIndex);
        }
      });