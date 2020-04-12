const canvas = document.getElementById("snake-container"),
  ctx = canvas.getContext("2d");
let snakeX,
  snakeY,
  id,
  direction,
  score = 0,
  arrayOfSnakeXCoords = [],
  arrayOfSnakeYCoords = [],
  arrayOfNodeXCoords = [],
  arrayOfNodeYCoords = [],
  d = 1.5;

const newGame = () => {
  d = 1.5;
  cancelAnimationFrame(id);
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
  ctx.fillStyle = "yellow";
  ctx.fillRect(x, y, 10, 10);
};

const resetScore = () => {
  score = 0;
  document.getElementById("output").innerHTML = score;
};

const checkLose = () => {
  if (snakeX > 800 || snakeY > 500) {
    newGame();
  } else if (snakeX < 0 || snakeY < 0) {
    newGame();
  }
};

const moveSnake = () => {
  checkLose();
  checkWin(snakeX, snakeY);
  ctx.clearRect(
    arrayOfSnakeXCoords[0] - 1,
    arrayOfSnakeYCoords[0] - 1,
    20 + d,
    20 + d
  );
  arrayOfSnakeYCoords.splice(0, 1);
  arrayOfSnakeXCoords.splice(0, 1);
  ctx.fillStyle = "rgb(111, 206, 111)";
  ctx.fillRect(snakeX, snakeY, 20, 20);
  arrayOfSnakeXCoords.push(snakeX);
  arrayOfSnakeYCoords.push(snakeY);
  switch (direction) {
    case 37:
      snakeX -= d;
      break;
    case 38:
      snakeY -= d;
      break;
    case 39:
      snakeX += d;
      break;
    case 40:
      snakeY += d;
      break;
  }
  id = requestAnimationFrame(moveSnake);
};

const checkWin = (snakeX, snakeY) => {
  let nodeX = arrayOfNodeXCoords[arrayOfNodeXCoords.length - 1];
  let nodeY = arrayOfNodeYCoords[arrayOfNodeYCoords.length - 1];
  let snakeXStart = snakeX;
  let snakeXEnd = snakeX + 20;
  let snakeYStart = snakeY;
  let snakeYEnd = snakeY + 20;
  let nodeXStart = nodeX;
  let nodeXEnd = nodeX + 10;
  let nodeYStart = nodeY;
  let nodeYEnd = nodeY + 10;
  if (
    nodeXStart >= snakeXStart &&
    nodeXEnd <= snakeXEnd &&
    nodeYStart >= snakeYStart &&
    nodeYEnd <= snakeYEnd
  ) {
    d = d + 0.1;
    addScore();
    createNode();
  } else {
    ctx.fillStyle = "yellow";
    ctx.fillRect(
      arrayOfNodeXCoords[arrayOfNodeXCoords.length - 1],
      arrayOfNodeYCoords[arrayOfNodeYCoords.length - 1],
      10,
      10
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
