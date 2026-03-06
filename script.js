// Simple Snake Game Logic

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let snake = [{ x: 10, y: 10 }];
let food = { x: Math.floor(Math.random() * canvas.width / 10) * 10, y: Math.floor(Math.random() * canvas.height / 10) * 10 };
let score = 0;
let dx = 10;
let dy = 0;
let isPaused = false;
let difficulty = 100;

// Control settings
window.addEventListener('keydown', changeDirection);

// Game loop
function gameLoop() {
    if (!isPaused) {
        if (collision()) return;
        moveSnake();
        if (ateFood()) {
            score += 10;
            food = { x: Math.floor(Math.random() * canvas.width / 10) * 10, y: Math.floor(Math.random() * canvas.height / 10) * 10 }; 
        }
        draw();
    }
    setTimeout(gameLoop, difficulty);
}

function moveSnake() {
    let head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (!ateFood()) {
        snake.pop();
    }
}

function ateFood() {
    return snake[0].x === food.x && snake[0].y === food.y;
}

function collision() {
    // Wall collision
    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
        alert('Game Over!');
        document.location.reload();
        return true;
    }
    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            alert('Game Over!');
            document.location.reload();
            return true;
        }
    }
    return false;
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (dy === 0) {
                dx = 0;
                dy = -10;
            }
            break;
        case 'ArrowDown':
            if (dy === 0) {
                dx = 0;
                dy = 10;
            }
            break;
        case 'ArrowLeft':
            if (dx === 0) {
                dx = -10;
                dy = 0;
            }
            break;
        case 'ArrowRight':
            if (dx === 0) {
                dx = 10;
                dy = 0;
            }
            break;
        case 'p': // To pause
            isPaused = !isPaused;
            break;
        case '1': // Easy
            difficulty = 200;
            break;
        case '2': // Medium
            difficulty = 100;
            break;
        case '3': // Hard
            difficulty = 50;
            break;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw snake
    for (let part of snake) {
        ctx.fillStyle = 'green';
        ctx.fillRect(part.x, part.y, 10, 10);
    }
    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
    // Draw score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

gameLoop();