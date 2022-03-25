
document.addEventListener('keydown', function(event){
	if(event.keyCode == 13){
		menu.kill();
		game.paused = false;
	}
});

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: 
	preload, create: create, update: update, render: render});

var facing;
var fireRate = 350;
var nextFire = 0;
var nextFireComp = 0;
var fireRateComp = 350;
var lives = 3;
var colonistCount = 8;

function preload(){
	game.load.spritesheet('native', 'assets/native-copy-copy.png', 32, 48)
	game.load.image('arrow', 'assets/arrow.png');
	game.load.image('bullet', 'assets/bullet.png');
	game.load.image('colonist', 'assets/colonist-copy.png');
	game.load.image('menu', 'assets/sky.png');

	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;
}

function create(){

	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.stage.backgroundColor = "#009900";

	player = game.add.sprite(100, 260, 'native');
	//colonist = game.add.sprite(700,200, 'colonist');

	//colonist.enableBody = true;

	game.physics.arcade.enable(player);
	//game.physics.arcade.enable(colonist);

	player.animations.add('down', [0, 1, 2, 3], 10, true);
	player.animations.add('up', [12, 13, 14, 15], 10, true);
	player.animations.add('left', [4, 5, 6, 7], 10, true);
	player.animations.add('right', [8, 9, 10, 11], 10, true);

	cursors = game.input.keyboard.createCursorKeys();
	

	colonists = game.add.group();
	colonists.enableBody = true;
	game.physics.arcade.enable(colonists);

	for(var i = 0; i < 8; i++){
		var colonist = colonists.create(700, i * 70 + 10, 'colonist');
		colonist.enableBody = true;
		game.physics.arcade.enable(colonist);
	}

	arrows = game.add.group();
	arrows.enableBody = true;
	arrows.createMultiple(10,'arrow');

	arrows.setAll('checkWorldBounds', true);
	arrows.setAll('outOfBoundsKill', true);

	bullets = game.add.group();
	bullets.enableBody = true;
	bullets.createMultiple(10,'bullet');

	bullets.setAll('checkWorldBounds', true);
	bullets.setAll('outOfBoundsKill', true);

	menu = game.add.sprite(0,0, 'menu');

	game.paused = true;


}

function update(){

	if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
		game.paused = false;
	}

	player.body.velocity.x = 0;
	player.body.velocity.y = 0;

	//these controls are a little buggy
	if(cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W)){
		//move up
		player.body.velocity.y = -150;

		player.animations.play('up');
		console.log("ate");

		facing = 'up';

	}

	else if(cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S)){
		//move down
		player.body.velocity.y = 150;

		player.animations.play('down');

		facing = 'down';
	}

	else if(cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A)){
		//move left
		player.body.velocity.x = -150;

		player.animations.play('left');

		facing = 'left';
	}

	else if(cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D)){
		//move right
		player.body.velocity.x = 150;

		player.animations.play('right');
	
		facing = 'right';
	}
	
	else{
		//stand still
		player.animations.stop();

		if(facing == 'up'){
			player.frame = 12;
		}
		else if(facing == 'down'){
			player.frame = 0;
		}
		else if(facing == 'left'){
			player.frame = 4;
		}
		else if(facing == 'right'){
			player.frame = 9;
		}
		else{
			player.frame = 0;
		}

		//player.frame = 0;
	} 

	if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && facing == 'right'){
		//console.log("hey");
		fire();
	}

	//game.physics.arcade.collide(colonist, player);

	game.physics.arcade.overlap(colonists, arrows, colonistHit, null, this);

	game.physics.arcade.getObjectsAtLocation(700, player.body.y, colonists, inSight);

	game.physics.arcade.overlap(player, bullets, playerHit, null, this);

	//game.debug.text('lives: ' + lives, 10, 10);
	if(lives == 0){
		player.kill();
		game.debug.text('lives: ' + lives, 10, 20);
		game.add.text(100, 100, 'YOU DIED!', {fontSize: '72px', fill: '#f00'});
		game.add.text(140, 200, 'refresh to try again', {fontSize: '32px', fill: '#f00'});
		game.paused = true;
	}

	if(colonistCount == 0){
		game.add.text(100, 100, 'YOU PROTECTED YOUR LAND!', {fontSize: '32px', fill: '#f00'});
		game.add.text(200, 200, 'refresh to play again', {fontSize: '32px', fill: '#f00'});
		game.paused = true;
	}
}

function render(){
	game.debug.text('lives: ' + lives, 10, 20);
}


console.log("works47");

function fire(){
	var arrow = arrows.getFirstExists(false);
	if(arrow){
		if(game.time.now > nextFire){
			nextFire = game.time.now + fireRate;

			arrow.reset(player.body.x + 8, player.body.y + 19);
			arrow.body.velocity.x = 350;
		}

	}
}

function colonistHit(colonist, arrow){
	arrow.kill();
	colonist.kill();
	colonistCount--;
}

function playerHit(player, bullet){
	bullet.kill();
	lives--;
	console.log('ouch');
}

function inSight(colonist){
	console.log("in sight");
	var bullet = bullets.getFirstExists(false);
	if(bullet){
		if(game.time.now > nextFireComp){
			nextFireComp = game.time.now + fireRate;

			bullet.reset(700, player.body.y);
			bullet.body.velocity.x = -350;
		}
	}
}





