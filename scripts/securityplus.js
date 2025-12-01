document.addEventListener("DOMContentLoaded", () => {
  const quizContainer = document.getElementById("securityplus-container");

  // Load Security+ questions from JSON
  fetch("quizbank/securityplus.json")
    .then(res => res.json())
    .then(questions => {
      renderSecurityPlusQuiz(questions, quizContainer);
    })
    .catch(err => {
      console.error("Error loading Security+ quiz:", err);
      quizContainer.textContent = "⚠️ Could not load Security+ quiz.";
    });
});

function renderSecurityPlusQuiz(questions, container) {
  let current = 0;
  let score = 0;

  const questionEl = document.createElement("div");
  const optionsEl = document.createElement("div");
  const feedbackEl = document.createElement("div");
  const scoreEl = document.createElement("div");
  const nextBtn = document.createElement("button");

  nextBtn.textContent = "Next Question";
  nextBtn.style.display = "none";

  container.appendChild(questionEl);
  container.appendChild(optionsEl);
  container.appendChild(feedbackEl);
  container.appendChild(scoreEl);
  container.appendChild(nextBtn);

  function loadQuestion() {
    const q = questions[current];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";
    feedbackEl.textContent = "";
    nextBtn.style.display = "none";

    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.className = "option-btn";
      btn.onclick = () => checkAnswer(i);
      optionsEl.appendChild(btn);
    });
  }

  function checkAnswer(selected) {
    const q = questions[current];
    if (selected === q.answer) {
      feedbackEl.textContent = "✅ Correct! " + q.explanation;
      score++;
    } else {
      feedbackEl.textContent = "❌ Incorrect. " + q.explanation;
    }
    scoreEl.textContent = `Score: ${score}/${current + 1}`;
    nextBtn.style.display = "block";
  }

  nextBtn.onclick = () => {
    current++;
    if (current < questions.length) {
      loadQuestion();
    } else {
      questionEl.textContent = "Quiz complete!";
      optionsEl.innerHTML = "";
      nextBtn.style.display = "none";
      feedbackEl.textContent = "";
      scoreEl.textContent = `Final Score: ${score}/${questions.length}`;
    }
  };

  loadQuestion();
}
