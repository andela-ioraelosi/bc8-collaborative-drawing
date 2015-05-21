
function getCanvas (){
	ref.child('savedDrawing').on("value", function(snapshot)
	{	
		var canvas = document.getElementById('canvas');
		var context = canvas.getContext("2d");
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
