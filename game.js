(function(root){
	var gameIntervalID;

	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Game = Asteroids.Game = function(ctx) {
		this.ctx = ctx;
		this.asteroids = [];
		this.addAsteroids(Game.NUM_ASTEROIDS);

		var pos = [(Game.WIDTH / 2), (Game.HEIGHT / 2)];
		var vel = [0, 0];
		this.ship = new Asteroids.Ship(pos, vel, this);
		this.bindKeyHandlers();

		this.bullets = [];
	};

	Game.NUM_ASTEROIDS = 3;
	Game.WIDTH = 500;
	Game.HEIGHT = 500;

	Game.prototype.addAsteroids = function(num) {
		for (var i=0; i<num; i++) {
			var asteroid = Asteroids.Asteroid.randomAsteroid(Game.WIDTH, Game.HEIGHT);
			this.asteroids.push(asteroid);
		}
	};

	Game.prototype.draw = function() {
		var ctx = this.ctx;
		ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
		ctx.fillStyle="black";
		ctx.fillRect(0, 0, Game.WIDTH, Game.HEIGHT);
		this.asteroids.forEach(function(a) {
			a.draw(ctx);
		});
		this.ship.draw(ctx);
		this.bullets.forEach(function(b) {
			b.draw(ctx);
		});
	};

	Game.prototype.move = function() {
		this.asteroids.forEach(function(a) {
			a.move();
		});
		this.ship.move();
		this.bullets.forEach(function(b) {
			b.move();
		});
	};

	Game.prototype.step = function() {
		this.move();
		this.draw();
		this.checkCollisions();
	};

	Game.prototype.start = function() {
		var that = this;
		gameIntervalID = window.setInterval(function() {
			that.step();
		}, 30);
	};

	Game.prototype.checkCollisions = function() {
		var game = this;
		this.asteroids.forEach(function(a) {
			if (a.isCollidedWith(game.ship)) {
				window.alert("Game Over.");
				game.stop();
			}
		});
	};

	Game.prototype.stop = function() {
		window.clearInterval(gameIntervalID);
	};

	Game.prototype.bindKeyHandlers = function() {
		game = this;
		ship = this.ship;
		// move ship
		// with A W S D
		key('a', function(){ ship.power([-1,0]) });
		key('d', function(){ ship.power([1,0]) });
		key('w', function(){ ship.power([0,-1]) });
		key('s', function(){ ship.power([0,1]) });
		// with up down left right
		key('left', function(){ ship.power([-1,0]) });
		key('right', function(){ ship.power([1,0]) });
		key('up', function(){ ship.power([0,-1]) });
		key('down', function(){ ship.power([0,1]) });
		// fire bullets
		key('space', function(){ game.fireBullet() });
	};

	Game.prototype.fireBullet = function() {
		var bullet = this.ship.fireBullet();
		if (bullet) {
			this.bullets.push(bullet);
		}
	};
	
	Game.prototype.removeAsteroid = function(asteroid) {
		var index = this.asteroids.indexOf(asteroid);
		if (index > -1) {
			this.asteroids.splice(index, 1);
		}
	};
	
	Game.prototype.removeBullet = function(bullet) {
		var index = this.bullets.indexOf(bullet);
		if (index > -1) {
			this.bullets.splice(index, 1);
		}
	};

})(this);