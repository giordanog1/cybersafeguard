// scripts/tips.js
document.addEventListener("DOMContentLoaded", () => {
  const tips = [
    "Use multi-factor authentication whenever possible.",
    "Never reuse passwords across accounts.",
    "Hover over links to preview the destination before clicking.",
    "Update software regularly to patch vulnerabilities.",
    "Use a password manager to generate strong, unique passwords.",
    "Treat urgent requests with caution — they may be phishing."
  ];

  let i = 0;

  function showTip() {
    const tip = tips[i];
    // Update both copies so the marquee loop is seamless
    document.querySelectorAll(".tip-text").forEach(el => {
      el.textContent = tip;
    });
    i = (i + 1) % tips.length;
  }

  // Show first tip immediately
  showTip();

  // Rotate tips every 15 seconds (matches your scroll duration)
  setInterval(showTip, 15000);
});
