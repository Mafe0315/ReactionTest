const screen = document.getElementById("screen");
const result = document.getElementById("result");
const bestTime = document.getElementById("bestTime");
const playerName = document.getElementById("playerName");
const modeSelect = document.getElementById("modeSelect");
const startBtn = document.getElementById("startBtn");
const beepSound = document.getElementById("beepSound");
const clickCountDisplay = document.getElementById("clickCount");

let state = "idle"; // idle, waiting, now
let timeoutId;
let startTime;
let best = Infinity;
let clickCount = 0;
let challengeMode = false;
let challengeTimer;

function getRandomDelay(mode) {
  switch (mode) {
    case "easy": return Math.random() * 1000 + 1000;
    case "hard": return Math.random() * 4000 + 2000;
    default: return Math.random() * 2000 + 1000;
  }
}

function startGame() {
  if (!playerName.value) {
    alert("Please enter your name first.");
    return;
  }

  screen.textContent = "Wait for green...";
  screen.style.backgroundColor = "#f66";
  state = "waiting";
  result.textContent = "";
  screen.classList.remove("distraction");
  clickCount = 0;
  clickCountDisplay.textContent = "";

  const mode = modeSelect.value;
  const delay = getRandomDelay(mode);

  if (mode === "challenge") {
    challengeMode = true;
    clickCountDisplay.textContent = "⏱️ 30s challenge started!";
    challengeTimer = setTimeout(() => {
      state = "idle";
      screen.style.backgroundColor = "#ddd";
      screen.textContent = "Time's up!";
      clickCountDisplay.textContent = `✅ You clicked ${clickCount} times in 30s`;
    }, 30000);
  } else {
    challengeMode = false;
  }

  if (mode === "hard") {
    screen.classList.add("distraction");
  }

  timeoutId = setTimeout(() => {
    screen.textContent = "CLICK!";
    screen.style.backgroundColor = "#4CAF50";
    beepSound.play();
    state = "now";
    startTime = Date.now();
  }, delay);
}

function handleClick() {
  if (state === "idle") return;

  if (state === "waiting") {
    clearTimeout(timeoutId);
    result.textContent = "⛔ Too soon! Try again.";
    screen.style.backgroundColor = "#999";
    state = "idle";
    if (challengeMode) {
      clickCountDisplay.textContent = "❌ False start!";
    }
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
    screen.classList.remove("distraction");
    state = "idle";

    if (challengeMode) {
      clickCount++;
      clickCountDisplay.textContent = `✅ Clicks: ${clickCount}`;
    }
  }
}

screen.addEventListener("click", handleClick);
startBtn.addEventListener("click", () => {
  clearTimeout(timeoutId);
  clearTimeout(challengeTimer);
  startGame();
});
