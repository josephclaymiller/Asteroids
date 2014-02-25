(function(root){

	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Bullet = Asteroids.Bullet = function(pos, vel, game) {
		this.game = game;
		Asteroids.MovingObject.call(this, pos, vel, Bullet.RADIUS, Bullet.COLOR);
	};

	Bullet.COLOR = "white";
	Bullet.RADIUS = 3;

	Bullet.inherits(Asteroids.MovingObject);
	
	Bullet.prototype.hitAsteroids = function () {
		var bullet = this;
		this.game.asteroids.forEach(function(asteroid) {
			if (asteroid.isCollidedWith(bullet)) {	// hit asteroid?
				bullet.game.removeAsteroid(asteroid);
				bullet.game.removeBullet(bullet);
			}
		});
	}
	
	Bullet.prototype.move = function() {
		Asteroids.MovingObject.prototype.move.call(this);
		this.hitAsteroids();
	}

})(this);