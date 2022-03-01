//set up background image
var bgImage = new Image();
var bgReady = false;
bgImage.onload = function(){
	bgReady = true;
}
bgImage.src = "img/background.png";

//setup human paddle image
var padImage = new Image();
var padReady = false;
padImage.onload = function(){
	padReady = true;
}
padImage.src = "img/paddle.png";

//set up computer paddle image
var comImage = new Image();
var comReady = false;
comImage.onload = function(){
	comReady = true;
}
comImage.src = "img/paddle.png";

//set up ball image
var ballImage = new Image();
var ballReady = false;
ballImage.onload = function(){
	ballReady = true;
}
ballImage.src = "img/ball.png";

//set up ballTest image
var ballTestImage = new Image();
var ballTestReady = false;
ballTestImage.onload = function(){
	ballTestReady = true;
}
ballTestImage.src = "img/ball.png";

//make human paddle position object to use when drawing it
var padPosition = {
	x: 10,
	y: 540
};

//make computer paddle position object to use when drawing it
var comPosition = {
	x: 150,
	y: 40,
	speed: 1
};


//make ball position object to use when drawing it
var ballPosition = {
	x: 195,
	y: 300,
	speed: 2,
	speedx: 1
};

var ballTestPosition = {
	x: 100,
	y: 200,
};

//set up requestAnimationFrame
var animate = window.requestAnimationFrame || 
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	function(callback) {window.setTimeout(callback, 1000/60)};


//set up canvas
var canvas = document.createElement('canvas');
var logDiv = document.createElement('div');

canvas.width = 400;
canvas.height = 600;
var context = canvas.getContext('2d');

//boolean gameOn and start value
var gameOn = false;
var start = false
var loaded = false;
//run main game loop when window loads
window.onload = function(){
	document.body.appendChild(canvas);
	document.body.appendChild(logDiv);
	//canvas.style.marginLeft = "auto";
	//canvas.style.marginRight = "auto";
	canvas.parentElement.style.textAlign = "center";
	context.fillText("Press enter to play pong!", 150, 250);
	context.fillText("Use left/right arrow keys to move.", 135, 300)
	//context.fillText("First to 5 wins.", 175, 350);

	loaded = true; //I call the run function when space is pressed
	//*see eventlistener below
};

//run function called when space is pressed
function run(){
	//
	//if gameOn (space pressed) and window is loaded, run main loop
	if(gameOn == true && loaded == true){
		animate(step);
	}
}




//main game loop ran through requestAnimationFrame (animate())
var step = function(){
	//if gameOn is true, render/update/etc.
	if(gameOn == true){
		update();
		render();
		animate(step);
	}
	
};

var update = function(){

	move();
	didScore();

};

//draw objects
var render = function(){

	
	if(bgReady == true){
		context.drawImage(bgImage,0,0);
	}

	if(padReady == true){
		context.drawImage(padImage,padPosition.x,padPosition.y);
	}

	if(comReady == true){
		context.drawImage(comImage,comPosition.x,comPosition.y);
	}

	if(ballReady == true){
		context.drawImage(ballImage,ballPosition.x,ballPosition.y);
	}
	/*
	if(ballTestReady == true){
		context.drawImage(ballTestImage,ballTestPosition.x,ballTestPosition.y);
	}*/
	context.fillStyle = "red";
	context.fillText("Player: " + score, 40, 590);
	context.fillText("Computer: " + computer, 300, 590);

	//keep log of positions/etc
	/*
	logDiv.innerHTML = "score: " + score + " computer: " + computer +
	"<br>" + "test ball X: " +
	ballTestPosition.x + " " + "test ball Y: " + ballTestPosition.y
	+ "<br>" + "paddle X: " + padPosition.x + "<br>" + "Computer X: " +
	comPosition.x

	+ "<br>" + "ball speed: " + ballPosition.speed
	; */

	//display win text
	//have to do it here because canvas background must be drawn first
	if(score == 1){
		context.fillText("You win!", 180, 250);
		context.fillText("Refresh to play again.", 150, 350);
	}
	//display lose text
	if(computer == 1){
		context.fillText("You lose!", 180, 250);
		context.fillText("Refresh to play again.", 150, 350);
	}

}

//handle user input
var keysDown = {};

