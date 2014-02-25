(function(root){
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var MovingObject = Asteroids.MovingObject = function(pos, vel, radius, color) {
		this.pos = pos;
		this.vel = vel;
		this.radius = radius;
		this.color = color;
	};

	MovingObject.prototype.move = function() {
		this.pos[0] += this.vel[0];
		this.pos[1] += this.vel[1];
		var Game = Asteroids.Game

		if (this.pos[0] < 0) {
			this.pos[0] += Game.WIDTH;
		}
		if (this.pos[1] < 0) {
			this.pos[1] += Game.HEIGHT;
		}
		if (this.pos[0] > Game.WIDTH) {
			this.pos[0] -= Game.WIDTH;
		}
		if (this.pos[1] > Game.HEIGHT) {
			this.pos[1] -= Game.HEIGHT;
		}

	};

	MovingObject.prototype.draw = function(ctx) {
		ctx.fillStyle = this.color;
		ctx.beginPath();

		ctx.arc(
			this.pos[0],
			this.pos[1],
			this.radius,
			0,
			2 * Math.PI,
			false
		);

		ctx.fill();
	};

	MovingObject.prototype.isCollidedWith = function(otherObject) {
		var x1 = this.pos[0];
		var y1 = this.pos[1];
		var x2 = otherObject.pos[0];
		var y2 = otherObject.pos[1];
		var xDist = x1 - x2;
		var yDist = y1 - y2;
		var distance = Math.sqrt((xDist * xDist) + (yDist * yDist));
		return distance < (this.radius + otherObject.radius);
	};

})(this);