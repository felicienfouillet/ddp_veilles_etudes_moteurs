ig.module(
    'game.entities.enemie'
).requires(
    'impact.entity'
).defines(function() {
    EntityEnemie = ig.Entity.extend({
        size: { x: 32, y: 32 },

        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.COLLIDES.A,
        collides: ig.Entity.COLLIDES.PASSIVE,

        //gravityFactor: 0,

        animSheet: new ig.AnimationSheet('media/frog-idle.png', 50, 32),

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim('frogAnim', 0.125, [0, 1, 2, 3, 2, 1, 0]);
        },

        update: function() {
            this.currentAnim = this.anims.frogAnim;

            this.parent();
        },

        check: function(other) {
            if (other.getEntitiesByType(EntityPlayer)[0]) {
                other.receiveDomage(10, this);
            }
        }
    });
});