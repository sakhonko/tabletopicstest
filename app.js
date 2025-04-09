// Initialize Telegram WebApp
Telegram.WebApp.ready();
Telegram.WebApp.expand();

let questions = [];
let currentQuestionIndex = 0;

// Function to fetch questions from the backend
async function fetchQuestions() {
    try {
        const response = await fetch("https://myapp.vadimsakhonko.repl.co/questions?lang=en");
        const data = await response.json();
        
        // Check if questions are loaded
        if (data && data.questions) {
            questions = data.questions;
            showQuestion(); // Call function to display the first question
        } else {
            console.error("No questions received or error fetching data.");
            document.getElementById('question-text').textContent = "No questions available.";
        }
    } catch (error) {
        console.error("Error fetching questions:", error);
        document.getElementById('question-text').textContent = "Error loading questions.";
    }
}

// Display current question
function showQuestion() {
    if (questions.length > 0) {
        document.getElementById('question-text').textContent = questions[currentQuestionIndex];
    }
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
