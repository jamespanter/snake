const canvas = document.getElementById("snake-container");
const ctx = canvas.getContext("2d");

const newGame = () => {
  clearCanvas();
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const calculateRandomCoords = () => {
  const x = Math.floor(Math.random() * canvas.width);
  const y = Math.floor(Math.random() * canvas.height);
  createNodeOnCanvas(x, y);
};

const createNodeOnCanvas = (x, y) => {
  ctx.fillRect(x, y, 20, 20);
};

document.getElementById("new-game-button").addEventListener("click", newGame);
document
  .getElementById("create-node")
  .addEventListener("click", calculateRandomCoords);

const createSnake = () => {
  ctx.fillRect(250, 50, 20, 60);
};

createSnake();
