const screen = document.getElementById("screen");
const result = document.getElementById("result");
const bestTime = document.getElementById("bestTime");
const startBtn = document.getElementById("startBtn");
const beepSound = document.getElementById("beepSound");

let state = "idle"; // "idle", "waiting", "now"
let timeoutId;
let startTime;
let best = Infinity;

function getRandomDelay() {
  return Math.random() * 2000 + 1000; // 1–3 seconds
}

function startGame() {
  screen.textContent = "Wait for green...";
  screen.style.backgroundColor = "#f66";
  result.textContent = "";
  state = "waiting";

  timeoutId = setTimeout(() => {
    screen.textContent = "CLICK!";
    screen.style.backgroundColor = "#4CAF50";
    beepSound.play();
    startTime = Date.now();
    state = "now";
  }, getRandomDelay());
}

function handleClick() {
  if (state === "waiting") {
    clearTimeout(timeoutId);
    screen.textContent = "Too soon! Click Start Again.";
    screen.style.backgroundColor = "#999";
    state = "idle";
    result.textContent = "";
    return;
  }

  if (state === "now") {
    const reaction = Date.now() - startTime;
    result.textContent = `🕒 Reaction Time: ${reaction} ms`;

    if (reaction < best) {
      best = reaction;
      bestTime.textContent = `🏆 New Best Time: ${best} ms`;
      confetti({
        particleCount: 150,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else {
      bestTime.textContent = `Best Time: ${best} ms`;
    }

    screen.textContent = "Click Start Again";
    screen.style.backgroundColor = "#ddd";
    state = "idle";
  }
}

screen.addEventListener("click", handleClick);
startBtn.addEventListener("click", () => {
  clearTimeout(timeoutId);
  startGame();
});