window.addEventListener("keydown", function(event){
	keysDown[event.keyCode] = true;

	if(event.keyCode == 13){
		gameOn = true;
		start = true;
		run();
		//alert(start);
	}
});

window.addEventListener("keyup", function(event){
	delete keysDown[event.keyCode];
});

//check keysDown value and move human paddle accordingly
var move = function(){
	if(keysDown[37]){
		padPosition.x -= 5;
	}
	if(keysDown[39]){
		padPosition.x += 5;
	}

	//ADD WHERE IF ITS GOING RIGHT AND IT HITS RIGHT SIDE, 
	//RETAINS X-DIR
	//IF IT HITS LEFT SIDE, REVERSES X-DIR
	//MAYBE HAVE 'IF SPEEDX > 0' TO DETERMINE RIGHT DIRECTION
	//AND IF THE BALL POS IS > PAD POS + 50 AND < PAD POS 100
	//TO DETERMINE IF IT HITS RIGHT SIDE
	//THEN JUST CHANGE SPEEDX TO POSITIVE OR NEGATIVE ACCORDINGLY
	//if ball hits human paddle
	//ALSOOOO I want to eventually make it so paddles can't go off screen
	if(ballPosition.y > padPosition.y - 10 &&
		ballPosition.x >= padPosition.x - 5 &&
		ballPosition.x <= padPosition.x + 95){
		//make faster
		if(Math.abs(ballPosition.speed) < 4){
			ballPosition.speed = ballPosition.speed * 1.25;
		}
		//change direction
		ballPosition.speed = -ballPosition.speed;
	}

	//if ball hits computer paddle
	if(ballPosition.y < comPosition.y + 20 &&
		ballPosition.x >= comPosition.x - 5 &&
		ballPosition.x <= comPosition.x + 95){
		//make faster
		if(Math.abs(ballPosition.speed) < 4){
			ballPosition.speed = ballPosition.speed * 1.25;
		}
		//change direction
		ballPosition.speed = -ballPosition.speed;
	}

	//if ball hits walls
	if(ballPosition.x >= 390){
		//change x speed
		if(Math.abs(ballPosition.speed) < 4){
			ballPosition.speedx = ballPosition.speedx * 1.25;
		}
		//change x-direction
		ballPosition.speedx = -ballPosition.speedx;
	}
	else if(ballPosition.x <= 0 ){
		//change x speed
		if(Math.abs(ballPosition.speed) < 4){
			ballPosition.speedx = ballPosition.speedx * 1.25;
		}
		//change x-direction
		ballPosition.speedx = -ballPosition.speedx;
	}

	//move ball
	ballPosition.y += ballPosition.speed;
	ballPosition.x += ballPosition.speedx;

	//move computer
	//http://stackoverflow.com/questions/4577814/pong-how-does-the-paddle-know-where-the-ball-will-hit
	if(comPosition.x < ballPosition.x - 45){
		comPosition.x += comPosition.speed;
	}
	else if(comPosition.x > ballPosition.x - 45){
		comPosition.x -= comPosition.speed;
	}
	
	//This was my tester to see where coordinats were on canvas
	/*
	//left (a)
	if(keysDown[65]){
		ballTestPosition.x -= 5;
	}
	//up (w)
	if(keysDown[87]){
		ballTestPosition.y -= 5;
	}
	//right (d)
	if(keysDown[68]){
		ballTestPosition.x += 5;
	}
	//down (s)
	if(keysDown[83]){
		ballTestPosition.y += 5;
	} */
}

var score = 0;
var computer = 0;

//function that randomly returns 1 or -1
var headsTails = function(){

	var num = Math.random();

	if(num < 0.5){
		return -1;
	}
	else{
		return 1;
	}

};

var reset = function(){
	ballPosition.x = 400 * Math.random();
	ballPosition.y = 300;
	ballPosition.speed = 2;
	ballPosition.speedx = 1;

	ballPosition.speedx = ballPosition.speedx * headsTails();
}

var didScore = function(){

	context.fillStyle = "red";
	context.fillText("hello", 10, 10);
	//why this no work
	if(score == 1){
		gameOn = false;
	}
	if(computer == 1){
		gameOn = false;	
	}

	if(ballPosition.y < 0){
		score++;
		reset();
	}

	else if(ballPosition.y > 600){
		computer ++;
		reset();
	}
}















