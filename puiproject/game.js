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
var flashlight;
var movingStep1;
var score = 0; 


// clues
var clues = [];
var nefertiti;
var sarcophagus;
var rosetta;
var zodiac;
var sphinx;

var game = new Phaser.Game(config);

function preload() {

    /*
Royalty Free Music from Tunetank.com
Track: Arabian Night by Evan Splash
https://tunetank.com/track/207-arabian-night/

*/
    this.load.audio("audio_egypt", ["assets/egypt.mp3"])
    this.load.image('background', 'assets/bg.png');
    this.load.image('ground', 'assets/egyptground.png');
    this.load.image('base', 'assets/egyptbaseground.png');
    this.load.image('step', 'assets/small_tiles.png');
    this.load.image('bricks', 'assets/morebricks.png');
    this.load.image('mummy', 'assets/mummytest.png');
    this.load.image('flashlight', 'assets/blackcircle.png');
    this.load.image('parchment', 'assets/parchment.png');

    // clues
    this.load.image('nefertiti', 'assets/nefertiti.png');
    this.load.image('nefclue', 'assets/nefertiticlue.png');
    this.load.image('sarcophagus', 'assets/sarcophagus.png');
    this.load.image('sarclue', 'assets/sarcophagusclue.png');
    this.load.image('rosetta', 'assets/rosetta.png');
    this.load.image('rosclue', 'assets/rosettaclue.png');
    this.load.image('zodiac', 'assets/zodiac.png');
    this.load.image('zodclue', 'assets/zodiacclue.png');
    this.load.image('sphinx', 'assets/sphinx.png');
    this.load.image('sphclue', 'assets/sphinxclue.png');

    this.load.spritesheet('dude', 'assets/mummysprite.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {

      // Background music

   
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
    this.physics.world.setBounds(0, 0, 1200, 1000);

    platforms = this.physics.add.staticGroup();
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
    platforms.create(800, 225, 'ground');
    platforms.create(480, 225, 'ground');
    platforms.create(160, 225, 'ground');
    platforms.create(1050, 300, 'step');

    player = this.physics.add.sprite(100, 500, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 5,
        repeat: 3
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
        repeat: 3
    });

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, platforms);


    // add clue nefertiti
    
    nefertiti = this.physics.add.sprite(400, 110, 'nefertiti');
    clues.push(nefertiti);
    this.physics.add.collider(nefertiti, platforms);
    this.physics.add.collider(player, nefertiti, handleCollision, null, this);

     // add clue rosetta
    
     rosetta = this.physics.add.sprite(1100, 400, 'rosetta');
     clues.push(rosetta);
     this.physics.add.collider(rosetta, platforms);
     this.physics.add.collider(player, rosetta, handleCollisionR, null, this);

    //add clue sarcophagus

    sarcophagus = this.physics.add.sprite(300, 510, 'sarcophagus');
    clues.push(sarcophagus);
    this.physics.add.collider(sarcophagus, platforms);
    this.physics.add.collider(player, sarcophagus, handleCollisionS, null, this);

    //add clue zodiac

    zodiac = this.physics.add.sprite(100, 280, 'zodiac');
    clues.push(zodiac);
    this.physics.add.collider(zodiac, platforms);
    this.physics.add.collider(player, zodiac, handleCollisionZ, null, this);

    //add clue sphinx

  sphinx = this.physics.add.sprite(1000, 280, 'sphinx');
  clues.push(sphinx);
    this.physics.add.collider(sphinx, platforms);
    this.physics.add.collider(player, sphinx, handleCollisionX, null, this);




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

    if (score === 5) {
        this.tweens.add({
            targets: flashlight,
            alpha: 0,
            duration: 2000,
            onComplete: function () {
                flashlight.destroy();
            },
            callbackScope: this
        });
    }

    flashlight.x = player.x + 25;
    flashlight.y = player.y + 25;
}

function handleCollision() {
    if (!nefertiti.collided) {
        nefertiti.collided = true; // Set the flag to true to indicate collision
        this.tweens.add({
            targets: nefertiti,
            alpha: 0,
            duration: 1000,
            onComplete: function () {
                nefertiti.destroy();
            },
            callbackScope: this
        });
        this.add.image(789, 500, 'nefclue').setScrollFactor(0).setVisible(true);
        incrementScore();
    }
}

function handleCollisionS() {
    if (!sarcophagus.collided) {
        sarcophagus.collided = true;
        this.tweens.add({
            targets: sarcophagus,
            alpha: 0,
            duration: 1000,
            onComplete: function () {
                sarcophagus.destroy();
            },
            callbackScope: this
        });
        this.add.image(117, 500, 'sarclue').setScrollFactor(0).setVisible(true);
        incrementScore();
    }
}

function handleCollisionR () {
    if (!rosetta.collided) {
        rosetta.collided = true;
        this.tweens.add({
            targets: rosetta,
            alpha: 0,
            duration: 1000,
            onComplete: function () {
                rosetta.destroy();
            },
            callbackScope: this
        });
        this.add.image(285, 500, 'rosclue').setScrollFactor(0).setVisible(true);
        incrementScore();
    }
}

function handleCollisionZ () {
    if (!zodiac.collided) {
        zodiac.collided = true;
        this.tweens.add({
            targets: zodiac,
            alpha: 0,
            duration: 1000,
            onComplete: function () {
                zodiac.destroy();
            },
            callbackScope: this
        });
        this.add.image(453, 500, 'zodclue').setScrollFactor(0).setVisible(true);
        incrementScore();
    }
}

function handleCollisionX () {
    if (!sphinx.collided) {
        sphinx.collided = true;
        this.tweens.add({
            targets: sphinx,
            alpha: 0,
            duration: 1000,
            onComplete: function () {
                sphinx.destroy();
            },
            callbackScope: this
        });
        this.add.image(621, 500, 'sphclue').setScrollFactor(0).setVisible(true);
        incrementScore();
    }
}

function incrementScore() {
    score += 1;
    console.log('Score:', score);
}