document.addEventListener("DOMContentLoaded", () => {
  const page1 = document.getElementById("page1");
  const page2 = document.getElementById("page2");
  const partyBtn = document.getElementById("partyBtn");
  const nextBtn = document.getElementById("nextBtn");
  const trumpet = document.getElementById("trumpet");
  const bgMusic = document.getElementById("bg-music");
  const confettiContainer = document.getElementById("confetti-container");
  const balloonContainer = document.getElementById("balloon-container");
  const musicToggle = document.getElementById("musicToggle");

  /* ---------- Party: confetti + balloons + trumpet (repeatable) ---------- */
  partyBtn.addEventListener("click", () => {
    playTrumpet();
    spawnConfetti(40);   // number of confetti pieces per click
    releaseBalloons(6);  // number of balloons per click
  });

  function playTrumpet() {
    if (!trumpet) return;
    trumpet.currentTime = 0;
    trumpet.play().catch(err => {
      // autoplay may be blocked if not triggered by user - we are triggered by click so it should work
      console.log("trumpet play error:", err);
    });
  }

  /* confetti generation (divs) */
  function spawnConfetti(count = 30) {
    const colors = ["#FFD700","#FF69B4","#8A2BE2","#00BFFF","#FF4500","#7CFC00","#FFFFFF"];
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "confetti";
      el.style.left = Math.random() * 100 + "vw";
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      // random size
      const w = 6 + Math.random() * 8;
      const h = 8 + Math.random() * 12;
      el.style.width = w + "px";
      el.style.height = h + "px";
      // random duration
      el.style.animationDuration = 1.2 + Math.random() * 1.2 + "s";
      confettiContainer.appendChild(el);
      // remove after animation
      setTimeout(() => {
        el.remove();
      }, 2500);
    }
  }

  /* balloons generation */
  function releaseBalloons(count = 6) {
    const colors = ["#ff69b4","#ff8da1","#ffb6c1","#ffd1dc","#87CEEB","#FFA07A"];
    for (let i = 0; i < count; i++) {
      const b = document.createElement("div");
      b.className = "balloon";
      b.style.left = Math.random() * 90 + "vw";
      b.style.background = colors[Math.floor(Math.random() * colors.length)];
      b.style.animationDuration = 4 + Math.random() * 3 + "s";
      balloonContainer.appendChild(b);
      // cleanup
      setTimeout(() => { b.remove(); }, 8000);
    }
  }

  /* ---------- Navigation to Page 2 ---------- */
  nextBtn.addEventListener("click", () => {
    // slide page1 out and page2 in
    page1.classList.remove("active");
    page2.classList.add("active");

    // attempt to play bg music (user clicked -> should be allowed)
    if (bgMusic) {
      bgMusic.currentTime = 0;
      bgMusic.play().then(() => {
        musicToggle.textContent = "⏸︎ Pause Music";
      }).catch(err => {
        console.log("bg-music play blocked or error:", err);
        musicToggle.textContent = "▶︎ Play Music";
      });
    }
  });

  /* ---------- Music control on Page 2 (visible) ---------- */
  if (musicToggle) {
    musicToggle.addEventListener("click", () => {
      if (!bgMusic) return;
      if (bgMusic.paused) {
        bgMusic.play().then(() => {
          musicToggle.textContent = "⏸︎ Pause Music";
        }).catch(err => {
          console.log("play error:", err);
        });
      } else {
        bgMusic.pause();
        musicToggle.textContent = "▶︎ Play Music";
      }
    });
  }
});
