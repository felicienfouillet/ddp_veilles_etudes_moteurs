ig.module(
    'game.entities.player'
).requires(
    'impact.entity'
).defines(function() {
    EntityPlayer = ig.Entity.extend({
        size: { x: 60, y: 89 },
        offset: { x: 80, y: 45 },

        collides: ig.Entity.COLLIDES.FIXED,
        type: ig.Entity.TYPE.A,

        animSheet: new ig.AnimationSheet('media/player.png', 231, 140),

        accelGround: 200,
        accelAir: 200,
        jump: 250,

        friction: { x: 400, y: 0 },
        maxVel: { x: 100, y: 200 },

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idleAnim', 0.1, [0, 1, 2, 3, 4, 5]);
            this.addAnim('runAnim', 0.075, [6, 7, 8, 9, 10, 11, 12, 13]);
            this.addAnim('jumpAnim', 0.5, [14, 15]);
        },

        update: function() {
            var accel = this.standing ? this.accelGround : this.accelAir;
            if (ig.input.state('left')) {
                this.accel.x = -accel;
                this.flip = true;
                this.currentAnim = this.anims.runAnim;
            } else if (ig.input.state('right')) {
                this.accel.x = accel;
                this.flip = false;
                this.currentAnim = this.anims.runAnim;
            } else {
                this.currentAnim = this.anims.idleAnim;
                this.accel.x = 0;
            }

            if (this.standing && ig.input.state('jump')) {
                if (this.vel.y == 0) {
                    this.vel.y = -this.jump;
                    this.falling = false;
                }
            }

            this.currentAnim.flip.x = this.flip;

            if (this.pos.y >= 460) {
                this.pos.x = 16;
                this.pos.y = 343;
            }

            this.parent();
        }
    });
});