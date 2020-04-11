const canvas = document.getElementById("snake-container"),
  ctx = canvas.getContext("2d");
let snakeX, snakeY;
let score = 0;
let arrayOfSnakeXCoords = [];
let arrayOfSnakeYCoords = [];
let arrayOfNodeXCoords = [];
let arrayOfNodeYCoords = [];
let d = 1;
let direction;

const newGame = () => {
  resetScore();
  snakeX = 200;
  snakeY = 250;
  direction = 0;
  clearCanvas();
  createNode();
  moveSnake();
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const createNode = () => {
  let x = Math.floor(Math.random() * canvas.width),
    y = Math.floor(Math.random() * canvas.height);
  if (x > canvas.width) {
    x = canvas.width - 20;
  }
  if (y > canvas.height) {
    y = canvas.height - 20;
  }
  arrayOfNodeXCoords.push(x);
  arrayOfNodeYCoords.push(y);
  // console.log("Node X: " + arrayOfNodeXCoords, "Node Y: " + arrayOfNodeYCoords);
  ctx.fillStyle = "green";
  ctx.fillRect(x, y, 5, 5);
};

const resetScore = () => {
  score = 0;
  document.getElementById("output").innerHTML = score;
};

const checkLose = () => {
  if (snakeX == canvas.width || snakeY == canvas.height) {
    newGame();
  } else if (
    snakeX == canvas.width - canvas.width ||
    snakeY == canvas.height - canvas.height
  ) {
    newGame();
  }
};

const moveSnake = () => {
  checkLose();
  // console.log("x: " + arrayOfSnakeXCoords, "y: " + arrayOfSnakeYCoords);
  ctx.clearRect(arrayOfSnakeXCoords[0], arrayOfSnakeYCoords[0], 20, 20);
  arrayOfSnakeYCoords.splice(0, 1);
  arrayOfSnakeXCoords.splice(0, 1);
  ctx.fillStyle = "red";
  ctx.fillRect(snakeX, snakeY, 20, 20);
  arrayOfSnakeXCoords.push(snakeX);
  arrayOfSnakeYCoords.push(snakeY);
  switch (direction) {
    // left
    case 37:
      snakeX -= d;
      break;
    // up
    case 38:
      snakeY -= d;
      break;
    // right
    case 39:
      snakeX += d;
      break;
    // down
    case 40:
      snakeY += d;
      break;
  }
  checkWin(snakeX, snakeY);
  requestAnimationFrame(moveSnake);
};

const checkWin = (snakeX, snakeY) => {
  let nodeX = arrayOfNodeXCoords[arrayOfNodeXCoords.length - 1];
  let nodeY = arrayOfNodeYCoords[arrayOfNodeYCoords.length - 1];
  let snakeXStart = snakeX;
  let snakeXEnd = snakeX + 20;
  let snakeYStart = snakeY;
  let snakeYEnd = snakeY + 20;
  let nodeXStart = nodeX;
  let nodeXEnd = nodeX + 5;
  let nodeYStart = nodeY;
  let nodeYEnd = nodeY + 5;
  if (
    nodeXStart >= snakeXStart &&
    nodeXEnd <= snakeXEnd &&
    nodeYStart >= snakeYStart &&
    nodeYEnd <= snakeYEnd
  ) {
    addScore();
    createNode();
  }
};

const addScore = () => {
  score++;
  document.getElementById("output").innerHTML = score;
};

newGame();

document.getElementById("new-game-button").addEventListener("click", newGame);
window.addEventListener("keydown", (e) => (direction = e.keyCode));
