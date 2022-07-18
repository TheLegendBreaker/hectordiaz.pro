docReady( function(){
	function preserveAspectRatio() { 
		const element = document.querySelector('.game-console')
			, windowHeight = window.innerHeight
			, windowWidth = window.innerWidth
			, elementDimension = windowHeight > windowWidth ?  windowWidth - windowWidth * .02: windowHeight - windowHeight * .01
			;
		element.setAttribute("style", `width: ${ elementDimension }px; height: ${ elementDimension }px; padding: 0 ${ elementDimension * .095 }px; padding-top: ${ elementDimension * .038 }px;`);
	}

	preserveAspectRatio();

	const canvas = document.getElementById('context')
	, sprite = new Sprite('Spritesheet-num.png', 0, 0, 48, 48)
	, player = new Player(sprite, 0, 0, 50, 50)
	, game = new Game(canvas, player)
	;

	porportionalScale = function(){
		game.preserveAspectRatio();
		preserveAspectRatio();
	}
	window.onresize = porportionalScale;

	game.level = function () {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.imageSmoothingEnabled = false;

		// backdrop
		// sky
		this.context.fillStyle = "#377ea7";
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.fill();
		// mountains
		// mountain 1
		this.context.fillStyle = "#0f6e9e";
		this.context.beginPath();
		this.context.moveTo(0, this.canvas.height); // x = random, y = coor. on "ground"
		this.context.lineTo(this.canvas.width * .75, this.canvas.height); // x = ^random + 20, y = coor. on "ground"
		this.context.lineTo(0, this.canvas.height * .33); // x = ^random + 10, y = peak of triangle
		this.context.closePath();
		this.context.fill();
		// mountain 2
		this.context.fillStyle = "#0f6e9e";
		this.context.beginPath();
		this.context.moveTo(this.canvas.width * .25, this.groundY); // x = random, y = coor. on "ground"
		this.context.lineTo(this.canvas.width, this.groundY); // x = ^random + 20, y = coor. on "ground"
		//this.context.bezierCurveTo(this.canvas.width * .5, this.canvas.height * .33, this.canvas.width * .6, this.canvas.height * .6 ,  this.canvas.width * .8 ,this.canvas.height * .53 );
		this.context.lineTo(this.canvas.width * .5, this.canvas.height * .33); // x = ^random + 10, y = peak of triangle
		this.context.closePath();
		this.context.fill();

		// ground
		const groundStart = this.groundY + this.groundHeight * .5;
		this.context.strokeStyle = "#065472";
		this.context.lineWidth = this.groundHeight;
		this.context.beginPath();
		this.context.moveTo(0, groundStart);
		this.context.lineTo(this.canvas.width, groundStart);
		this.context.stroke();
	}

	game.init()

	gameLoop = function() {
		game.loop();
	}


	setInterval(gameLoop, 500);

}); // end docReady
