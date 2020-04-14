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
var isJumping;
var isFalling;


var game = new Phaser.Game(config);

function preload() {
    this.load.baseURL = 'assets/maps/';
    this.load.image('background', 'background_glacial_mountains_lightened.png');
    this.load.tilemapTiledJSON('map', 'tile_map1.json');

    this.load.spritesheet('platform', 'tileset.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('props', 'props.png', { frameWidth: 16, frameHeight: 16 });

    this.load.spritesheet('character',
        '../characters/adventurer-v1.5-Sheet.png', { frameWidth: 50, frameHeight: 37 }
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


    player = this.physics.add.sprite(50, 325, 'character').setScale(2);
    //player.setBounce(0.2);

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('character', { start: /*38*/ 0, end: /*41*/ 3 }),
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('character', { start: 8, end: 12 }),
        frameRate: 10,
        revert: true,
        repeat: -1
    });

    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('character', { start: 13, end: 21 }),
        frameRate: 15,
        repeat: 0
    });
    this.anims.create({
        key: 'slide',
        frames: this.anims.generateFrameNumbers('character', { start: 24, end: 28 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'fall',
        frames: this.anims.generateFrameNumbers('character', { start: 22, end: 23 }),
        frameRate: 10,
        repeat: 0
    });

    var camera = this.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, 14000, 216);

    groundLayer.setCollisionByExclusion([-1]);
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

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.flipX = true;

        if (isJumping == true) {
            player.anims.play('jump', true);
            player.on(Phaser.Animations.Events.SPRITE_ANIMATION_KEY_COMPLETE + 'jump', function() {
                isFalling = true;
            });

            if (isJumping == true && player.body.onFloor()) {
                player.anims.play('slide', true);
                isFalling = false;
                this.tweens.add({
                    targets: player,
                    alpha: '+=1',
                    duration: 250,
                    onComplete: function() { isJumping = false; },
                });
            }
        } else {
            player.anims.play('run', true);
        }
    } else if (cursors.right.isDown) {
        player.flipX = false;
        player.setVelocityX(160);

        if (isJumping == true) {
            player.anims.play('jump', true);
            player.on(Phaser.Animations.Events.SPRITE_ANIMATION_KEY_COMPLETE + 'jump', function() {
                isFalling = true;
            });

            if (isJumping == true && player.body.onFloor()) {
                player.anims.play('slide', true);
                isFalling = false;
                this.tweens.add({
                    targets: player,
                    alpha: '+=1',
                    duration: 250,
                    onComplete: function() { isJumping = false; },
                });
            }
        } else {
            player.anims.play('run', true);
        }
    } else {
        player.setVelocityX(0);
        player.anims.play('idle', true);
    }

    if (isFalling == true) {
        player.anims.play('fall', true);
    }


    if (cursors.space.isDown && player.body.onFloor()) {
        isJumping = true;
        player.setVelocityY(-200);
    }

    if (player.body.onFloor()) {
        isFalling = false;
    }
}