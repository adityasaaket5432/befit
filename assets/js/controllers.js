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


function befitLoginCtrl($scope, $location, BEFIT_CONST, $http, SweetAlert) {
	console.log("Inside Login Controller");
	/*-------------------callLoginService------------------*/
	$scope.loginFunc = function () {
		var loginObj = {
			"mobile": $scope.username,
			"password": $scope.password,
		};
		$http.post(BEFIT_CONST.BEFIT_LOGIN_POINT, loginObj).then(function (res) {
			console.log("login response", res);
			if (res.data.status === 'FOUND') {
				$location.path("/dashboard");
			} else if (res.data.status === 'NOT_FOUND') {
				console.log("error while login");
				SweetAlert.swal({
					title: "Incorrect Username/Password.", //Bold text
					position: 'top-end',
					type: 'error',
					title: 'Incorrect Username/Password.',
					showConfirmButton: false,
					timer: 2000
				});
			}
		}, function (error) {
			console.log("error while login", error);
		});

		// $location.path("/dashboard");
		// console.log("login func called", loginObj);
	};


}
// ============================================SignupCtrl================================================================//
function befitSignupCtrl($scope, $location, BEFIT_CONST, $http, SweetAlert) {
	console.log("Inside Signup Controller");

	$scope.signinFunc = function () {

		var signup = {
			"mobile": $scope.mob,
			"id": "",
			"studentid": "",
			"profilePic": "",
			"fname": $scope.fname,
			"lname": $scope.lname,
			"password": $scope.pssone,
			"gender": $scope.gender,
			"email": $scope.email,
			"country": $scope.country,
			"pin": $scope.pincode

		};
		$http.post(BEFIT_CONST.BEFIT_SIGNUP_POINT, signup).then(function (res) {
			console.log("signup response", res);
			if (res.data.status === 'OK') {
				SweetAlert.swal({
					title: "Account created successfully.", //Bold text
					position: 'top-end',
					type: 'Success',
					title: 'Incorrect Username/Password.',
					showConfirmButton: false,
					timer: 4000
				});
				$location.path("/befitLogin");
				// } else if (res.data.status === 'NOT_FOUND') {
				// 	console.log("error while login");
				// 	SweetAlert.swal({
				// 		title: "Incorrect Username/Password.", //Bold text
				// 		position: 'top-end',
				// 		type: 'error',
				// 		title: 'Incorrect Username/Password.',
				// 		showConfirmButton: false,
				// 		timer: 2000
				// 	});
			}
		}, function (error) {
			console.log("error while signup", error);
		});
		// $location.path("/dashboard");
		// console.log("Signup func called", signup);
	}

}
// *=============================================================================================================*//

/* ======================================================================================================= */
/* ==========================================befitDashboardCtrl=========================================== */
/* ======================================================================================================= */
function befitDashboardCtrl($scope) {
	$scope.nodata = true;
	// Themes begin
	am4core.useTheme(am4themes_animated);
	// Themes end

	// Create chart instance
	var chart = am4core.create("chartdiv", am4charts.XYChart);
	chart.scrollbarX = new am4core.Scrollbar();

	// Add data
	chart.data = [{
		"date": "01-03-2019",
		"distance": "1 km"
	}, {
		"date": "02-03-2019",
		"distance": "5 km"
	}, {
		"date": "03-03-2019",
		"distance": "11 km"
	}, {
		"date": "04-03-2019",
		"distance": "8 km"
	}, {
		"date": "05-03-2019",
		"distance": "3 km"
	}, {
		"date": "06-03-2019",
		"distance": "10 km"
	}, {
		"date": "07-03-2019",
		"distance": "16 km"
	}, {
		"date": "08-03-2019",
		"distance": "20 km"
	}, {
		"date": "09-03-2019",
		"distance": "2 km"
	}, {
		"date": "10-03-2019",
		"distance": "12 km"
	}, {
		"date": "11-03-2019",
		"distance": "10 km"
	}, {
		"date": "12-03-2019",
		"distance": "10 km"
	}, {
		"date": "13-03-2019",
		"distance": "15 km"
	}, {
		"date": "14-03-2019",
		"distance": "1 km"
	}, {
		"date": "15-03-2019",
		"distance": "3 km"
	}, {
		"date": "16-03-2019",
		"distance": "6 km"
	}, {
		"date": "17-03-2019",
		"distance": "10 km"
	}, {
		"date": "18-03-2019",
		"distance": "3.5 km"
	}, {
		"date": "19-03-2019",
		"distance": "11 km"
	}, {
		"date": "21-03-2019",
		"distance": "0.5 km"
	}, {
		"date": "22-03-2019",
		"distance": "14 km"
	}, {
		"date": "23-03-2019",
		"distance": "8 km"
	}, {
		"date": "24-03-2019",
		"distance": "8 km"
	}, {
		"date": "25-03-2019",
		"distance": "3 km"
	}, {
		"date": "26-03-2019",
		"distance": "10 km"
	}, {
		"date": "27-03-2019",
		"distance": "11 km"
	}, {
		"date": "28-03-2019",
		"distance": "12 km"
	}, {
		"date": "29-03-2019",
		"distance": "13 km"
	}, {
		"date": "30-03-2019",
		"distance": "14 km"
	}, {
		"date": "01-04-2019",
		"distance": "15 km"
	}];

	// Create axes
	var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "date";
	categoryAxis.renderer.grid.template.location = 0;
	categoryAxis.renderer.minGridDistance = 30;
	categoryAxis.renderer.labels.template.horizontalCenter = "right";
	categoryAxis.renderer.labels.template.verticalCenter = "middle";
	categoryAxis.renderer.labels.template.rotation = 270;
	categoryAxis.tooltip.disabled = true;
	categoryAxis.renderer.minHeight = 110;

	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
	valueAxis.renderer.minWidth = 50;

	// Create series
	var series = chart.series.push(new am4charts.ColumnSeries());
	series.sequencedInterpolation = true;
	series.dataFields.valueY = "distance";
	series.dataFields.categoryX = "date";
	series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
	series.columns.template.strokeWidth = 0;

	series.tooltip.pointerOrientation = "vertical";

	series.columns.template.column.cornerRadiusTopLeft = 10;
	series.columns.template.column.cornerRadiusTopRight = 10;
	series.columns.template.column.fillOpacity = 0.8;

	// on hover, make corner radiuses bigger
	var hoverState = series.columns.template.column.states.create("hover");
	hoverState.properties.cornerRadiusTopLeft = 0;
	hoverState.properties.cornerRadiusTopRight = 0;
	hoverState.properties.fillOpacity = 1;

	series.columns.template.adapter.add("fill", function (fill, target) {
		return chart.colors.getIndex(target.dataItem.index);
	});

	// Cursor
	chart.cursor = new am4charts.XYCursor();
}



function befitChallengeCtrl($scope) {
	/*$scope.activeChallenge = [];*/
	$scope.changeDiv = function (id) {
		$scope.showDiv = id;
	};

}