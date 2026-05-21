const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const box = 20;
let snake = [];
snake[0] = { x: 10 * box, y: 10 * box };

let food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box
};

let d;
let score = 0;

document.addEventListener("keydown", direction);
function direction(event) {
    if(event.key == 'ArrowLeft' && d != "RIGHT") d = "LEFT";
    else if(event.key == 'ArrowUp' && d != "DOWN") d = "UP";
    else if(event.key == 'ArrowRight' && d != "LEFT") d = "RIGHT";
    else if(event.key == 'ArrowDown' && d != "UP") d = "DOWN";
}

function draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "#4b92d6" : "#fff";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "#000";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if(snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height) {
        clearInterval(game);
        ctx.fillStyle = "white";
        ctx.font = "40px sans-serif";
        ctx.fillText("Игра окончена! Счёт: " + score, canvas.width/2 - 200, canvas.height/2);
        return;
    }

    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "20px sans-serif";
    ctx.fillText("Счёт: " + score, 20, 40);
}

let game = setInterval(draw, 100);

// Если окно поменяет размер
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});