// Initialize Telegram WebApp
Telegram.WebApp.ready();
Telegram.WebApp.expand();

let questions = [];
let currentQuestionIndex = 0;

// Function to fetch questions from channel
async function fetchQuestions() {
    try {
        // Send request to bot to get questions
        const response = await fetch('https://api.telegram.org/7880430763:AAHQ_gqz99lt6xlLtSLVRIQtnNo7jFHAuUw/getUpdates');
        const data = await response.json();
        
        // Process questions (this is simplified - you'll need proper parsing)
        questions = data.result
            .filter(msg => msg.channel_post && msg.channel_post.text)
            .map(msg => msg.channel_post.text);
            
        if (questions.length > 0) {
            showQuestion();
        } else {
            document.getElementById('question-text').textContent = "No questions found!";
        }
    } catch (error) {
        console.error("Error fetching questions:", error);
        document.getElementById('question-text').textContent = "Error loading questions";
    }
}

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
