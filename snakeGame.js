const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // Snake body size remains 20x20
const headSize = box * 4; // Enlarge snake head to 80x80
let snake, direction, food, game;

const snakeHeadImg = new Image();
snakeHeadImg.src = "mrshin.png"; // Load snake head image

startGame();

function startGame() {
    snake = [{ x: 10 * box, y: 10 * box }];
    direction = "RIGHT";
    food = {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };

    if (game) clearInterval(game); // Stop any previous game loop
    game = setInterval(draw, 200);
}

// Listen for key presses
window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";

    if (event.key === "Enter") startGame();
});

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    for (let i = 0; i < snake.length; i++) {
        if (i === 0) {
            // Draw enlarged snake head (80x80) centered on the 20x20 grid
            ctx.drawImage(snakeHeadImg, snake[i].x - (headSize - box) / 2, snake[i].y - (headSize - box) / 2, headSize, headSize);
        } else {
            ctx.fillStyle = "green";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }
    }

    let newX = snake[0].x;
    let newY = snake[0].y;

    if (direction === "UP") newY -= box;
    if (direction === "DOWN") newY += box;
    if (direction === "LEFT") newX -= box;
    if (direction === "RIGHT") newX += box;

    if (newX === food.x && newY === food.y) {
        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) 요.");
        return;
    }

    snake.unshift(newHead);
}
