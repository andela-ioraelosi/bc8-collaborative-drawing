// draw objects feature goes here
console.log('Draw Objects Begin');

// DEFINE SELECTORS
// canvas
var my_canvas = document.getElementById('canvas'),
// shapes
circle_select = document.getElementById('circle'),
square_select = document.getElementById('square'),
rectangle_select = document.getElementById('rectangle'),
triangle_select = document.getElementById('triangle'),
// fill colours
blue_select = document.getElementById('blue'),
black_select = document.getElementById('black'),
pink_select = document.getElementById('pink'),
red_select = document.getElementById('red'),
green_select = document.getElementById('green'),
// context
context = my_canvas.getContext('2d');

/*
context.beginPath();
context.arc(80,80,60,0,2*Math.PI); // full circle object
context.stroke();
*/

// CONTEXT DEFAULT PROPERTIES
context.fillStyle = 'black';
context.strokeStyle = 'black';
context.lineWidth = 2;
context.font = '30px Garamond';

//context.fillText('Hello', 15, 175);

//context.fillRect(10, 20, 50, 50);

// DEFINE VARIABLES IN ONE PLACE
// define object variables
var circle, square, rectangle, triangle;


// CREATING THE SHAPES EVENT
// event references
my_canvas.onclick = createShape;

circle_select.onclick = selectShape;
square_select.onclick = selectShape;
rectangle_select.onclick = selectShape;
triangle_select.onclick = selectShape;

// colour fill event
blue_select.onclick = selectColor;
black_select.onclick = selectColor;
pink_select.onclick = selectColor;
red_select.onclick = selectColor;
green_select.onclick = selectColor;



// SELECTOR FUNCTIONS
// circle selector
function selectShape(){
	if(this === circle_select) circle = new Circle(0,0);
	else if(this === square_select) square = new Square(100,0);
	else if(this === rectangle_select) rectangle = new Square(120,80);
	else if(this === triangle_select) triangle = new Triangle(0,0);
}

// fill colour event
function selectColor(){
	if(this === blue_select) context.fillStyle = 'blue';
	else if(this === black_select) context.fillStyle = 'black';
	else if(this === pink_select) context.fillStyle = 'pink';
	else if(this === red_select) context.fillStyle = 'red';
	else if(this === green_select) context.fillStyle = 'green';

	context.fill();
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

	if(typeof rectangle === 'object') {
		rectangle.posX = x;
		rectangle.posY = y;
		rectangle.createRectangle();
		rectangle = 0;
	}

	if(typeof triangle === 'object') {
		triangle.posX = x;
		triangle.posY = y;
		triangle.createTriangle();
		triangle = 0;
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


var Square = function(length, width) {
	var sideLength = length,
	sideBredth = width;
	this.createSquare = function(){
		context.beginPath();
		context.rect(this.posX, this.posY, sideLength, sideLength);
		context.stroke();
	};
	this.createRectangle = function(){
		context.beginPath();
		context.rect(this.posX, this.posY, sideLength, sideBredth);
		context.stroke();
	};
};

var Triangle = function() {
	this.createTriangle = function(){
		context.beginPath();
	    context.moveTo(this.posX,this.posY);
	    context.lineTo(this.posX+100,this.posY+100);
	    context.lineTo(this.posX+100,this.posY-100);
	    context.lineTo(this.posX,this.posY);
	    context.stroke();
	};
};

Circle.prototype = new Shape();

Square.prototype = new Shape();

Triangle.prototype = new Shape();