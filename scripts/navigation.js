// ---------------- Module Completion Checkmarks ----------------
function markModuleComplete(moduleName) {
  localStorage.setItem(moduleName, 'completed');
  updateModuleCards();
}

function updateModuleCards() {
  document.querySelectorAll('.module-card').forEach(card => {
    const moduleName = card.dataset.module;
    const button = card.querySelector('.start-btn');

    if (localStorage.getItem(moduleName) === 'completed') {
      card.classList.add('completed');
      if (button) {
        //button.disabled = true; // grey out and disable button
      }
    } else {
      card.classList.remove('completed');
      if (button) {
        button.disabled = false;
      }
    }
  });
}

// ---------------- Navigation & Steps ----------------
document.addEventListener("DOMContentLoaded", () => {
  const videoSection = document.getElementById('video-section');
  const textSection = document.getElementById('text-section');
  const quizSection = document.getElementById('quiz-section');
  const correctSound = document.getElementById('correct-sound');
  const toast = document.getElementById('toast');
  if (correctSound) correctSound.volume = 0.5;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  const circles = document.querySelectorAll('.progress-indicator .circle');

  function setActiveStep(step) {
    circles.forEach(circle => {
      circle.classList.remove('active');
      if (parseInt(circle.dataset.step) === step) {
        circle.classList.add('active');
      }
    });
  }

  // Navigation buttons
  const toTextBtn = document.getElementById('to-text');
  const toQuizBtn = document.getElementById('to-quiz');

  if (toTextBtn) {
    toTextBtn.addEventListener('click', () => {
      videoSection.style.display = 'none';
      textSection.style.display = 'block';
      quizSection.style.display = 'none';
      setActiveStep(2);
    });
  }

  if (toQuizBtn) {
    toQuizBtn.addEventListener('click', () => {
      videoSection.style.display = 'none';
      textSection.style.display = 'none';
      quizSection.style.display = 'block';
      setActiveStep(3);
    });
  }

  // Allow clicking circles to jump between steps
  circles.forEach(circle => {
    circle.addEventListener('click', () => {
      const step = parseInt(circle.dataset.step);
      if (step === 1) {
        videoSection.style.display = 'block';
        textSection.style.display = 'none';
        quizSection.style.display = 'none';
      } else if (step === 2) {
        videoSection.style.display = 'none';
        textSection.style.display = 'block';
        quizSection.style.display = 'none';
      } else if (step === 3) {
        videoSection.style.display = 'none';
        textSection.style.display = 'none';
        quizSection.style.display = 'block';
      }
      setActiveStep(step);
    });
  });

  // Initial state
  setActiveStep(1);

  // ✅ Update module cards on index.html
  updateModuleCards();
});
