var questions = [
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"  
    },
    {
        title: "Which of the following tags is used to insert a blank line?",
        choices: ["<br>", "<hr>", "<h1>", "<p>"],
        answer: "<br>"  
    },
    {
        title: "A ___ allows users to move from one webpage to another.",
        choices: ["video", "HTML", "hyperlink", "browser"],
        answer: "hyperlink"  
    },
    {
        title: "Which is the correct CSS syntax?",
        choices: ["p:color=black", "p {color: black;}", "{p;color:black}", "{p:color=black(p}"],
        answer: "p {color: black;}"  
    },
    {
        title: "The # symbol specifies that the selector is?",
        choices: ["class", "tag", "first", "id"],
        answer: "id"  
    },
    {
        title: "Which built-in method returns the length of the string?",
        choices: ["size()", "index()", "length()", "stringlength()"],
        answer: "length()"  
    },
    {
        title: "Which of the following function of String object returns the characters in a string beginning at the specified location through the specified number of characters?",
        choices: ["split()", "search()", "slice()", "substr()"],
        answer: "substr()"  
    },
];
var score = 0;
var questionIndex = 0;

var wrapperEl = document.querySelector("#wrapper");
var timerEl = document.querySelector("#Timer");
var StartEl = document.querySelector("#startTime");
var questionscontentEl = document.querySelector("#questionscontent");

var secondsLeft = 75;
var holdInterval = 0;
var penalty = 10;
var ulEl = document.createElement("ul"); // Creates new element

StartEl.addEventListener("click", function(){
    if (holdInterval ===0) {
        holdInterval = setInterval(function (){
            secondsLeft--;
            timerEl.textContent = "Time to Answer:" + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval (holdInterval);
                allDone();
                timerEl.textContent = "Time's up!!";
            }

        }, 1000);
    }
    render(questionIndex);
});

function render(questionIndex){
    
    questionscontentEl.innerHTML = "";
    ulEl.innerHTML = ""; // For loops to loop through all info in array
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionscontentEl.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionscontentEl.appendChild(ulEl);
        ulEl.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })

}

function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            
        } else {
          
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }

    questionIndex++;

    if (questionIndex >= questions.length) {
      
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionscontentEl.appendChild(createDiv);

}

function allDone() {
    questionscontentEl.innerHTML = "";
    timerEl.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionscontentEl.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionscontentEl.appendChild(createP);

    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionscontentEl.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionscontentEl.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionscontentEl.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionscontentEl.appendChild(createSubmit);

    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("./highscorelist.html");
        }
    });

}
