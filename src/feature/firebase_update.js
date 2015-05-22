//Firebase Realtime Update of Canvas by Bisoye and Kamiye

var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");


function getCanvas (){
	console.log('function called');
	ref.child('savedDrawing').on("value", function(snapshot)
	{	
		var canvasValue = snapshot.val();
		var img = new Image;
		img.src = canvasValue["drawing"];
		context.drawImage(img, 0, 0);
	})
}

getCanvas();

// EVENT HANDLERS

var flag = 0;

$('#canvas').mousedown(function(){
	flag = 1;
	var imgSrc = canvas.toDataURL();
	ref.child('savedDrawing').set({
		drawing : imgSrc
	})
});

$('#canvas').click(function(){
	flag = 1;
	var imgSrc = canvas.toDataURL();
	ref.child('savedDrawing').set({
		drawing : imgSrc
	})
	flag = 0;
});

$('#canvas').mousemove(function(){
	if(flag === 1)
	{
		var imgSrc = canvas.toDataURL();
		ref.child('savedDrawing').set({
			drawing : imgSrc
		})
	}
})
.mouseup(function() {
	flag = 0;
});

$('span').click(function(){
	flag = 1;
	var imgSrc = canvas.toDataURL();
	ref.child('savedDrawing').set({
		drawing : imgSrc
	})
});

$('span').mousedown(function(){
	flag = 1;
	var imgSrc = canvas.toDataURL();
	ref.child('savedDrawing').set({
		drawing : imgSrc
	})
});

$('span').mouseup(function() {
	flag = 0;
});
