ig.module(
        'game.main'
    )
    .requires(
        'impact.game',
        'impact.font',

        'game.entities.cherry',
        'game.entities.enemie',
        'game.entities.player',

        'game.levels.main'
    )
    .defines(function() {

        MyGame = ig.Game.extend({

            // Load a font
            font: new ig.Font('media/04b03.font.png'),

            gravity: 300,
            score: 0,

            init: function() {
                // Initialize your game here; bind keys etc.
                ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
                ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
                ig.input.bind(ig.KEY.SPACE, 'jump');

                this.loadLevel(LevelMain);
            },

            update: function() {
                // Update all entities and backgroundMaps
                this.parent();

                var player = this.getEntitiesByType(EntityPlayer)[0];
                // Add your own, additional update code here
                var xDifference = player.pos.x - ig.system.width / 2;

                var yDifference = player.pos.y - ig.system.height / 2;

                if (this.screen.x > xDifference + 2 || this.screen.x < xDifference - 2) {
                    this.screen.x = (9 * this.screen.x + xDifference) / 10;
                } else {
                    this.screen.x = xDifference;
                }

                if (this.screen.y > yDifference + 2 || this.screen.y < yDifference - 2) {
                    this.screen.y = (9 * this.screen.y + yDifference) / 10;
                } else {
                    this.screen.y = yDifference;
                }
            },

            draw: function() {
                // Draw all entities and backgroundMaps
                this.parent();

                this.font.draw("Score: " + this.score.floor().toString(), 25, 25, ig.Font.ALIGN.LEFT);
                this.font.draw("Health: " + this.getEntitiesByType(EntityPlayer)[0].health.floor().toString(), 25, 50, ig.Font.ALIGN.LEFT);
            }
        });


        // Start the Game with 60fps, a resolution of 320x240, scaled
        // up by a factor of 2
        ig.main('#canvas', MyGame, 60, 800, 480, 1);

    });