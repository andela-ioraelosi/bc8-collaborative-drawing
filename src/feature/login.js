//login codes go here!
var ref = new Firebase("https://dazzling-inferno-1426.firebaseio.com");

  	var User_ID = -1;
  	var User = null;

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

		 function sendUsername (username){
			this.username = username
			console.log('Setting:' +username );
			ref.child('Username').push({
				 username
			})
			
		}

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

		var canvas = $("#canvas");
		canvas.click(function(){
			var imgSrc = canvas.toDataURL();
			ref.child('savedDrawing').set({
				drawing : imgSrc
			})

		});


		


		$("#register").click(
			function () {
				var email = $("#register-email").val();
	            var password = $("#register-password").val();
				var username = $("#Username").val();
				sendUsername(username);	            
	            var userObj = {
	            	email: email,
	            	password: password
	            };
	            ref.createUser(userObj, function (error, user){
	            	 if (!error) {
                        console.log('logging new registered user');
                        //ToDo redirect to canvas page
                        window.location.href = 'index.html';
                     } else {
                        console.log("Failed to register User");
                     }
                });

                	
	        }

			
		);

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

		$('#logout').click(function(){
		ref.unauth();
		window.location.href="index.html"
		});
		  	
	  	function doLogin(userObj) {
		    ref.authWithPassword(userObj, authHandler);
		};

    });

    	
    		

    

