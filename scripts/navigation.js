
document.addEventListener("DOMContentLoaded", () => {
  const videoSection = document.getElementById('video-section');
  const textSection = document.getElementById('text-section');
  const quizSection = document.getElementById('quiz-section');
  const correctSound = document.getElementById('correct-sound');
  const toast = document.getElementById('toast');
  correctSound.volume = 0.5;

  document.getElementById('to-text').addEventListener('click', () => {
    videoSection.style.display = 'none';
    textSection.style.display = 'block';
  });

  document.getElementById('to-quiz').addEventListener('click', () => {
    textSection.style.display = 'none';
    quizSection.style.display = 'block';
  });

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
});
