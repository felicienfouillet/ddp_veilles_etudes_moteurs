ig.module(
        'game.main'
    )
    .requires(
        'impact.game',
        'impact.font',

        'game.entities.cherry',
        'game.entities.player',

        'game.levels.main'
    )
    .defines(function() {

        MyGame = ig.Game.extend({

            // Load a font
            font: new ig.Font('media/04b03.font.png'),

            gravity: 500,
            score: 0,

            init: function() {
                // Initialize your game here; bind keys etc.
                ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
                ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
                ig.input.bind(ig.KEY.SPACE, 'jump');

                this.loadLevel(LevelMain);

                ig.game.score == 0;
            },

            update: function() {
                // Update all entities and backgroundMaps
                this.parent();

                // Add your own, additional update code here
            },

            draw: function() {
                // Draw all entities and backgroundMaps
                this.parent();

                this.font.draw("Score: " + this.score.floor().toString(), 25, 25, ig.Font.ALIGN.LEFT);
            }
        });


        // Start the Game with 60fps, a resolution of 320x240, scaled
        // up by a factor of 2
        ig.main('#canvas', MyGame, 60, 800, 480, 1);

    });