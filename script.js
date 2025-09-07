// Switch page function
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const partyBtn = document.getElementById("partyBtn");
const nextBtn = document.getElementById("nextBtn");
const trumpet = document.getElementById("trumpet");
const bgMusic = document.getElementById("bg-music");

// Simple confetti effect
function launchConfetti() {
  const duration = 1 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    // Basic confetti effect
    const colors = ['#bb0000', '#ffffff', '#FFD700', '#FF69B4', '#87CEEB'];
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.top = '0px';
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.opacity = 0.7;
    confetti.style.borderRadius = '50%';
    document.body.appendChild(confetti);

    let fall = 0;
    const fallInterval = setInterval(() => {
      fall += 5;
      confetti.style.top = fall + 'px';
      if (fall > window.innerHeight) {
        clearInterval(fallInterval);
        confetti.remove();
      }
    }, 16);

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}

// Play trumpet sound
function playTrumpet() {
  trumpet.currentTime = 0;
  trumpet.play().catch(err => console.log("Autoplay blocked:", err));
}

// Party button
partyBtn.addEventListener("click", () => {
  launchConfetti();
  playTrumpet();
});

// Next page button
nextBtn.addEventListener("click", () => {
  page1.classList.remove("active");
  page2.classList.add("active");
  bgMusic.play().catch(err => console.log("Autoplay blocked:", err));
});
