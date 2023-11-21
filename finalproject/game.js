let config = {
    type: Phaser.AUTO,
    width: 1000,
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

let game = new Phaser.Game(config);
let player;
let cursors;
let platforms;

function preload() {
    this.load.image('base_tiles', 'assets/base_tiles.png');
    this.load.tilemapTiledJSON('tilemap', 'assets/tile_map.json');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
    createMap.call(this);
    createPlayer.call(this);
    
    this.physics.add.collider(player, platforms);

    this.cameras.main.zoom = 0.1;

    // Input Events
    cursors = this.input.keyboard.createCursorKeys();
}

function createMap() {
    this.map = this.make.tilemap({ key: 'tilemap' });

    const tileset = this.map.addTilesetImage('gametiles', 'base_tiles');

  
    platforms = this.map.createLayer('platform', tileset);
    platforms.setCollisionByProperty({ collides: true });
}

function createPlayer() {
    player = this.physics.add.sprite(100, 450, 'dude');
    
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
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
        frameRate: 10,
        repeat: -1
    });
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

    if (cursors.up.isDown) {
        player.setVelocityY(-100);
    }
}
