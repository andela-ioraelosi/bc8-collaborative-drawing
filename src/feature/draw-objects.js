// draw objects feature goes here
console.log('Draw Objects Begin');

// DEFINE SELECTORS
var my_canvas = document.getElementById('canvas'),
circle_select = document.getElementById('circle'),
square_select = document.getElementById('square'),
context = my_canvas.getContext('2d');

/*
context.beginPath();
context.arc(80,80,60,0,2*Math.PI); // full circle object
context.stroke();
*/

context.fillStyle = "blue";
context.font = '30px Garamond';

context.fillText('Hello', 15, 175);

context.fillRect(10, 20, 50, 50);

// DEFINE VARIABLES IN ONE PLACE
// define object variables
var circle, square;


// CREATING THE SHAPES EVENT
// event references
my_canvas.onclick = createShape;

circle_select.onclick = selectShape;
square_select.onclick = selectShape;


// SELECTOR FUNCTIONS
// circle selector
function selectShape(shape){
	if(this === circle_select) circle = new Circle(0,0);
	else if(this === square_select) square = new Square(0,0);
}

// SHAPE CREATOR FUNCTION
function createShape(event){
	// GET THE X AND Y POSITION OF THE MOUSE
	var x = event.pageX - my_canvas.offsetLeft;
	var y = event.pageY - my_canvas.offsetTop;

	if(typeof circle === 'object') {
		circle.posX = x;
		circle.posY = y;
		circle.createCircle();
		circle = 0;
	}

	if(typeof square === 'object') {
		square.posX = x;
		square.posY = y;
		square.createSquare();
		square = 0;
	}


}


// OBJECT CLASSES
// Creating a new (CIRCLE) Object

var Shape = function(x,y) {
	this.posX = x;
	this.posY = y;
};

var Circle = function(){
	var radius = 60,
	startAngle = 0,
	endAngle = 2*Math.PI;
	this.createCircle = function(){
		context.beginPath();
		context.arc(this.posX, this.posY, radius, startAngle, endAngle);
		context.stroke();
	};
};



var Square = function() {
	var side = 100;
	this.createSquare = function(){
		context.strokeRect(this.posX, this.posY, side, side);
	}
};

Circle.prototype = new Shape();

Square.prototype = new Shape();