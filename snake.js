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
  snakeX = 200;
  snakeY = 250;
  direction = 0;
  clearCanvas();
  createNode();
  setInterval(moveSnake, 50);
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
  ctx.fillStyle = "black";
  ctx.fillRect(x, y, 5, 5);
};
const resetScore = () => {
  score = 0;
  document.getElementById("output").innerHTML = score;
};
const moveSnake = () => {
  if (snakeX == canvas.width || snakeY == canvas.height) {
    newGame();
    resetScore();
  } else if (
    snakeX == canvas.width - canvas.width ||
    snakeY == canvas.height - canvas.height
  ) {
    newGame();
    resetScore();
  }
  console.log("x: " + arrayOfSnakeXCoords, "y: " + arrayOfSnakeYCoords);
  //clear end of snake
  ctx.clearRect(arrayOfSnakeXCoords[0], arrayOfSnakeYCoords[0], 20, 20);
  //remove end of snake from arrays
  arrayOfSnakeYCoords.splice(0, 1);
  arrayOfSnakeXCoords.splice(0, 1);
  ctx.fillStyle = "red";
  //create head of snake
  ctx.fillRect(snakeX, snakeY, 20, 20);
  //add head of snake to array
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
};

const checkWin = (snakeX, snakeY) => {
  console.log(
    "x difference: " + snakeX
    // // arrayOfNodeXCoords[arrayOfNodeXCoords.length - 1],
    // "y difference: " +
    // snakeY -
    // arrayOfNodeYCoords[arrayOfNodeYCoords.length - 1]
  );
  if (
    snakeX == arrayOfNodeXCoords[arrayOfNodeXCoords.length - 1] &&
    snakeY == arrayOfNodeYCoords[arrayOfNodeYCoords.length - 1]
  ) {
    addScore();
  }
};
const addScore = () => {
  score++;
  document.getElementById("output").innerHTML = score;
  createNode();
};

newGame();

document.getElementById("new-game-button").addEventListener("click", newGame);
document.getElementById("create-node").addEventListener("click", createNode);
window.addEventListener("keydown", e => (direction = e.keyCode));
