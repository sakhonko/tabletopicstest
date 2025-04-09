// Initialize Telegram WebApp
Telegram.WebApp.ready();
Telegram.WebApp.expand();

let questions = [];
let currentQuestionIndex = 0;

// Function to fetch questions from channel
async function fetch("https://myapp.vadimsakhonko.repl.co/questions?lang=en")
    .then(response => response.json())
    .then(data => {
        console.log("Questions loaded:", data);
    });


// Display current question
function showQuestion() {
    document.getElementById('question-text').textContent = questions[currentQuestionIndex];
}

// Button handlers
document.getElementById('like-btn').addEventListener('click', () => {
    Telegram.WebApp.CloudStorage.setItem(`liked_${currentQuestionIndex}`, 'true');
    nextQuestion();
});

document.getElementById('dislike-btn').addEventListener('click', () => {
    Telegram.WebApp.CloudStorage.setItem(`disliked_${currentQuestionIndex}`, 'true');
    nextQuestion();
});

document.getElementById('share-btn').addEventListener('click', () => {
    const question = questions[currentQuestionIndex];
    Telegram.WebApp.sendData(JSON.stringify({
        action: "share_question",
        question: question
    }));
});

function nextQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    showQuestion();
}

// Initialize
fetchQuestions();
