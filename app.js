let questions = []; // Loaded from Telegram
let currentIndex = 0;

// Render question
function showQuestion() {
  document.getElementById("question-text").textContent = questions[currentIndex];
}

// Thumb actions
document.getElementById("like-btn").addEventListener("click", () => {
  Telegram.WebApp.CloudStorage.setItem(`liked_${currentIndex}`, "true");
  nextQuestion();
});

document.getElementById("dislike-btn").addEventListener("click", () => {
  Telegram.WebApp.CloudStorage.setItem(`disliked_${currentIndex}`, "true");
  nextQuestion();
});

// Share button
document.getElementById("share-btn").addEventListener("click", () => {
  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(questions[currentIndex])}`;
  window.open(shareUrl, "_blank");
});

// Navigation
function nextQuestion() {
  currentIndex = (currentIndex + 1) % questions.length;
  showQuestion();
}
