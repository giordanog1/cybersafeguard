const quizForm = document.getElementById('quiz-form');
const toast = document.getElementById('toast');
const correctSound = document.getElementById('correct-sound');
correctSound.volume = 0.5;

// Option 1: Use URL parameter (?module=module1)
const urlParams = new URLSearchParams(window.location.search);
const moduleName = urlParams.get('module') || 'module1';

// Option 2: Use data attribute in HTML (if you prefer)
// const moduleName = document.body.dataset.module || 'module1';

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

fetch(`quizbank/${moduleName}-quiz.json`)
  .then(res => res.json())
  .then(data => renderQuiz(data))
  .catch(err => {
    quizForm.innerHTML = `<p style="color:red;">⚠️ Failed to load quiz: ${err.message}</p>`;
  });


function renderQuiz(questions) {
  quizForm.innerHTML = '';

  questions.forEach((q, index) => {
    const div = document.createElement('div');
    div.className = 'question';
    div.dataset.answer = q.answer;

    div.innerHTML = `
      <p>${index + 1}. ${q.question}</p>
      ${q.options.map((opt, i) =>
        `<label><input type="radio" name="q${index}" value="${i}"> ${opt}</label><br>`
      ).join('')}
      <button type="button" class="quiz-btn">Submit Answer</button>
      <div class="feedback"></div>
    `;

    quizForm.appendChild(div);
  });

  attachListeners();
}

function attachListeners() {
  document.querySelectorAll('.question').forEach(questionDiv => {
    const correctAnswer = parseInt(questionDiv.dataset.answer);
    const feedbackBox = questionDiv.querySelector('.feedback');
    const submitBtn = questionDiv.querySelector('.quiz-btn');

    submitBtn.addEventListener('click', () => {
      const selected = questionDiv.querySelector('input[type="radio"]:checked');
      if (!selected) {
        feedbackBox.textContent = "⚠️ Please select an answer.";
        feedbackBox.style.color = "orange";
        return;
      }

      if (parseInt(selected.value) === correctAnswer) {
        feedbackBox.textContent = "✅ Correct!";
        feedbackBox.style.color = "lightgreen";
        showToast("Correct! Great job!");
        correctSound.currentTime = 0;
        correctSound.play();
        submitBtn.disabled = true;
      } else {
        feedbackBox.textContent = "❌ Incorrect, try again.";
        feedbackBox.style.color = "red";
      }
    });
  });
}
