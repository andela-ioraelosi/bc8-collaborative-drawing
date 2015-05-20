// The firebase link is my text link, to be changed
ref = new Firebase("https://dazzling-inferno-1426.firebaseio.com");


firebase.child('games').set({gameOne: 'Runner', gameTwo: 'Jumper', gameThree: 'Fighter'});


//Transfering drawing data to firebase.

var gameScore = function (userId, loggeIn, imagedata) 
{
		this.username= userId;
		this.loggedIn = true;
		this.imagedata = imagedata
	 	firebase.child('score').set(
	 {
	 	username: this.username, score: this.imagedata
	 });
}

//Displaying users online.

loggedUser = function() 
{

    	firebase.child('Users').once('value', function(snapshot) 
    {
      	var userStatus = snapshot.val();
      	for (var user in userStatus) 
     	{
    		var $usersOn = $('#usersOnline');

   			$usersOn.text(user);
      }
    })
};


firebase.child('Users').on('value', loggedUser)


//Saving drawing status...
$(document).ready(
	function()
{	
 		$("#savegame").click(function() 
	{
		
		var score = $("#score").val();
		gameScore(name, true,score);
		alert(" Your Score Submitted Successfully......");
	}
		)
 
})