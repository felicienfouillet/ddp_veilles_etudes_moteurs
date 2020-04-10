var config = {
    type: Phaser.AUTO,
    width: 768,
    height: 432,
    backgroundColor: '#2d2d2d',
    pixelArt: true,
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

    // this.load.spritesheet('character',
    //     'assets/characters/adventurer-v1.5-Sheet.png', { frameWidth: 32, frameHeight: 48 }
    // );
}

function create() {
    this.map = this.make.tilemap({ key: 'map' });

    var groundTiles = this.map.addTilesetImage('platform', 'platform');
    var propsTiles = this.map.addTilesetImage('props', 'props');
    var backgroundTiles = this.add.tileSprite(0, 0, 384, 216, 'background').setScale(2);

    var groundLayer = this.map.createStaticLayer('platform', groundTiles, 0, 0);
    var propsLayer = this.map.createStaticLayer('props', propsTiles, 0, 0);

    // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // var cursors = this.input.keyboard.createCursorKeys();

    // var controlConfig = {
    //     camera: this.cameras.main,
    //     left: cursors.left,
    //     right: cursors.right,
    //     up: cursors.up,
    //     down: cursors.down,
    //     speed: 0.5
    // };

    // controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
}

function update(time, delta) {
    //    controls.update(delta);
}