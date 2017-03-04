/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//画布局
var canvas = document.getElementById("myCanvas");
//获取2D图形
var ctx = canvas.getContext("2d");
//小球半径
var ballRadius = 15;
//球初始位置
var x = canvas.width/2;
var y = canvas.height-30;
//球每10毫米在水平方向移动像素数量
var dx = 2;
var dy = -2;
//挡板高度,宽度
var paddleHeight = 10;
var paddleWidth = 75;
//挡板初始位置
var paddleX = (canvas.width-paddleWidth)/2;
//左右键检测
var rightPressed = false;
var leftPressed = false;
//砖块行列
var brickRowCount = 3;
var brickColumnCount = 5;
//砖块高度宽度
var brickWidth = 75;
var brickHeight = 20;
//砖块间距
var brickPadding = 10;
//砖块距离上边和左边的距离
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = document.getElementById("score").innerHTML;;

//构造一个二维数组储存所有砖块
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}


//添加监听事件
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function newGame()
{
    document.getElementById("score").innerHTML = 0;
    document.location.reload();
    
}


function keyDownHandler(e) {
    if(e.keyCode === 39) {
        rightPressed = true;
    }
    else if(e.keyCode === 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode === 39) {
        rightPressed = false;
    }
    else if(e.keyCode === 37) {
        leftPressed = false;
    }
}

//画球
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI*2);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
}

//背景记分器
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

//挡板构成
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#95DD00";
    ctx.fill();
    ctx.closePath();
}

//砖块儿图
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status === 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                //砖块颜色
                ctx.fillStyle = "#DD4800";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

//碰撞检测testing
function collisionDetection() {
    //循环便利二维数组
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status === 1) {
                //如果碰撞,推算结果
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    //更改方向
                    dy = -dy;
                    //砖块消失
                    b.status = 0;
                    //record score分数
                    score++;
                    document.getElementById("score").innerHTML = score;
                    //判断输赢
                    if(score === brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}