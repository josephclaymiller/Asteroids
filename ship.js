(function(root){

	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Ship = Asteroids.Ship = function(pos, vel, game) {
		this.game = game;
		Asteroids.MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR);
	};

	Ship.RADIUS = 15;
	Ship.COLOR = "green";

	Ship.inherits(Asteroids.MovingObject);

	Ship.prototype.power = function(impulse) {
		this.vel[0] += impulse[0];
		this.vel[1] += impulse[1];
	}

	Ship.prototype.fireBullet = function() {
		if (this.vel == [0, 0]) {
			return false; //don't fire bullet if ship is not moving
		}
		var vx = this.vel[0];
		var vy = this.vel[1];
		var shipSpeed = Math.sqrt(vx * vx + vy * vy);
		var dir = [vx/shipSpeed, vy/shipSpeed];
		var bulletSpeed = shipSpeed * 2;
		var bulletVel = [dir[0]*bulletSpeed, dir[1]*bulletSpeed];
		var bulletPos = [this.pos[0], this.pos[1]]
		var bullet = new Asteroids.Bullet(bulletPos, bulletVel, this.game);
		return bullet;
	}

})(this);