//login codes go here!
/* login.js page by Ore Olarewaju, this page is referenced by the html pages*/
var ref = new Firebase("https://dazzling-inferno-1426.firebaseio.com");

	$(function () {
			// Register the callback to be fired every time auth state changes
		function authHandler(error, authData) {
		  if (error) {
		    console.log("Login Failed!", error);
		  } else {
	  		window.location.href = 'canvas.html';
		    console.log("Login Successful:", authData);
		  }
		}
		//this function sends the username from register page to firebase data as JSON
		 function sendUsername (username){
			this.username = username
			console.log('Setting:' +username );
			ref.child('Username').push({
				 username
			})
			
		}
		//this function retrieves the current state of the canvas (image source) from firebase data
		function getCanvas (){

			ref.child('savedDrawing').on("value", function(snapshot)
			{	
				var canvas = $("#canvas");
				var context = canvas.getContext("2d");
				var canvasValue = snapshot.val();
				var img = new Image;
				img.src = canvasValue["drawing"];
				context.drawImage(img, 0, 0);
				console.log(canvasValue["drawing"]);
			})
		} 
		//this event captures the click on canvas and updates the current state in firebase
		var canvas = $("#canvas");
		canvas.click(function(){
			var imgSrc = canvas.toDataURL();
			ref.child('savedDrawing').set({
				drawing : imgSrc
			})

		});
		//event captures the click button to create and register new user and then calls the sendUsername function
		$("#register").click(
			function () {
				var email = $("#register-email").val();
	            var password = $("#register-password").val();
				var username = $("#Username").val();
				sendUsername(username);	            
	            var userObj = { //creat object
	            	email: email,
	            	password: password
	            };
	            ref.createUser(userObj, function (error, user){
	            	 if (!error) {
                        console.log('logging new registered user');
                        window.location.href = 'index.html';
                     } else {
                        console.log("Failed to register User");
                     }
                });
	        }
		);
		//event captures the login button to log in a user if he has been registered
		$("#login").click(
			function () {
				console.log('trying to login: ' + $("#login-email").val());
				var email = $("#login-email").val();
                var password = $("#login-password").val();
                var userObj = {
	            	email: email,
	            	password: password
	            };

                doLogin(userObj);
            }

		);
		//event captures the reset password button and sends an email to the user
		 $("#forgotPassword").click(function () {
	       	  var email = $("#forgot-email").val();
	          var emailObj = {email: email};
	          ref.resetPassword(emailObj, function(error) {
	            if (error === null) {
	              console.log("Password reset email sent successfully");
	            } 
	            else {
	              console.log("Error sending password reset email:", error);
	            }
	          });
	    });
		 //event captures the click button from the canvas.html to logout a user 
		$('#logout').click(function(){
		ref.unauth();
		window.location.href="index.html"
		});
		  	
	  	function doLogin(userObj) {
		    ref.authWithPassword(userObj, authHandler);
		};

    });

    	
    		

    

