var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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

    //this.load.spritesheet('background', 'background_glacial_mountains_lightened.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('ground', 'tileset.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('props', 'props.png', { frameWidth: 16, frameHeight: 16 });

    // this.load.spritesheet('character',
    //     'assets/characters/adventurer-v1.5-Sheet.png', { frameWidth: 32, frameHeight: 48 }
    // );
}

function create() {
    var map = this.make.tilemap({ key: 'map' });


    //var map = this.add.tilemap('map');

    var groundTiles = map.addTilesetImage('ground', 'ground');
    var propsTiles = map.addTilesetImage('props', 'props');
    var backgroundTiles = this.add.tileSprite(0, 0, 3000, 3000, 'background');

    //var groundLayer = map.createStaticLayer(0, backgroundTiles, 0, 0);
    var groundLayer = map.createStaticLayer(0, groundTiles, 0, 0);
    var propsLayer = map.createStaticLayer(1, propsTiles, 0, 0);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    var cursors = this.input.keyboard.createCursorKeys();

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
}