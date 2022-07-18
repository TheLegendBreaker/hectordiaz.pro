
	class GameObject {
		constructor(
			x
			, y
			, width
			, height
		){
			this.width= width;
			this.height= height;
			this.x= x;
			this.y= y;
		}
		set x(newX){
			this._x=newX;
		}
		set y(newY){
			this._y=newY;
		}
		set width(newWidth){
			this._width=newWidth;
		}
		set height(newHeight){
			this._height=newHeight;
		}
		get x(){
			return this._x;
		}
		get y(){
			return this._y;
		}
		get width(){
			return this._width;
		}
		get height(){
			return this._height;
		}
	}

	class Sprite extends GameObject {
		constructor(
			spritesheet
			, x
			, y
			, width
			, height
		){
			super( x, y, width, height);
			const sprite = new Image();
			sprite.src = spritesheet;
			this._spritesheet = sprite;
			this.cycle = 3; // each cycle = cycle - 1. When cycle = 0 change or continue animation. 
		}
		set spritesheet(newSpritesheet){
			const sprite = new Image();
			sprite.src = newSpritesheet;
			this._spritesheet = sprite;
		}
		set cycle(newCycle) {
			this._cycle = newCycle;
		}
		get spritesheet(){
			return this._spritesheet;
		}
		get cycle(){
			return this._cycle;
		}
		drawFrame(
			canvas
			, playerX
			, playerY
			, playerWidth
			, playerHeight
			, direction="right"
		){
			const context = canvas.getContext("2d");
			if(direction == "left") {
				context.translate(canvas.width, 0);
				context.scale(-1, 1);
			}
			context.drawImage(
				this.spritesheet
				, this.x * this.width
				, this.y * this.height
				, this.width
				, this.height
				, playerX
				, playerY
				, playerWidth
				, playerHeight
				);
		}
		animationCycle(
			context
			, playerX
			, playerY
			, playerWidth
			, playerHeight
			, direction = "right"
		) {
			this.drawFrame( context, playerX, playerY, playerWidth, playerHeight, direction);
			if(this.x < 1) this.x = this.x + 1;
			else {
				this.x = 0;
				this.cycle = this.cycle - 1;
			}
		}
		animationController(
			canvas
			, playerX
			, playerY
			, playerWidth
			, playerHeight
			, direction = "right"
			, animation = 0
		) {
			if(this.cycle == 0) this.y = animation;

			this.animationCycle(
				canvas
				, playerX
				, playerY
				, playerWidth //* -1
				, playerHeight
				, direction
			);
		}
	}

	class Player extends GameObject {
		constructor(
			sprite
			, x
			, y
			, width
			, height
		){
			super( x, y, width, height);
			this.sprite = sprite;
			this.directioin = "right;"
			this.input = 0;
		}
		get sprite () {
			return this._sprite;
		}
		get direction () {
			return this._direction;
		}
		get input() {
			return this._input;
		}
		get controls() {
			return this._controls;
		}
		set sprite(newSprite){
			this._sprite = newSprite;
		}
		set direction(newdirection){
			this._direction = newdirection;
		}
		set input(newInput){
			this._input = newInput;
		}
		set controls(newControls){
			this._controls = newControls;
		}
		spawn(canvas){
			const playerSquared = Math.floor( canvas.height * 0.54 );
			this.width = playerSquared;
			this.height = playerSquared;
			this.x = ( canvas.width / 2 ) - ( this.width / 2 );
			this.sprite.y = this.input; // set spawn animation.
		}
		inputController(canvas){
			//sprite and animation
			//Specific animations are done by choosing the y of the frame.
			// idle = 0
			// walk = 1
			// roar = 2
			this.input = 1;
			// choose direction
			if(this.x + this.width >= canvas.width) {
				this.x = 0;
				this.direction = this.direction == "left" ? "right":"left";
				//this.width = this.direction == "left" ? this.width * -1: this.width;
			}
			//if(this.sprite.cycle == 0 || animation != 1){
				//if(parseInt( this.sprite.x ) % 5 == 0) {
					//animation = 2;
				//}else if (parseInt( this.sprite.x ) % 3 == 0) {
					//animation = 0;
				//}
			//} else if( this.sprite.cycle == 2) {
				//animation = 1;
				//this.sprite.cycle = 3;
			//}
			this.sprite.animationController(
				canvas
				, this.x
				, this.y
				, this.width //* -1
				, this.height
				, this.direction
				, this.input
			);
			if (this.sprite.y == 1) this.x = this.x + this.width / 48 * 2;
		}
	}

	class Game {
		constructor( canvas , player){
			this.canvas = canvas;
			this.context = canvas.getContext('2d');
			this.player = player;
			this.groundHeight = this.canvas.height * .12;
			this.groundY = this.canvas.height - this.groundHeight;
			this.level = function(){
				console.log("no level loaded");
			}
		}
		set canvas(newCanvas) {
			this._canvas = newCanvas;
		}
		set groundHeight(newHeight) {
			this._groundHeight = newHeight;
		}
		set groundY(newY) {
			this._groundY = newY;
		}
		set level(newLevel) {
			this._level = newLevel;
		}
		get canvas() {
			return this._canvas;
		}
		get groundHeight() {
			return this._groundHeight;
		}
		get groundY() {
			return this._groundY;
		}
		get level() {
			return this._level;
		}
		calcGroundHeight (){
			this.groundHeight = this.canvas.height * .12;
		}
		calcGroundY (){
			this.groundY = this.canvas.height - this.groundHeight;
		}
		drawLevel() {
			this.level.call(this);
		}
		drawPlayer(){
			const playerSquared = Math.floor( this.canvas.height * .5 );
			this.player.y = this.groundY - playerSquared;
			this.player.width = playerSquared;
			this.player.height = playerSquared;

			// animation
			this.player.inputController(this.canvas);
		}
		loop(){
			this.preserveAspectRatio();
			this.drawLevel();
			this.drawPlayer();
		}
		preserveAspectRatio() { 
			var inMemCanvas = document.createElement('canvas');
			var inMemCtx = inMemCanvas.getContext('2d');
			const gameConsole = getParentByClass(this.canvas, "game-console")
				, windowWidth = parseFloat( gameConsole.style.width )
				, windowHeight = parseFloat( gameConsole.style.height )
				, canvasDimension = windowHeight > windowWidth ? windowWidth : windowHeight
				;
			inMemCanvas.width = this.canvas.width;
			inMemCanvas.height = this.canvas.height;
			this.canvas.width = canvasDimension * .81;
			this.canvas.height = this.canvas.width / 1.25;
			inMemCtx.drawImage(this.canvas, 0, 0);
			this.context.drawImage(inMemCanvas, 0, 0);
			this.calcGroundHeight();
			this.calcGroundY();
		}
		init() {
			console.log("init");
			this.preserveAspectRatio();
			this.player.sprite.spritesheet.onload = this.player.spawn(this.canvas);
		}
	}
