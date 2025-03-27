const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // Snake body size
const headSize = box * 4; // Enlarge snake head (80x80)
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

    if (game) clearInterval(game);
    game = setInterval(draw, 200);
}

// Listen for keyboard input (fallback)
window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    if (event.key === "Enter") startGame();
});

// Touch control variables
let touchStartX = 0;
let touchStartY = 0;

// Detect swipe gestures
canvas.addEventListener("touchstart", (event) => {
    let touch = event.touches[0]; // Get first touch
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
});

canvas.addEventListener("touchend", (event) => {
    let touch = event.changedTouches[0]; // Get end touch
    let deltaX = touch.clientX - touchStartX;
    let deltaY = touch.clientY - touchStartY;

    // Determine swipe direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 30 && direction !== "LEFT") direction = "RIGHT";
        if (deltaX < -30 && direction !== "RIGHT") direction = "LEFT";
    } else {
        if (deltaY > 30 && direction !== "UP") direction = "DOWN";
        if (deltaY < -30 && direction !== "DOWN") direction = "UP";
    }
});

// Optional: Tap to move (divides screen into 4 areas)
canvas.addEventListener("touchstart", (event) => {
    let touch = event.touches[0]; 
    let x = touch.clientX;
    let y = touch.clientY;

    if (x < canvas.width / 2 && y < canvas.height / 2 && direction !== "DOWN") {
        direction = "UP"; // Top-left
    } else if (x > canvas.width / 2 && y < canvas.height / 2 && direction !== "LEFT") {
        direction = "RIGHT"; // Top-right
    } else if (x < canvas.width / 2 && y > canvas.height / 2 && direction !== "RIGHT") {
        direction = "LEFT"; // Bottom-left
    } else if (x > canvas.width / 2 && y > canvas.height / 2 && direction !== "UP") {
        direction = "DOWN"; // Bottom-right
    }
});

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    for (let i = 0; i < snake.length; i++) {
        if (i === 0) {
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

    // Wall collision (adjusted for large head size)
    if (newX < -headSize / 2 || newX + headSize / 2 > canvas.width || 
        newY < -headSize / 2 || newY + headSize / 2 > canvas.height) {
        alert("Game Over: You hit the wall!");
        startGame();
        return;
    }

    // Self-collision
    for (let i = 1; i < snake.length; i++) {
        if (Math.abs(newX - snake[i].x) < box && Math.abs(newY - snake[i].y) < box) {
            alert("와우! 끝났습니다. 다시 하려면 확인버튼을 누르세요.");
            startGame();
            return;
        }
    }

    // Food collision (adjusted for larger head)
    if (Math.abs(newX - food.x) < headSize / 2 && Math.abs(newY - food.y) < headSize / 2) {
        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: newX, y: newY };
    snake.unshift(newHead);
}
