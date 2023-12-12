// Using Phaser 3, I'm configuring a new game. This includes establishing the dimensions, physics, and components of the scene.
var config = {
    type: Phaser.AUTO,
    width: 900,
    height: 600,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Variables I need to access across the game
var platforms;
var player;
var cursors;
var flashlight;
var score = 0;
var heart3, heart2, heart1;
var maxHearts = 3;
var currentHearts;
var gameOver;
var winner;
var cluesCollected;


// Clue variables
var clues = [];
var nefertiti;
var sarcophagus;
var rosetta;
var zodiac;
var sphinx;
var water;

var game = new Phaser.Game(config);

// Preload loads visual and audio assets for the game
function preload() {

    /*
Royalty Free Music from Tunetank.com
Track: Arabian Night by Evan Splash
https://tunetank.com/track/207-arabian-night/

*/

    // Free to use sound effects https://mixkit.co/free-sound-effects/game/
    // Used this tutorial to load and use audio https://www.youtube.com/watch?v=SRqKOccMWbc
    this.load.audio("audio_egypt", ["assets/egypt.mp3"])
    this.load.audio("guitar", ["assets/guitar.mp3"])
    this.load.audio("lose", ["assets/loss.mp3"])
    this.load.audio("found", ["assets/findclue.mp3"])
    this.load.audio("levelwinner", ["assets/levelwinner.mp3"])

    // Narrative and informational scenes
    this.load.image('background', 'assets/bg.png');
    this.load.image('dream', 'assets/dream.png');
    this.load.image('awake', 'assets/wakeup.png');
    this.load.image('escape1', 'assets/escape1.png');
    this.load.image('escape2', 'assets/escape2.png');
    this.load.image('shouldegypt', 'assets/shouldbeegypt.png');
    this.load.image('cluescollected', 'assets/cluescollected.png');
    this.load.image('end', 'assets/gameover.png');
    this.load.image('winner', 'assets/youwon.png');
    this.load.image('start', 'assets/startscene.png');
    this.load.image('faq', 'assets/howtoplay.png');

    // Tiles 
    this.load.image('ground', 'assets/egyptground.png');
    this.load.image('base', 'assets/egyptbaseground.png');
    this.load.image('step', 'assets/small_tiles.png');
    this.load.image('bricks', 'assets/morebricks.png');

    //Sprite 
    this.load.image('mummy', 'assets/mummytest.png');

    // Other image assets
    this.load.image('flashlight', 'assets/blackcircle.png');
    this.load.image('parchment', 'assets/parchment.png');
    this.load.image('column', 'assets/column.png');
    this.load.image('palm', 'assets/palmtree.png');
    this.load.image('p1', 'assets/painting1.png');
    this.load.image('p2', 'assets/painting2.png');
    this.load.image('p3', 'assets/painting3.png');
    this.load.image('crate', 'assets/crate.png');
    this.load.image('cat', 'assets/cat.png');
    this.load.image('figure', 'assets/figure.png');
    this.load.image('tallpot', 'assets/tallpot.png');
    this.load.image('widepot', 'assets/widepot.png');
    this.load.image('symbol', 'assets/symbol.png');
    this.load.image('water', 'assets/water.png');
    this.load.image('heart', 'assets/heart.png');


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

    this.load.spritesheet('dude', 'assets/mummysprite.png', {
        frameWidth: 32,
        frameHeight: 48
    });
}

// Establishing the scene
function create() {

    // Background music
    this.music = this.sound.add("audio_egypt");

    var musicConfig = {
        mute: false,
        volume: 0.5,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
    }

    this.music.play(musicConfig);

    // Sound effects
    this.healthSound = this.sound.add("guitar");
    this.loseSound = this.sound.add("lose", {
        rate: 0.5
    });
    this.winSound = this.sound.add("levelwinner");
    this.foundSound = this.sound.add("found");


    // Building the background and tilemap
    this.add.image(600, 500, 'background');
    this.physics.world.setBounds(0, 0, 1200, 1000);

    platforms = this.physics.add.staticGroup();
    water = platforms.create(780, 875, 'water');
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

    // Adding obstacles and decorative elements
    platforms.create(200, 625, 'crate');
    platforms.create(1200, 625, 'crate');
    platforms.create(250, 392, 'crate');
    platforms.create(750, 167, 'crate');
    platforms.create(750, 103, 'crate');
    platforms.create(875, 167, 'crate');

    platforms.create(650, 167, 'crate');

    this.add.image(50, 600, 'column');
    this.add.image(1000, 600, 'column');
    this.add.image(800, 340, 'column');

    this.add.image(700, 330, 'palm');
    this.add.image(1150, 330, 'palm');
    this.add.image(200, 135, 'palm');
    this.add.image(600, 135, 'palm');
    this.add.image(325, 362, 'palm');

    this.add.image(200, 325, 'p1');
    this.add.image(500, 120, 'p2');
    this.add.image(1100, 525, 'p3');

    this.add.image(500, 503, 'tallpot');
    this.add.image(600, 625, 'symbol');
    this.add.image(900, 365, 'cat');
    this.add.image(155, 167, 'widepot');
    this.add.image(1185, 567, 'figure');


    // Adding the sprite and collision properties
    // https://phaser.io/tutorials/making-your-first-phaser-3-game/part1 -> Used this tutorial as a base as to how to add a tilemap, player movement, and sprite sheet
    player = this.physics.add.sprite(100, 500, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, platforms, handleWaterCollision, null, this);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {
            start: 0,
            end: 3
        }),
        frameRate: 5,
        repeat: 3
    });

    this.anims.create({
        key: 'turn',
        frames: [{
            key: 'dude',
            frame: 4
        }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', {
            start: 5,
            end: 8
        }),
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
    sarcophagus = sarcophagus.setFlipX(true);
    clues.push(sarcophagus);
    this.physics.add.collider(sarcophagus, platforms);
    this.physics.add.collider(player, sarcophagus, handleCollisionS, null, this);

    //add clue zodiac

    zodiac = this.physics.add.sprite(100, 280, 'zodiac');
    clues.push(zodiac);
    this.physics.add.collider(zodiac, platforms);
    this.physics.add.collider(player, zodiac, handleCollisionZ, null, this);

    //add clue sphinx

    sphinx = this.physics.add.sprite(1125, 280, 'sphinx');
    clues.push(sphinx);
    this.physics.add.collider(sphinx, platforms);
    this.physics.add.collider(player, sphinx, handleCollisionX, null, this);



    // Camera follows players
    this.cameras.main.setBounds(0, 0, 1200, 900);
    this.cameras.main.startFollow(player);

    // Flashlight around player 
    flashlight = this.add.image(player.x, player.y, 'flashlight');

    // Hearts UI
    currentHearts = maxHearts;

    heart1 = this.add.sprite(50, 50, 'heart').setScrollFactor(0);
    heart2 = this.add.sprite(100, 50, 'heart').setScrollFactor(0);
    heart3 = this.add.sprite(150, 50, 'heart').setScrollFactor(0);

    // Clues UI
    this.add.image(117, 500, 'parchment').setScrollFactor(0);
    this.add.image(285, 500, 'parchment').setScrollFactor(0).setFlipY(true);
    this.add.image(453, 500, 'parchment').setScrollFactor(0);
    this.add.image(621, 500, 'parchment').setScrollFactor(0).setFlipY(true).setFlipX(true);
    this.add.image(789, 500, 'parchment').setScrollFactor(0).setFlipY(true);



    // Narrative scene -> you have to read backwards
    const faq = this.add.sprite(450, 600, 'faq').setInteractive();

    faq.on('pointerdown', function(pointer) {
        this.setVisible(false); // Set the visibility to false when clicked

    });

    const egyptScene = this.add.sprite(450, 600, 'shouldegypt').setInteractive();

    egyptScene.on('pointerdown', function(pointer) {
        this.setVisible(false); // Set the visibility to false when clicked

    });

    const escapeScene2 = this.add.sprite(450, 600, 'escape2').setInteractive();

    escapeScene2.on('pointerdown', function(pointer) {
        this.setVisible(false); // Set the visibility to false when clicked

    });

    const escapeScene1 = this.add.sprite(450, 600, 'escape1').setInteractive();

    escapeScene1.on('pointerdown', function(pointer) {
        this.setVisible(false); // Set the visibility to false when clicked

    });


    const wakeScene = this.add.sprite(450, 600, 'awake').setInteractive();

    wakeScene.on('pointerdown', function(pointer) {
        this.setVisible(false); // Set the visibility to false when clicked

    });


    const dreamScene = this.add.sprite(450, 600, 'dream').setInteractive();

    dreamScene.on('pointerdown', function(pointer) {
        this.setVisible(false); // Set the visibility to false when clicked

    });

    const begin = this.add.sprite(450, 600, 'start').setInteractive();

    begin.on('pointerdown', function(pointer) {
        this.setVisible(false); // Set the visibility to false when clicked

    });


    // Game over scene to be called later
    gameOver = this.add.image(450, 600, 'end').setVisible(false);


}

