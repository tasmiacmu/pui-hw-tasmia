var config = {
    type: Phaser.AUTO,
    width: 900,
    height: 600,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }

    
};

var platforms;
var player;
var cursors;


var game = new Phaser.Game(config);

function preload() {


/*
Royalty Free Music from Tunetank.com
Track: Arabian Night by Evan Splash
https://tunetank.com/track/207-arabian-night/

*/

this.load.audio("audio_egypt", ["assets/egypt.mp3"])

    this.load.image('background', 'assets/bg.png');
    this.load.image('test', 'assets/bomb.png');
    this.load.image('ground', 'assets/egyptground.png');
    this.load.image('base', 'assets/egyptbaseground.png');
    this.load.image('step', 'assets/small_tiles.png');
    this.load.image('bricks', 'assets/morebricks.png');
    this.load.image('mummy', 'assets/mummytest.png');
    this.load.image('flashlight', 'assets/blackcircle.png');
    this.load.image('parchment', 'assets/parchment.png');

    this.load.spritesheet('dude', 'assets/mummysprite.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
   
    this.music = this.sound.add("audio_egypt");

    var musicConfig = {
        mute: false,
        volume: 1, 
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
    }

    this.music.play(musicConfig);

    this.add.image(600, 500, 'background');
   

    // Set world bounds larger than the frame size
    this.physics.world.setBounds(0, 0, 1200, 1000);

    platforms = this.physics.add.staticGroup();

    // ground layer
    platforms.create(150, 730, 'base');
    platforms.create(470, 730, 'base');
    platforms.create(1100, 730, 'base');

    platforms.create(150, 874, 'bricks');
    platforms.create(470, 874, 'bricks');
    platforms.create(1100, 874, 'bricks');


    platforms.create(800, 600, 'step');
    platforms.create(450, 560, 'step');
    platforms.create(514, 560, 'step');

   
    platforms.create(50, 450, 'ground');
    platforms.create(200, 450, 'ground');
    platforms.create(750, 420, 'ground');
    platforms.create(1070, 420, 'ground');

    platforms.create(800, 225, 'ground'); // layer 3
    platforms.create(480, 225, 'ground');
    platforms.create(160, 225, 'ground');
    platforms.create(1050, 300, 'step');

    //this.add.image(400, 300, 'test').setScrollFactor(0);


    player = this.physics.add.sprite(100, 500, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 5,
        repeat: -1
    });

 

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, platforms);

    // Make the camera follow the player within the extended world bounds
    this.cameras.main.setBounds(0, 0, 1200, 900);
    this.cameras.main.startFollow(player);


    flashlight = this.add.image(player.x, player.y, 'flashlight');
   
    this.add.image(117, 500, 'parchment').setScrollFactor(0);
    this.add.image(285, 500, 'parchment').setScrollFactor(0).setFlipY(true);
    this.add.image(453, 500, 'parchment').setScrollFactor(0);
    this.add.image(621, 500, 'parchment').setScrollFactor(0).setFlipY(true).setFlipX(true);
    this.add.image(789, 500, 'parchment').setScrollFactor(0).setFlipY(true);
    
   
/*
    const start = this.add.sprite(400, 300, 'background').setInteractive();

    start.on('pointerdown', function (pointer) {
        this.setTint(0xff0000);
        this.setVisible(false); // Set the visibility to false when clicked
    });
    
    start.on('pointerout', function (pointer) {
        this.clearTint();
    });
    
    start.on('pointerup', function (pointer) {
        this.clearTint();
    });
    */

   
      


   

    
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-275);
    }

    // You can still check if the player is near the right edge of the original world bounds
    if (player.x > config.width) {
        // Example: platforms.create(new_x, new_y, 'ground');
    }
    flashlight.x = player.x + 25;
    flashlight.y = player.y + 25;

    
}

