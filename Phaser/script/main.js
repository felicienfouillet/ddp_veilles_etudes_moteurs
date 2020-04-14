var config = {
    type: Phaser.AUTO,
    width: 750,
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

var player;
var cursors;
var controls;
var direction;
var isJumping;


var game = new Phaser.Game(config);

function preload() {
    this.load.baseURL = 'assets/maps/';
    this.load.image('background', 'background_glacial_mountains_lightened.png');
    this.load.tilemapTiledJSON('map', 'tile_map1.json');

    this.load.spritesheet('platform', 'tileset.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('props', 'props.png', { frameWidth: 16, frameHeight: 16 });

    this.load.spritesheet('characterRight',
        '../characters/adventurer-v1.5-Sheet-right.png', { frameWidth: 50, frameHeight: 37 }
    );

    this.load.spritesheet('characterLeft',
        '../characters/adventurer-v1.5-Sheet-left.png', { frameWidth: 50, frameHeight: 37 }
    );
}

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


    player = this.physics.add.sprite(50, 325, 'characterRight').setScale(2);
    player.setBounce(0.2);
    direction = 'right';

    this.anims.create({
        key: 'idleRight',
        frames: this.anims.generateFrameNumbers('characterRight', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'idleLeft',
        frames: this.anims.generateFrameNumbers('characterLeft', { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('characterLeft', { start: 8, end: 12 }),
        frameRate: 10,
        revert: true,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('characterRight', { start: 8, end: 13 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'jumpRight',
        frames: this.anims.generateFrameNumbers('characterRight', { start: 14, end: 29 }),
        frameRate: 15,
        repeat: 0
    });

    this.anims.create({
        key: 'jumpLeft',
        frames: this.anims.generateFrameNumbers('characterLeft', { start: 8, end: 13 }),
        frameRate: 15,
        repeat: 0
    });

    var camera = this.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, 14000, 216);

    groundLayer.setCollisionByExclusion([-1])
    this.physics.add.collider(player, groundLayer);
    player.setCollideWorldBounds(false);

    cursors = this.input.keyboard.createCursorKeys();

    var controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        space: cursors.space,
        speed: 0.5
    };

    controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
}

function update(time, delta) {
    controls.update(delta);

    if (cursors.left.isDown) {
        direction = 'left';
        player.setVelocityX(-160);

        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        direction = 'right';
        player.setVelocityX(160);

        if (isJumping == true) {
            player.anims.play('jumpRight', true);
        } else {
            player.anims.play('right', true);
        }
    } else {
        player.setVelocityX(0);
        if (direction == 'right') {
            player.anims.play('idleRight');
        } else if (direction == 'left') {
            player.anims.play('idleLeft');
        }
    }

    if (cursors.space.isDown && player.body.onFloor()) {
        isJumping = true;
        player.setVelocityY(-200);
    }
}