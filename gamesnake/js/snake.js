//var as = document.getElementsByClassName("fc");
class point{
	constructor(row,col) {
		this.row=row;
		this.col=col;
	}
}
var Direction={
	up:87,
	left:65,
	right:68,
	down:83,
};
var maprow=10;
var mapcol=10;
var width=25;
var height=25;
var mapcolor="";
var gamespeed=200;
var bodycolor="green";
var headcolor="red";
var snake=new Array();
var food= new point(0,0);
var snakefx=2;
var gameOverDialog="点击确定重新开始游戏";
var map= document.getElementById("map");
for(let i=0;i<maprow;i++){
	var tr=document.createElement("tr");
	for(let j=0;j<mapcol;j++){
		var td=document.createElement("td");
		td.style="background-color:"+mapcolor+";width:"+width+";height:"+height+"px;";
		tr.appendChild(td);				
	}
	map.appendChild(tr);
}
function closeScreen(){
	for(let i=0;i<maprow;i++){
		for(let j=0;j<mapcol;j++){
			var td=document.getElementsByTagName("tr")[i].getElementsByTagName("td")[j];
			if(td.style.backgroundColor!=mapcolor){
				td.style.backgroundColor=mapcolor
			}
			if(i==food.row && j==food.col){
				td.style.backgroundColor=headcolor;
			}
		}
	}	
}
function drawSnake(){
	closeScreen();
	for(let i=snake.length-1;i>=0;i--){
		var td=document.getElementsByTagName("tr")[snake[i].row].getElementsByTagName("td")[snake[i].col];
		if(i==snake.length-1){
			td.style.backgroundColor=headcolor;
		}else{
			td.style.backgroundColor=bodycolor;
		}
	}
}
function snakeCollidWall(){
	if(snake[snake.length-1].row>=maprow ||
	 snake[snake.length-1].row<0 || 
	 snake[snake.length-1].col>=mapcol || 
	 snake[snake.length-1].col<0)
	{
		alert(gameOverDialog);
		init();
	}
}
function snakeCollidThis(){
	for(let i=snake.length-2;i>=0;i--){
		if(snake[snake.length-1].row==snake[i].row && snake[snake.length-1].col==snake[i].col){
			alert(gameOverDialog);
			init();
		}
	}
}
function foodCreat(){
	var row=parseInt(Math.random()*maprow);
	var col=parseInt(Math.random()*mapcol);
	for(let i=snake.length-1;i>=0;i--){
		if(snake[i].row==row && snake[i].col==col){
			foodCreat();
			return;
		}
	}
	food.row=row;
	food.col=col;
}
function snakeEatFood(){
	if(snake[snake.length-1].row==food.row && snake[snake.length-1].col==food.col){
		snake.push(new point(snake[snake.length-1].row,snake[snake.length-1].col));
		foodCreat();
	}
}
function snakeMove(){
	var curpoint=new point(snake[snake.length-1].row,snake[snake.length-1].col);
	snakeCollidWall();
	snakeCollidThis();
	snakeEatFood();
	switch(snakefx){
		case Direction.up:
			snake[snake.length-1].row--;
			break;
		case Direction.down:
			snake[snake.length-1].row++;
			break;
		case Direction.right:
			snake[snake.length-1].col++;
			break;
		case Direction.left:
			snake[snake.length-1].col--;
			break;
	}
	for(let i=snake.length-1;i>0;i--){
		var temp=new point(snake[i-1].row,snake[i-1].col);
		snake[i-1].row=curpoint.row;
		snake[i-1].col=curpoint.col;
		curpoint=temp;
	}
	
}
var drawtim=self.setInterval(function(){
		drawSnake();
},10);
var mytim;
function stopMyTim(){
	self.clearInterval(drawtim);
	self.clearInterval(mytim);
}
function startMyTim(){
	drawtim=self.setInterval(function(){
		drawSnake();
	},10);
	mytim=self.setInterval(function(){
		snakeMove();
	},gamespeed);
}
function resetMyTim(){
	stopMyTim();
	startMyTim();
}
function init(){
	stopMyTim();
	snake=new Array(new point(1,1),new point(1,1),new point(1,1),new point(1,2));
	snakefx=Direction.right;
	closeScreen();
	foodCreat();
	resetMyTim();
}
init();
self.onkeydown=function(ev){
	var key=ev.keyCode;	
	switch(key){
		case 68:
		case 83:
		case 65:
		case 87:
			if(snakefx!=key){
				switch(key+snakefx){
					case 133:
					case 170:
						return;
				}
				stopMyTim();
				snakefx=key;
				snakeMove();
				resetMyTim();
			}
	}
	
}

