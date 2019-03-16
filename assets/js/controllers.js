function IndexCtrl($scope, Idle) {
	$scope.myInterval = 3000;


	$scope.slides = [{
			image: 'assets/img/slide02.jpg',
			title: "Activity",
			punchlineone: 'Challenge your friend ',
			punchlinetwo: 'Get Motivated',
			id: 1
		},
		{
			image: 'assets/img/slide03.jpg',
			title: "Running",
			punchlineone: 'One run can change your day,',
			punchlinetwo: ' but many runs can change your life',
			id: 2
		},
		{
			image: 'assets/img/slide04.jpg',
			title: "Cycling",
			punchlineone: "Don't limit your challenges, ",
			punchlinetwo: 'but challenge your limit',
			id: 3
		},
		{
			image: 'assets/img/slide06.jpg',
			title: "Walking",
			punchlineone: 'Walking is the best exercise ',
			punchlinetwo: 'Habituate yourself to walk very far',
			id: 4
		}
	];
}


function befitLoginCtrl($scope) {
	console.log("Inside Login Controller");
	/*-------------------callLoginService------------------*/
	$scope.callLoginService = function () {
		var loginObj = {
			"username": $scope.befitusername,
			"password": $scope.befitpassword
		};
		console.log("Login obj", loginObj);
	}

	$scope.loginFunc = function () {

		var myobj = {
			"username": $scope.username,
			"password": $scope.password
		};
		console.log("login func called", myobj);
	}





}

function befitSignupCtrl($scope) {

	console.log("Inside Signup Controller");
	$scope.signinFunc = function () {

		var signup = {
			"first_username": $scope.first_username,
			"last_username": $scope.last_username,
			"create-password": $scope.create_password,
			"confirm-password": $scope.confirm_password,
			"gender": $scope.gender,
			"mobile": $scope.mob,
			"email": $scope.email,
			"country": $scope.country,
			"pincode": $scope.pincode

		};
		console.log("Signup func called", signup);
	}

}

