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