// Interaction through update function

function update() {

    // Player movement
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

    // Displays winning when you win

    if (score === 5) {
        this.tweens.add({
            targets: flashlight,
            alpha: 0,
            duration: 2000,
            onComplete: function() {
                flashlight.destroy();

                // Make the winner image visible after the flashlight is destroyed

                cluesCollected = this.add.image(450, 300, 'cluescollected').setVisible(true).setScrollFactor(0);


                if (!this.winSound.isPlaying) {
                    this.winSound.play();
                }

                this.tweens.add({
                    targets: this.music,
                    volume: 0,
                    duration: 2000,
                    onComplete: function() {
                        // Stop the music after fading out
                        this.music.stop();
                    },
                    callbackScope: this
                });


            },
            callbackScope: this
        });
    }

    // Calls game over screen if you lose
    if (currentHearts === 0) {

        if (!this.loseSound.isPlaying) {
            this.loseSound.play();
        }

        gameOver = this.add.image(450, 600, 'end').setVisible(true);


    }


    // bounds of the flashlight
    flashlight.x = player.x + 25;
    flashlight.y = player.y + 25;
}


// The following collision functions are intended to destroy clues when encountering them

function handleCollision() {
    if (!nefertiti.collided) {
        this.foundSound.play();
        nefertiti.collided = true;
        this.tweens.add({
            targets: nefertiti,
            alpha: 0,
            duration: 1000,
            onComplete: function() {
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
        this.foundSound.play();
        sarcophagus.collided = true;
        this.tweens.add({
            targets: sarcophagus,
            alpha: 0,
            duration: 1000,
            onComplete: function() {
                sarcophagus.destroy();
            },
            callbackScope: this
        });
        this.add.image(117, 500, 'sarclue').setScrollFactor(0).setVisible(true);
        incrementScore();
    }
}

function handleCollisionR() {
    if (!rosetta.collided) {
        this.foundSound.play();
        rosetta.collided = true;
        this.tweens.add({
            targets: rosetta,
            alpha: 0,
            duration: 1000,
            onComplete: function() {
                rosetta.destroy();
            },
            callbackScope: this
        });
        this.add.image(285, 500, 'rosclue').setScrollFactor(0).setVisible(true);
        incrementScore();
    }
}

function handleCollisionZ() {
    if (!zodiac.collided) {
        this.foundSound.play();
        zodiac.collided = true;
        this.tweens.add({
            targets: zodiac,
            alpha: 0,
            duration: 1000,
            onComplete: function() {
                zodiac.destroy();
            },
            callbackScope: this
        });
        this.add.image(453, 500, 'zodclue').setScrollFactor(0).setVisible(true);
        incrementScore();
    }
}

function handleCollisionX() {
    if (!sphinx.collided) {
        this.foundSound.play();
        sphinx.collided = true;
        this.tweens.add({
            targets: sphinx,
            alpha: 0,
            duration: 1000,
            onComplete: function() {
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



function handleWaterCollision(player, waterPlatform) {
    if (waterPlatform === water) {

        if (currentHearts > 0) {

            currentHearts--;
            this.healthSound.play();

            // destroys hearts in order
            switch (currentHearts) {
                case 2:
                    heart3.destroy();
                    break;
                case 1:
                    heart2.destroy();
                    break;
                case 0:
                    heart1.destroy();
                    break;
            }

            // teleports player back after falling into the water
            player.setPosition(200, 500);


        }
    }
}