/*
* AUTHOR: OLUWAKAMIYE ADELEMONI
* DATE: 21ST MAY, 2015
* DECRIPTION: This script enables users to draw regular shapes
* 			  as well as free line drawing like pencils. 
			  The script also allows changing line colours
			  and fill colours

*/

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
pencil_select = document.getElementById('pencil'),
erase_select = document.getElementById('erase'),
// fill colours
blue_select = document.getElementById('blue'),
black_select = document.getElementById('black'),
pink_select = document.getElementById('pink'),
red_select = document.getElementById('red'),
green_select = document.getElementById('green'),
purple_select = document.getElementById('purple'),
yellow_select = document.getElementById('yellow'),
// line colours
blueline_select = document.getElementById('line_blue'),
blackline_select = document.getElementById('line_black'),
pinkline_select = document.getElementById('line_pink'),
redline_select = document.getElementById('line_red'),
greenline_select = document.getElementById('line_green'),
purpleline_select = document.getElementById('line_purple'),
yellowline_select = document.getElementById('line_yellow'),
// save button
save_button = document.getElementById('save'),
load_button = document.getElementById('load'),
// context
context = my_canvas.getContext('2d');


// CONTEXT DEFAULT PROPERTIES
context.fillStyle = 'black';
context.strokeStyle = 'black';
context.lineWidth = 5;
context.font = '30px Garamond';
var prevLineColor = context.strokeStyle;

//context.fillText('Hello', 15, 175);

//context.fillRect(10, 20, 50, 50);

// DEFINE VARIABLES IN ONE PLACE
// define object variables
var circle, square, rectangle, triangle, pencil, erase;


// CREATING THE SHAPES EVENT
// event references
my_canvas.onclick = createShape;

circle_select.onclick = selectShape;
square_select.onclick = selectShape;
rectangle_select.onclick = selectShape;
triangle_select.onclick = selectShape;
pencil_select.onclick = selectShape;
erase_select.onclick = selectShape;
// colour fill event
blue_select.onclick = selectColor;
black_select.onclick = selectColor;
pink_select.onclick = selectColor;
red_select.onclick = selectColor;
green_select.onclick = selectColor;
purple_select.onclick = selectColor;
yellow_select.onclick = selectColor;
// line colour event
blueline_select.onclick = selectLineColor;
blackline_select.onclick = selectLineColor;
pinkline_select.onclick = selectLineColor;
redline_select.onclick = selectLineColor;
greenline_select.onclick = selectLineColor;
purpleline_select.onclick = selectLineColor;
yellowline_select.onclick = selectLineColor;

// saving the image
save_button.onclick = saveDrawing;
load_button.onclick = loadImage;



// SELECTOR FUNCTIONS
// circle selector
function selectShape(){
	if(this === circle_select){
		circle = new Circle(0,0);
		square = 0;
		triangle = 0;
		rectangle = 0;
	}
	else if(this === square_select){
		square = new Square(100,0);
		circle = 0;
		triangle = 0;
		rectangle = 0;
	}
	else if(this === rectangle_select) {
		rectangle = new Square(120,80);
		square = 0;
		triangle = 0;
		circle = 0;
	}
	else if(this === triangle_select) {
		triangle = new Triangle(0,0);
		square = 0;
		circle = 0;
		rectangle = 0;
	}
	else if(this === pencil_select) {
		pencil = new Pencil(0,0);
		circle = 0;
		square = 0;
		triangle = 0;
		rectangle = 0;
	}
	else if(this === erase_select){
		context.strokeStyle = 'white';
		context.lineWidth = 10;
		erase = new Pencil(0,0);
	}

	if(this !== pencil_select) pencil = 0;
	if(this !== erase_select){
		erase = 0;
		context.strokeStyle = prevLineColor;
		context.lineWidth = '2';
	}
}

function selectLineColor(){
	if(this === blueline_select) context.strokeStyle = 'blue';
	else if(this === blackline_select) context.strokeStyle = 'black';
	else if(this === pinkline_select) context.strokeStyle = 'pink';
	else if(this === redline_select) context.strokeStyle = 'red';
	else if(this === greenline_select) context.strokeStyle = 'green';
	else if(this === purpleline_select) context.strokeStyle = 'purple';
	else if(this === yellowline_select) context.strokeStyle = 'yellow';

	prevLineColor = context.strokeStyle;
}

