var scoresBtn = document.querySelector("#view-high-scores");

function printHighScores() {
   var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
   highScores.sort(function(a, b) {
       return b.score - a.score;
   });
   highScores.forEach(function(score) {
       var li = document.createElement("li");
       li.textContent = score.name + ": " + score.score;
       var olEl = document.querySelector("#high-scores");
       highScores.appendChild(li);
   });

function clearHighScores() {
    window.localStorage.removeItem("highScores");
    window.location.reload();
} document.querySelector("#clear-high-scores").addEventListener("click", clearHighScores);

printHighScores();
