// Pesta
function party() {
  startConfetti();
  releaseBalloons();
  document.getElementById("trumpet").play();
}

// Pindah ke halaman kedua
function goToPage2() {
  document.getElementById("page1").style.transform = "rotateY(180deg)";
  document.getElementById("page2").classList.remove("hidden");
  document.getElementById("page2").style.transform = "rotateY(0)";
  document.getElementById("bg-music").play();
}

// -------- Confetti --------
function startConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  const colors = ["#ff0", "#0f0", "#f0f", "#0ff", "#f00", "#00f"];

  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: 10,
      h: 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() + 1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.w, p.h);
    });
  }

  function update() {
    particles.forEach(p => {
      p.y += p.speed;
    });
  }

  let frames = 0;
  function loop() {
    frames++;
    if (frames > 100) return; // confetti berhenti setelah beberapa frame
    draw();
    update();
    requestAnimationFrame(loop);
  }

  loop();
}

// -------- Balloons --------
function releaseBalloons() {
  const container = document.getElementById("balloons");
  const colors = ["#ff69b4", "#ff0000", "#ff8c00", "#00bfff", "#32cd32"];

  for (let i = 0; i < 8; i++) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.left = Math.random() * 100 + "vw";
    balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.animationDuration = (4 + Math.random() * 2) + "s";
    container.appendChild(balloon);

    setTimeout(() => {
      balloon.remove();
    }, 6000);
  }
}

