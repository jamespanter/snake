const canvas = document.getElementById("snake-container");
const ctx = canvas.getContext("2d");
let snakeX = 100;
let snakeY = 200;
let dx = 0.5;
let dy = 0.5;
let direction = 39;

const newGame = () => {
  snakeX = 100;
  snakeY = 200;
  dx = 0.5;
  dy = 0.5;

  clearCanvas();
  createNode();
  setInterval(moveSnake, 30);
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const createNode = () => {
  const x = Math.floor(Math.random() * canvas.width);
  const y = Math.floor(Math.random() * canvas.height);
  createNodeOnCanvas(x, y);
};

const createNodeOnCanvas = (x, y) => {
  ctx.fillStyle = "black";
  ctx.fillRect(x, y, 20, 20);
};

const moveSnake = () => {
  let moveDirection;
  ctx.fillStyle = "red";
  ctx.clearRect(snakeX, snakeY, 20, 20);
  ctx.fillRect(snakeX, snakeY, 20, 20);
  if (direction == 38) {
    moveDirection = snakeY;
    console.log("up");
  } else if (direction == 40) {
    moveDirection = snakeY;
  } else if (direction == 37) {
    moveDirection = snakeX;
  } else if (direction == 39) {
    moveDirection = snakeX;
  }
  snakeX += dx;
  snakeY += dy;
  //   console.log("snakeX = " + snakeX, "snakeY = " + snakeY);
};

newGame();

document.getElementById("new-game-button").addEventListener("click", newGame);
document.getElementById("create-node").addEventListener("click", createNode);
window.addEventListener("keydown", e => {
  if (e.keyCode == "38") {
    direction = 38;
    console.log(direction);
    // up arrow
  } else if (e.keyCode == "40") {
    direction = 40;
    console.log(direction);

    // down arrow
  } else if (e.keyCode == "37") {
    direction = 37;
    console.log(direction);

    // left arrow
  } else if (e.keyCode == "39") {
    direction = 39;
    console.log(direction);

    // right arrow
  }
});

function checkKey(e) {
  e = e || window.event;
}
