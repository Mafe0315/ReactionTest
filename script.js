const screen = document.getElementById("screen");
const result = document.getElementById("result");

let startTime, timeoutId;
let state = "waiting"; // "waiting", "ready", "now"

screen.addEventListener("click", () => {
  if (state === "waiting") {
    screen.textContent = "Wait for green...";
    screen.style.backgroundColor = "#f66";
    state = "ready";

    const delay = Math.floor(Math.random() * 3000) + 2000;

    timeoutId = setTimeout(() => {
      screen.style.backgroundColor = "#4CAF50";
      screen.textContent = "Click now!";
      startTime = Date.now();
      state = "now";
    }, delay);

  } else if (state === "ready") {
    clearTimeout(timeoutId);
    screen.textContent = "Too soon! Click to try again.";
    screen.style.backgroundColor = "#999";
    state = "waiting";
    result.textContent = "";

  } else if (state === "now") {
    const reactionTime = Date.now() - startTime;
    screen.textContent = "Click to try again";
    screen.style.backgroundColor = "#ddd";
    state = "waiting";
    result.textContent = `Your reaction time: ${reactionTime} ms`;
  }
});
