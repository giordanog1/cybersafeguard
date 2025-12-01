let correctCount = 0;

document.addEventListener("DOMContentLoaded", () => {
  const quizSection = document.getElementById("quiz-form");
  const moduleName = document.body.dataset.module; // e.g. "module1"
  const quizFile = `${moduleName}-quiz.json`;

  // Load quiz JSON from quizbank folder
  fetch(`quizbank/${quizFile}`)
    .then(response => response.json())
    .then(questions => {
      renderQuiz(questions, quizSection, moduleName);
    })
    .catch(err => {
      console.error("Error loading quiz:", err);
      quizSection.textContent = "⚠️ Quiz could not be loaded.";
    });
});

// ---------------- Toast ----------------
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// ---------------- Render Quiz ----------------
function renderQuiz(questions, container, moduleName) {
  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    questionDiv.dataset.index = index;
    questionDiv.dataset.correct = q.answer; // matches JSON key
    questionDiv.dataset.explanation = q.explanation;

    const questionText = document.createElement("p");
    questionText.textContent = q.question;
    questionDiv.appendChild(questionText);

    q.options.forEach((opt, i) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "q" + index;
      input.value = i;
      label.appendChild(input);
      label.appendChild(document.createTextNode(" " + opt));
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    const submitBtn = document.createElement("button");
    submitBtn.className = "submit-btn";
    submitBtn.textContent = "Submit";
    questionDiv.appendChild(submitBtn);

    const feedbackBox = document.createElement("div");
    feedbackBox.className = "feedback";
    questionDiv.appendChild(feedbackBox);

    container.appendChild(questionDiv);

    // Attach logic
    submitBtn.addEventListener("click", () =>
      handleAnswer(questionDiv, index, questions.length, moduleName)
    );
  });
}

// ---------------- Handle Answer ----------------
function handleAnswer(questionDiv, questionIndex, totalQuestions, moduleName) {
  const selected = questionDiv.querySelector("input[type='radio']:checked");
  const feedbackBox = questionDiv.querySelector(".feedback");

  if (!selected) {
    feedbackBox.textContent = "⚠️ Please select an answer.";
    feedbackBox.style.color = "orange";
    return;
  }

  const correctAnswer = parseInt(questionDiv.dataset.correct);

  if (parseInt(selected.value) === correctAnswer) {
  // Play correct sound
  const correctSound = document.getElementById("correct-sound");
  if (correctSound) {
    correctSound.currentTime = 0;
    correctSound.play();
  }

  feedbackBox.textContent = "";
  const feedback = document.createElement("div");
  feedback.textContent = "✅ Correct!";
  feedback.style.color = "lightgreen";
  questionDiv.querySelector(".submit-btn").replaceWith(feedback);

  showToast("Correct! Great job!");

  const explanation = document.createElement("div");
  explanation.className = "explanation";
  explanation.textContent = questionDiv.dataset.explanation;
  explanation.style.marginTop = "10px";
  explanation.style.color = "#ccc";
  questionDiv.appendChild(explanation);

  // ✅ Disable all options once correct answer is chosen
  const options = questionDiv.querySelectorAll("input[type='radio']");
  options.forEach(opt => opt.disabled = true);

  correctCount++;
  checkQuizCompletion(totalQuestions, moduleName);
} else {
  feedbackBox.textContent = "❌ Incorrect, try again.";
  feedbackBox.style.color = "red";
}
}

// ---------------- Completion Check ----------------
function checkQuizCompletion(totalQuestions, moduleName) {
  const quizSection = document.getElementById("quiz-section");
  const oldScore = document.querySelector(".score-box");
  if (oldScore) oldScore.remove();

  const scoreBox = document.createElement("div");
  scoreBox.className = "score-box";

  if (correctCount === totalQuestions) {
    scoreBox.textContent = `🎉 You got ${correctCount}/${totalQuestions} correct! Module complete.`;
    quizSection.appendChild(scoreBox);

    // ✅ Play completion sound with slight delay
    const completionSound = document.getElementById("completion-sound");
    if (completionSound) {
      setTimeout(() => {
        completionSound.volume = 1.0;
        completionSound.currentTime = 0;
        completionSound.play().catch(() => {
          console.warn("Autoplay blocked until user interacts.");
        });
      }, 600); // half-second delay after correct chime
    }

    // ✅ Add celebratory animation
    scoreBox.classList.add("complete");

    // ✅ Launch confetti synced with sound
    setTimeout(() => {
      if (typeof confetti === "function") {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 600);

    // ✅ Mark module complete only if 100% correct
    markModuleComplete(moduleName);
  } else {
    scoreBox.textContent = `You got ${correctCount}/${totalQuestions} correct. Keep going!`;
    quizSection.appendChild(scoreBox);
  }
}
