function IndexCtrl($scope, Idle) { 
	$scope.myInterval = 3000;

	
	$scope.slides = [
		{
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


function befitLoginCtrl (){
	var a = "Ankit"
	console.log("Inside Login Controller", a);		
}