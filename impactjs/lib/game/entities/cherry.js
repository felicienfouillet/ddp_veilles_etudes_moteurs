ig.module(
    'game.entities.cherry'
).requires(
    'impact.entity'
).defines(function() {
    EntityCherry = ig.Entity.extend({
        size: { x: 16, y: 16 },

        collides: ig.Entity.COLLIDES.FIXED,
        type: ig.Entity.TYPE.A,

        animSheet: new ig.AnimationSheet('media/cherry.png', 106, 15),

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('cherryAnim', 0.1, [0, 1, 2, 3, 4, 5, 6, 7]);
        },

        update: function() {
            this.currentAnim = this.anims.cherryAnim;

            this.parent();
        }
    });
});