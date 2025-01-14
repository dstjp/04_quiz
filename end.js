const username = document.getElementById("username");
const saceScoreBtn = document.getElementById('saveScoreBtn');

const mostRecentScore = localStorage.getItem('mostRecentScore');
const finalScore = document.getElementById('finalScore');

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const maxHighScores = 5;

console.log(highScores)

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveHighScore.disabled = !username.value;
})


saveHighScore = (e) => {
    console.log("clicked")
    e.preventDefault();

    const score = {
        score: Math.floor(Math.random()*100),
        name: username.value
    };

    highScores.push(score);
    highScores.sort((a,b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign("/")

    console.log(highScores)
}