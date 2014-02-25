(function(root){

	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Asteroid = Asteroids.Asteroid = function(pos, vel){
		var COLOR = "brown";
		var RADIUS = 20;
		Asteroids.MovingObject.call(this, pos, vel, RADIUS, COLOR);
	};

	Asteroid.inherits(Asteroids.MovingObject);

	Asteroid.randomAsteroid = function(dimX, dimY) {
		var pos = randomPos(dimX, dimY);
		var vel = randomVel();
		return new Asteroid(pos, vel);
	}

	var randomPos = function(dimX, dimY){
		var randomX = Math.floor(Math.random() * dimX);
		var randomY = Math.floor(Math.random() * dimY);
		return [randomX, randomY];
	}

	var randomVel = function(){
		var maxVelocity = 10;
		var offset = maxVelocity / 2;
		var randomX = Math.floor(Math.random() * maxVelocity - offset);
		var randomY = Math.floor(Math.random() * maxVelocity - offset);
		return [randomX, randomY];
	}

})(this);