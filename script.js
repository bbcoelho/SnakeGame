let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 8;
let snake = [];
snake[0] ={
    x: 22*box,
    y: 8*box
}
let direction = "right";
let food ={
    x: Math.floor(Math.random() * 43 + 1) * box,
    y: Math.floor(Math.random() * 29 + 1) * box
}

function criarBG(){
    context.fillStyle = "rgb(188, 201, 0)";
    context.fillRect(0, 0, 44*box, 30*box);
}

function criarCobrinha(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "rgb(111, 96, 0)";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "black";
    context.fillRect(food.x, food.y, box, box);
}

function gameOver(){
    clearInterval(jogo);
    alert('Game Over!! :(  Recarregue a página para jogar novamente');
}

document.addEventListener('keydown', update);
function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){   
    
    if(snake[0].x > 43*box && direction == "right") gameOver();
    if(snake[0].x < 0 && direction == 'left') gameOver();
    if(snake[0].y > 29*box && direction == "down") gameOver();
    if(snake[0].y < 0 && direction == 'up') gameOver();

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            gameOver();
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;
    
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }
    else{
        food.x = Math.floor(Math.random() * 43 +1) * box;
        food.y = Math.floor(Math.random() * 29 +1) * box;
    }

    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 70);