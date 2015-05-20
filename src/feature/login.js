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
		    console.log("Authenticated successfully with payload:", authData);
		  }
		}

		$("#register").click(
			function () {
				var email = $("#register-email").val();
	            var password = $("#register-password").val();
	            var userObj = {
	            	email: email,
	            	password: password
	            };
	            ref.createUser(userObj, function (error, user){
	            	 if (!error) {
                        console.log('logging new registered user');
                        doLogin(userObj);
                        //ToDo redirect to canvas page
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
		  	
	  	function doLogin(userObj) {
		    ref.authWithPassword(userObj, authHandler);

		};

    });

    	
    		

    

