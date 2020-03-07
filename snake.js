const canvas = document.getElementById("snake-container"),
  ctx = canvas.getContext("2d");
let snakeX = 100,
  snakeY = 200;
const arrayOfSnakeXCoords = [snakeX];
const arrayOfNodeYCoords = [snakeY];
let dx = 1;
let dy = 1;
let direction;

const newGame = () => {
  snakeX = 200;
  snakeY = 250;
  direction = 0;
  clearCanvas();
  createNode();
  setInterval(moveSnake, 10);
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const createNode = () => {
  let x = Math.floor(Math.random() * canvas.width),
    y = Math.floor(Math.random() * canvas.height);
  if (x > canvas.width) {
    x = canvas.width-20;
  }
  if (y > canvas.height) {
    y = canvas.height - 20;
  }
  createNodeOnCanvas(x, y);
};

const createNodeOnCanvas = (x, y) => {
  //   arrayOfSnakeXCoords.push(x);
  //   arrayOfNodeYCoords.push(y);
  ctx.fillStyle = "black";
  ctx.fillRect(x, y, 5, 5);
};

const moveSnake = () => {
  console.log(arrayOfSnakeXCoords, arrayOfNodeYCoords);
  //clear end of snake
  ctx.clearRect(arrayOfSnakeXCoords[0], arrayOfNodeYCoords[0], 20, 20);
  //remove end of snake from arrays
  arrayOfNodeYCoords.splice(0, 1);
  arrayOfSnakeXCoords.splice(0, 1);
  ctx.fillStyle = "red";
  //create head of snake
  ctx.fillRect(snakeX, snakeY, 20, 20);
  //add head of snake to array
  arrayOfSnakeXCoords.push(snakeX);
  arrayOfNodeYCoords.push(snakeY);
  switch (direction) {
    // left
    case 37:
      snakeX -= dx;
      break;
      // up
    case 38:
      snakeY -= dy;
      break;
      // right
    case 39:
      snakeX += dx;
      break;
      // down
    case 40:
      snakeY += dy;
      break;
  }
  //   console.log("snakeX = " + snakeX, "snakeY = " + snakeY);
};

newGame();

document.getElementById("new-game-button").addEventListener("click", newGame);
document.getElementById("create-node").addEventListener("click", createNode);
window.addEventListener("keydown", e => (direction = e.keyCode));