// variables for functions
var timeLeft =0;
var timer;
var score =0;
var currentQuestion = -1;

// set of questions and answers
var questions = [{
      title: "Commonly used data types Do Not Include:",
      choices: ["strings", "alerts", "booleans", "numbers"],
      answer: "alerts"
   },
   {
      title: "The condition in an if / else statement is enclosed within _______.",
      choices: ["parentheses", "quotes", "curly brackets", "square brackets"],
      answer: "parentheses"
   },
   {
       title: "Array in JavaScript can be used to store _______.",
       choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
       answer: "all of the above"
   },
   {
       title: "String values must be enclosed within ______ when being assigned to variables.",
       choices: ["commas", "curly brackets", "quotes", "parentheses"],
       answer: "quotes"
   },
   {
       title: "A very useful tool used during development and debugging for printing content to the debugger is:",
       choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
       answer: "console.log"
   }
]
// start the countdown timer when start button is clicked
function start() {

    timeLeft = 75;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        //proceed to end the game function when timer is below 0 at any time
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000);

    next();
}

// stop the timer to end the game
function endGame() {
    clearInterval(timer);

    var quizContent = `
    <h2>Game over!</h2>
    <h3>You got a ` + score +  ` /100!</h3>
    <h3>That means you got ` + score / 20 +  ` questions correct!</h3>
    <input type="text" id="name" placeholder="First name">
    <button onclick="setScore()">Set score!</bitton>`;

    document.getElementById("quiz").innerHTML = quizContent;
};

//store the scores on local storage
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    viewScore();
}
// viewscore function
function viewScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="clearScore()">Clear score</button><button onclick="resetGame()">Play Again</button>`;

    document.getElementById("quiz").innerHTML = quizContent;
}
// clear score to reset game
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");

    resetGame();
}

// reset the game 
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1>
        Coding Quiz challenge
    </h1>
    <p>
    Try to answer the following code-related questions whithin the time limit.<br>
    Keep in mind that incorrect answers will penalize your score/time<br>
     by ten seconds!
    </p>
    
    <button onclick="start()">Start Quiz</button>`;

    document.getElementById("quiz").innerHTML = quizContent;
}
// increases the score by 20 points if correct answer is chosen
function correct() {
    score += 20;
    next();
}
// decrease timer by 15 seconds if incorrect answer is chosen
function incorrect() {
    timeLeft -= 15; 
    next();
}
// function to start loop of questions
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }


    document.getElementById("quiz").innerHTML = quizContent;
};
