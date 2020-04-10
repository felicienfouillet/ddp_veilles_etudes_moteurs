var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    pixelArt: true,
    scene: {
        preload: preload,
        create: create,
        updtae: update
    }
};

var controls;

var game = new Phaser.Game(config);

function preload() {
    //this.load.spritesheet('ground', 'assets/maps/tileset.png', { frameWidth: 16, frameHeight: 16 });
    //this.load.spritesheet('props', 'assets/maps/props.png', { frameWidth: 16, frameHeight: 16 });
    this.load.tilemapTiledJSON('map', 'assets/maps/tile_map1.json');

    this.load.spritesheet('character',
        'assets/characters/adventurer-v1.5-Sheet.png', { frameWidth: 32, frameHeight: 48 }
    );
}

function create() {
    map = this.make.tilemap({ key: 'map' });

    var groundTiles = map.addTilesetImage('groundTiles', 'ground');
    var propsTiles = map.addTilesetImage('propsTiles', 'props');

    var groundLayer = map.createStaticLayer(0, groundTiles, 0, 0);
    var propsLayer = map.createStaticLayer(0, propsTiles, 0, 0);

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