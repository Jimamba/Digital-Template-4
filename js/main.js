window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.spritesheet( 'player', 'assets/player.png',25,35);
        game.load.image('goal', 'assets/transcript.png');
        game.load.image('background','assets/sky.png');
        game.load.image('platforms','assets/platform.png');
        game.load.image('platform','assets/smallplatform.png');
        game.load.image('startplatform','assets/mediumplatform.png');
        game.load.spritesheet('fake','assets/fake.png',32,32);
        game.load.image('spikes','assets/Spikes.png');
        game.load.image('winner','assets/Winner.png');
        game.load.image('failone','assets/Failone.png');
        game.load.image('failtwo','assets/Failtwo.png');
        game.load.audio('music','assets/ac_theme_8bit.mp3');
    }
    
    var player;
    var platforms;
    var cursors;
    var transcript;
    var background;
    var jump;
    var fake;
    var goal;
    var spikes;
    var music;
    
    
    function create() 
    {
    	
    	background = game.add.sprite(0,0,'background');
        game.physics.startSystem(Phaser.Physics.ARCADE);
        platforms = game.add.group();
        music = game.add.audio('music');
        music.play();
     	platforms.enableBody = true;
     	var ledge = platforms.create(0,game.world.height - 32,'startplatform');
     	ledge.body.immovable = true;
     	var small = platforms.create(100,500,'platform');
     	small.body.immovable = true;
     	var small = platforms.create(200,450,'platform');
     	small.body.immovable = true;
     	fake = game.add.group();
     	fake.enableBody = true;
     	var faker = fake.create(300,450,'fake');
     	faker.body.immovable = true;
     	var small = platforms.create(400,450,'platform');
     	small.body.immovable = true;
     	var small = platforms.create(500,450,'platform');
     	small.body.immovable = true;
     	var faker = fake.create(600,450,'fake');
     	faker.body.immovable = true;
     	var small = platforms.create(700,450,'platform');
     	small.body.immovable = true;
     	var small = platforms.create(650,420,'platform');
     	small.body.immovable = true;
     	var small = platforms.create(750,360,'platform');
     	small.body.immovable = true;
     	var small = platforms.create(650,300,'platform');
     	small.body.immovable = true;
     	var small = platforms.create(550,250,'platform');
     	small.body.immovable = true;
     	var faker = fake.create(450,250,'fake');
     	faker.body.immovable = true;
     	var small = platforms.create(350,250,'platform');
     	small.body.immovable = true;
     	var faker = fake.create(250,250,'fake');
     	faker.body.immovable = true;
     	var small = platforms.create(150,250,'platform');
     	small.body.immovable = true;
     	var small = platforms.create(100,250,'platform');
     	small.body.immovable = true;
     	var faker = fake.create(50,250,'fake');
     	faker.body.immovable = true;
     	var small = platforms.create(0,160,'platform');
     	small.body.immovable = true;
     	var small = platforms.create(100,100,'platform');
     	small.body.immovable = true;
     	var small = platforms.create(132,100,'platform');
     	small.body.immovable = true;
     	
     	goal = game.add.sprite(122,90,'goal');
        goal.anchor.setTo( 0.5, 0.5 );
     	game.physics.enable( goal, Phaser.Physics.ARCADE );
     	
     	spikes = game.add.sprite(50,game.world.height - 32,'spikes');
     	game.physics.enable( spikes, Phaser.Physics.ARCADE );   	
     	
     	
     	
     	player = game.add.sprite(32, game.world.height - 150, 'player' );
     	player.anchor.setTo( 0.5, 0.5 );
     	game.physics.enable( player, Phaser.Physics.ARCADE );
     	player.body.collideWorldBounds = true;
     	player.body.gravity.y = 400;
     	player.animations.add('jump',[2,3],1,true);
     	
     	cursors = game.input.keyboard.createCursorKeys();
     	jump = game.input.keyboard.addKey(Phaser.Keyboard.F);
      
    }
    
    function update() 
    {
     game.physics.arcade.overlap(player, fake, death, null, this);
     game.physics.arcade.overlap(player, goal, win, null, this);
     game.physics.arcade.overlap(player, spikes, fall, null, this);
	 game.physics.arcade.collide(player,platforms);
	 player.body.velocity.x = 0;
	 player.frame = 4;
	 
	  if (cursors.left.isDown)
    {
        //  Move to the left
        player.frame = 1;
        player.body.velocity.x = -150;
        
 	}
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.frame = 0;
        player.body.velocity.x = 150;
        
	}
	else if (jump.isDown && player.body.touching.down)
	{
		player.body.velocity.y = -270;
		player.animations.play('jump');
	}
	//end of update
   	 }
   function death()
   {
   player.kill();
   game.add.sprite(0,0,'failone');
   music.stop();
   game.paused = true;
   }
   function fall()
   {
   player.kill();
   game.add.sprite(0,0,'failtwo');
   music.stop();
   game.paused = true;
   }
   function win()
   {
    player.kill();
    game.add.sprite(0,0,'winner');
    music.stop();
    goal.kill();
    game.paused = true;
    
   }
   	
   	
};
