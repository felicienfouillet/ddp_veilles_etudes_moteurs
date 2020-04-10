var config = {
    type: Phaser.AUTO,
    width: 768,
    height: 432,
    backgroundColor: '#2d2d2d',
    pixelArt: true,
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

var controls;

var game = new Phaser.Game(config);

function preload() {
    this.load.baseURL = 'assets/maps/';
    this.load.image('background', 'background_glacial_mountains_lightened.png');
    this.load.tilemapTiledJSON('map', 'tile_map1.json');

    this.load.spritesheet('platform', 'tileset.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('props', 'props.png', { frameWidth: 16, frameHeight: 16 });

    /*this.load.spritesheet('character',
        '../characters/individual_sprites/adventurer-air-attack1-00.png', { frameWidth: 50, frameHeight: 37 }
    );*/
    this.load.spritesheet('character',
        '../characters/adventurer-v1.5-Sheet.png', { frameWidth: 50, frameHeight: 37 }
    );
}

var player;
var cursors;

function create() {
    this.map = this.make.tilemap({ key: 'map' });

    var groundTiles = this.map.addTilesetImage('platform', 'platform');
    var propsTiles = this.map.addTilesetImage('props', 'props');

    for (i = 384; i < this.map.widthInPixels; i += 768) {
        var backgroundTiles = this.add.tileSprite(i, 216, 384, 216, 'background').setScale(2);
    }

    var backgroundPropsLayer = this.map.createStaticLayer('background_props', propsTiles, 0, 20).setScale(2);
    var propsLayer = this.map.createStaticLayer('props', propsTiles, 0, 20).setScale(2);
    var groundLayer = this.map.createStaticLayer('platform', groundTiles, 0, 20).setScale(2);


    player = this.physics.add.sprite(0, 200, 'character').setScale(2);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('character', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('character', { start: 8, end: 13 }),
        frameRate: 10,
        revert: true,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('character', { start: 8, end: 13 }),
        frameRate: 10,
        repeat: -1
    });

    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    cursors = this.input.keyboard.createCursorKeys();

    var controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        speed: 0.5
    };

    controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
}

function update(time, delta) {
    controls.update(delta);

    if (cursors.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);

        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);

        player.anims.play('idle');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}