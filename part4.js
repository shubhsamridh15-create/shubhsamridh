const questions = [

    {
        question: "Who was the one who started dancing when listening to the music?",
        answer: "Roshni di "
    },

    {
        question: "Who was always crying 'mummy, mummy' and wouldn't let her go anywhere by herself?",
        answer: "Anjali di"
    },

    {
        question: "Who can't live without mummy?",
        answer: "Anjali di"
    },

    {
        question: "Who caused the most trouble and broke the most things growing up?",
        answer: "Roshni di 🔥"
    },

    {
        question: "Whose teachers complained about them the most?",
        answer: "Anjali di"
    },

    {
        question: "Who was always putting on makeup as a child?",
        answer: "Both😶‍🌫️"
    },

    {
        question: "Who got hit or scolded by their parents the most growing up?",
        answer: "Roshni di"
    },

    {
        question: "Who used to forget things all the time?",
        answer: "Anjali di"
    },

    {
        question:"Who used to cry the most over small things?",
        answer: "Anjali di"
    },

    {
        question: "Who love me more? Prove it.",
        answer: "Get me a new pair of nike shoes"
    }

];


let currentQuestion = 0;


/* =====================================
   START
===================================== */

function startGame() {

    document.getElementById("opening").classList.remove("active");
    document.getElementById("opening").classList.add("hidden");

    document.getElementById("questionPage").classList.remove("hidden");
    document.getElementById("questionPage").classList.add("active");

    showQuestion();
}


/* =====================================
   SHOW QUESTION
===================================== */

function showQuestion() {

    const current = questions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        "QUESTION " + (currentQuestion + 1) + " / 10";

    document.getElementById("question").textContent =
        current.question;

    document.getElementById("answer").textContent =
        current.answer;

    document.getElementById("answerArea").classList.add("hidden");

    document.getElementById("revealButton").style.display =
        "inline-block";
}


/* =====================================
   REVEAL ANSWER
===================================== */

function revealAnswer() {

    document.getElementById("answerArea").classList.remove("hidden");

    document.getElementById("revealButton").style.display =
        "none";
}


/* =====================================
   NEXT QUESTION
===================================== */

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        document.getElementById("questionPage").classList.remove("active");
        document.getElementById("questionPage").classList.add("hidden");

        document.getElementById("finalPage").classList.remove("hidden");
        document.getElementById("finalPage").classList.add("active");

    }
/* =====================================
   SEAMLESS TRANSITION FOR FINAL BUTTON
===================================== */
document.querySelector("#finalPage a").addEventListener("click", function(e) {
    e.preventDefault();
    let nextUrl = this.href;
    document.body.classList.add("fade-out-page");
    setTimeout(() => {
        window.location.href = nextUrl;
    }, 700);
});    
}