// fill colour event
function selectColor(){
	if(this === blue_select) context.fillStyle = 'blue';
	else if(this === black_select) context.fillStyle = 'black';
	else if(this === pink_select) context.fillStyle = 'pink';
	else if(this === red_select) context.fillStyle = 'red';
	else if(this === green_select) context.fillStyle = 'green';
	else if(this === purple_select) context.fillStyle = 'purple';
	else if(this === yellow_select) context.fillStyle = 'yellow';

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

	if(typeof pencil === 'object') {
		pencil.posX = x;
		pencil.posY = y;
	}
}


// SAVE DRAWING RETURNS THE BASE64 FORMAT THAT CAN BE STORED IN THE DATABASE
function saveDrawing(){
	var dataURL = my_canvas.toDataURL();
	console.log(dataURL);
}

// LOAD IMAGE SHOULD FETCH THE IMAGE BASE64 FORMAT AND CREATE A NEW CANVAS IMAGE FROM IT
function loadImage(){
	var img = new Image;
	img.src = ''; // IMAGE SOURCE DATA TO BE FETCHED FROM FIREBASE; 
	context.drawImage(img,0,0);
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

var Pencil = function() {

};

Circle.prototype = new Shape();

Square.prototype = new Shape();

Triangle.prototype = new Shape();

Pencil.prototype = new Shape();


// FREE DRAWING PENCIL FUNCTIONALITY

var downFlag = 0;
var prevx = 0;
var prevy = 0;
var startPointX = 0;
var startPointY = 0;
var dragged = false;
var pathMoveArray = [];

my_canvas.addEventListener("mousedown", function(){
	if(typeof pencil === 'object')
	{
	    downFlag = 1;
	    prevx = event.pageX - my_canvas.offsetLeft;
		prevy = event.pageY - my_canvas.offsetTop;
		startPointX = prevx;
		startPointY = prevy;
	}
	else if(typeof erase === 'object')
	{
	    downFlag = 1;
	    prevx = event.pageX - my_canvas.offsetLeft;
		prevy = event.pageY - my_canvas.offsetTop;
		startPointX = prevx;
		startPointY = prevy;
	}
}, false);

my_canvas.addEventListener("mousemove", function(){
	if(downFlag === 1 && typeof pencil === 'object')
	{
		// set path objects
		x = event.pageX - my_canvas.offsetLeft;
		y = event.pageY - my_canvas.offsetTop;

		context.beginPath();
	    context.moveTo(prevx,prevy);
	    context.lineTo(x,y);
	    context.stroke();

	    // assign path variables
	    var pathObj = {
			prevx: prevx,
			prevy: prevy,
			movex: x,
			movey: y
		}
		pathMoveArray.push(pathObj);

	    prevx = x;
	    prevy = y;
	    dragged = true;
	}
	else if(downFlag === 1 && typeof erase === 'object')
	{
		x = event.pageX - my_canvas.offsetLeft;
		y = event.pageY - my_canvas.offsetTop;

		context.beginPath();
	    context.moveTo(prevx,prevy);
	    context.lineTo(x,y);
	    context.stroke();

	    prevx = x;
	    prevy = y;
	}
}, false);
my_canvas.addEventListener("mouseup", function(){

	if(downFlag===1 && typeof pencil === 'object')
	{
		if(dragged === true)
		{
			var pathObj = {
				prevx: startPointX,
				prevy: startPointY,
				movex: x,
				movey: y
			}
			pathMoveArray.push(pathObj);
		    context.moveTo(startPointX,startPointY);
		    context.lineTo(x,y);
		    context.stroke();
		    context.closePath();
		}
	}
	if(pathMoveArray.length !== 0)
	{
		context.beginPath();
	    context.moveTo(pathMoveArray[0].prevx, pathMoveArray[0].prevy);
	    for(var i = 0; i < pathMoveArray.length; i++)
	    {
			context.lineTo(pathMoveArray[i].movex, pathMoveArray[i].movey);
	    }
	    context.closePath();
	    context.stroke();
	}
	pathMoveArray = [];
	dragged = false;
	downFlag = 0;

}, false);
