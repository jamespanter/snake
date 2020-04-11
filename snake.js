const canvas = document.getElementById("snake-container"),
  ctx = canvas.getContext("2d");
let snakeX,
  snakeY,
  direction,
  score = 0,
  arrayOfSnakeXCoords = [],
  arrayOfSnakeYCoords = [],
  arrayOfNodeXCoords = [],
  arrayOfNodeYCoords = [],
  d = 1;

const newGame = () => {
  resetScore();
  resetSnakePositionAndDirection();
  clearCanvas();
  createNode();
  moveSnake();
};

const resetSnakePositionAndDirection = () => {
  snakeX = 200;
  snakeY = 250;
  direction = 0;
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const createNode = () => {
  let x = Math.floor(Math.random() * canvas.width),
    y = Math.floor(Math.random() * canvas.height);
  if (x > canvas.width - 35) {
    x = canvas.width - 35;
  }
  if (y > canvas.height - 35) {
    y = canvas.height - 35;
  }
  arrayOfNodeXCoords.push(x);
  arrayOfNodeYCoords.push(y);
  // console.log("Node X: " + arrayOfNodeXCoords, "Node Y: " + arrayOfNodeYCoords);
  ctx.fillStyle = "yellow";
  ctx.fillRect(x, y, 15, 15);
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
  console.log("x: " + arrayOfSnakeXCoords, "y: " + arrayOfSnakeYCoords);
  ctx.clearRect(arrayOfSnakeXCoords[0] - 1, arrayOfSnakeYCoords[0] - 1, 21, 21);
  arrayOfSnakeYCoords.splice(0, 1);
  arrayOfSnakeXCoords.splice(0, 1);
  ctx.fillStyle = "rgb(111, 206, 111)";
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
  let nodeXEnd = nodeX + 15;
  let nodeYStart = nodeY;
  let nodeYEnd = nodeY + 15;
  if (
    nodeXStart >= snakeXStart &&
    nodeXEnd <= snakeXEnd &&
    nodeYStart >= snakeYStart &&
    nodeYEnd <= snakeYEnd
  ) {
    addScore();
    createNode();
  } else {
    ctx.fillStyle = "yellow";
    ctx.fillRect(
      arrayOfNodeXCoords[arrayOfNodeXCoords.length - 1],
      arrayOfNodeYCoords[arrayOfNodeYCoords.length - 1],
      15,
      15
    );
  }
};

const addScore = () => {
  score++;
  document.getElementById("output").innerHTML = score;
};

newGame();

document.getElementById("new-game-button").addEventListener("click", newGame);
window.addEventListener("keydown", (e) => (direction = e.keyCode));
