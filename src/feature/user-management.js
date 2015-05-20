
ref = new Firebase("https://dazzling-inferno-1426.firebaseio.com");


ref.child('games').set({gameOne: 'Runner', gameTwo: 'Jumper', gameThree: 'Fighter'});


//Transfering drawing data to firebase.

var gameScore = function (loggeIn, imagedata) 
{
		this.username= userId;
		this.loggedIn = true;
		this.imagedata = imagedata
	 	ref.child('score').set(
	 {
	 	username: score: this.imagedata
	 });
}

//Displaying users online.

loggedUser = function() 
{

    	ref.child('Users').once('value', function(snapshot) 
    {
      	var userStatus = snapshot.val();
      	for (var user in userStatus) 
     	{
    		var $usersOn = $('#usersOnline');

   			$usersOn.text(user);
      }
    })
};


ref.child('Users').on('value', loggedUser)


//Saving drawing status...
$(document).ready(
	function()
{	
 		$("#savegame").click(function() 
	{
		
		var score = $("#score").val();
		gameScore(true,score);
		alert(" Your Score Submitted Successfully......");
	}
		)
 
})