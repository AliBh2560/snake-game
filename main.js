var board = document.getElementById('board');

var context;

var cols = 20;
var rows = 20;

var blockSize = 25;

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var snakeBody = [];

var speedX = 0;
var speedY = 0;

var foodX;
var foodY;

var gameOver = false;

window.onload = () => {

    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext('2d')

    placeFood()
    document.addEventListener('keyup', changeDirecation);
    update()
    setInterval(update, 1000 / 10)
}

function update() {

    if (gameOver) return;

    context.fillStyle = 'black'
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = 'red'
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        placeFood()
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]
    }

    context.fillStyle = 'lime'
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }

    if (snakeX < 0 || snakeX > cols * blockSize || snakeY > rows * blockSize || snakeY < 0) {
        gameOver = true;
        alert('game over')
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert('game over');
        }
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeBody.length == 400) {
            alert('you won')
        }
    }



}

function placeFood() {

    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;

}

function changeDirecation(e) {

    if (e.code == 'ArrowUp' && speedY != 1) {
        speedX = 0;
        speedY = -1;
    } else if (e.code == 'ArrowDown' && speedY != -1) {
        speedX = 0;
        speedY = 1;
    } else if (e.code == 'ArrowLeft' && speedX != 1) {
        speedY = 0;
        speedX = -1;
    } else if (e.code == 'ArrowRight' && speedX != -1) {
        speedY = 0;
        speedX = 1;
    }

}