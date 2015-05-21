
ref = new Firebase("https://dazzling-inferno-1426.firebaseio.com");


//Transfering drawing data to firebase.

var gameScore = function (loggeIn, imagedata) 
{

		this.loggedIn = true;
		this.imagedata = imagedata
	 	ref.child('savedDrawing').set(
		 {
		 	drawing: this.imagedata
		 });
}

//Displaying users online.

loggedUser = function() 
{
	ref.child('Username').on('value', function(snapshot) 
    {	
    	var userArr = [];
    	var text = '';
      	var userStatus = snapshot.val();
		var $usersOn = $('#usersOnline');
		for (var user in userStatus)
		{
			username = userStatus[user]['username'];
			userArr.push(username);
			text+=username+'<br>';
      		
      	}
      	$usersOn.html(text);
      	console.log(userArr);
    })
};


ref.child('Username').on('value', loggedUser)

//Saving drawing status...

 $(document).ready(
	function()
{	
 		$("#savedrawing").click(function() 
	{
		var my_canvas = $("#canvas");
		var drawing = my_canvas.toDataURL();
		gameScore(true,drawing);
		console.log(my_canvas);
		alert(" Your Drawing Saved Successfully......");
	}
		)
}) 
 
 //Loading saved drawing

$(document).ready(function()
{	
 		$("#resumedrawing").click(function() 
	{
		ref.child('savedDrawing').once('value', function(snapshot) 
    {
      	var drawingStatus = snapshot.val();
		var $saveddrawing = $("#canvas");
		$saveddrawing.text(drawingStatus);
		alert(" Saved Drawing Loaded Successfully");
	}	)
})

 	});