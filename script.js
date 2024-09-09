const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
let snake;
let fruit;
let dx = scale; // Movimiento inicial de la serpiente
let dy = 0;
let isGameOver = false;

document.addEventListener('keydown', changeDirection);

function setup() {
    snake = [];
    snake[0] = { x: Math.floor(columns / 2) * scale, y: Math.floor(rows / 2) * scale };
    placeFruit();
    setInterval(gameLoop, 100);
}

function gameLoop() {
    if (isGameOver) return;

    clearCanvas();
    moveSnake();
    checkCollision();
    drawSnake();
    drawFruit();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === fruit.x && head.y === fruit.y) {
        placeFruit();
    } else {
        snake.pop();
    }
}

function drawSnake() {
    ctx.fillStyle = 'green';
    for (const segment of snake) {
        ctx.fillRect(segment.x, segment.y, scale, scale);
    }
}

function drawFruit() {
    ctx.fillStyle = 'red';
    ctx.fillRect(fruit.x, fruit.y, scale, scale);
}

function placeFruit() {
    fruit = {
        x: Math.floor(Math.random() * columns) * scale,
        y: Math.floor(Math.random() * rows) * scale
    };
}

function changeDirection(event) {
    switch (event.keyCode) {
        case 37: // Left arrow
            if (dx === 0) {
                dx = -scale;
                dy = 0;
            }
            break;
        case 38: // Up arrow
            if (dy === 0) {
                dx = 0;
                dy = -scale;
            }
            break;
        case 39: // Right arrow
            if (dx === 0) {
                dx = scale;
                dy = 0;
            }
            break;
        case 40: // Down arrow
            if (dy === 0) {
                dx = 0;
                dy = scale;
            }
            break;
    }
}

function checkCollision() {
    const head = snake[0];
    
    // Colisión con los bordes
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver();
    }

    // Colisión con la serpiente misma
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

function gameOver() {
    isGameOver = true;
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText('Game Over', canvas.width / 4, canvas.height / 2);
}

setup();
