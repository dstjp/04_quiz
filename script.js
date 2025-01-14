const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");

const progressBarFull = document.getElementById("progressBarFull");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


let questions = [
    {
        question: "Why do bears poop in the woods?",
        choice1: "Cause they want to",
        choice2: "Beause they have to",
        choice3: "IDK it's not like they have a choice",
        choice4: "What kind of question is that?",
        answer: 1
    },
    {
        question: "Why do a backflip when you can do a front flip?",
        choice1: "Don't tell me what to do",
        choice2: "Seriously, wtf is this question?",
        choice3: "Backflips are cooler",
        choice4: "Dragon",
        answer: 3
    },
    {
        question: "Favorite animal?",
        choice1: "Tiger",
        choice2: "Bear",
        choice3: "Waterbottle",
        choice4: "Jesus Christ",
        answer: 4
    },
];

const correct = 10;
const maxQuestions = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {

    //redirect to end page
    if(availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("/end.html")
    } 

    questionCounter++;
    progressText.innerText = `Question: ${questionCounter}/${maxQuestions}`;

    //Update progress bar
    progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer 
        ? 'correct' 
        : 'incorrect';

        if(classToApply === 'correct') {
            incrementScore(correct);
        }


        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        }, 500);

    });
});


incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}


startGame();


