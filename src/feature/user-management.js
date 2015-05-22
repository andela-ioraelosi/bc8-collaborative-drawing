
ref = new Firebase("https://dazzling-inferno-1426.firebaseio.com");


//Transfering drawing data to firebase.

var gameScore = function (loggeIn, imagedata) 
{

		this.loggedIn = true;
		this.imagedata = imagedata
	 	ref.child('Saved').set(
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


ref.child('Username').on('value', loggedUser);

//Saving drawing status...

 $(document).ready(
	function()
{	
 		$("#savedrawing").click(function() 
	{
		var my_canvas = document.getElementById('canvas');
		var drawing = my_canvas.toDataURL();
		gameScore(true,drawing);
		console.log(my_canvas);
		alert(" Your Drawing Saved Successfully......");
	}
		)
}) 
 
 //Loading saved drawing
/*
$(document).ready(function()
{	
 		$("#resumedrawing").click(function() 
	{
		ref.child('Saved').once('value', function(snapshot) 
    {
      	var canvas = document.getElementById('canvas');
		var context = canvas.getContext("2d");
		var canvasValue = snapshot.val();
		var img = new Image;
		img.src = canvasValue["drawing"];
		context.drawImage(img, 0, 0)
		alert(" Saved Drawing Loaded Successfully");
	}	)
})

 	});
*/
