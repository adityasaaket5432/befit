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


function befitLoginCtrl($scope, $location, BEFIT_CONST, authService, $http, SweetAlert) {
	console.log("Inside Login Controller");
    authService.removeCookie();
	/*-------------------callLoginService------------------*/
	$scope.loginFunc = function () {
		var loginObj = {
			"mobile": $scope.username,
			"password": $scope.password,
		};
		$http.post(BEFIT_CONST.BEFIT_LOGIN_POINT, loginObj).then(function (res) {
			console.log("login response", res);
			if (res.data.status === 'FOUND') {
                authService.setCookie(res);
                var cookie = authService.getCookie();
                if(cookie){
                    $location.path("/dashboard");    
                } else {
                    alert("error while login");    
                }
				
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
            if(error.status == -1){
                SweetAlert.swal({
					title: "Incorrect Username/Password.", //Bold text
					position: 'top-end',
					type: 'error',
					title: 'Server Down.',
					showConfirmButton: false,
					timer: 2000
				});    
            }
		});

		// $location.path("/dashboard");
		// console.log("login func called", loginObj);
	};


}
// ==================================Update Profile====================================== //
function befitUpdateProfileCtrl ($scope, $location, BEFIT_CONST, authService, $http, SweetAlert) {
    /* ------------------------------------- */
    var cookie = authService.getCookie();
    $scope.befit_userID = cookie.currentUser.id;
    console.log("cookie", cookie);    
    /* ---------------------Get user data by id-------------------- */
    $scope.getUserData = function () {
        if (cookie) {
            $http.get(BEFIT_CONST.BEFIT_USER_ID + $scope.befit_userID).then(function (res) {
                console.log("user data", res);
                if(res.data.befitstatus == "$302"){
                    $scope.userData = res.data;
                    $scope.userDataUpdate = res.data.singleResult;
                    $scope.first_username = $scope.userDataUpdate.fname;
                    $scope.last_username = $scope.userDataUpdate.lname;
                    $scope.mob = $scope.userDataUpdate.mobile;
                    $scope.email = $scope.userDataUpdate.email;
                    $scope.password = $scope.userDataUpdate.password;
//                    $scope.Address = $scope.userDataUpdate;
                    $scope.countryCode = $scope.userDataUpdate;
                    $scope.pincode = $scope.userDataUpdate.pin;
                    $scope.countryCode = $scope.userDataUpdate.country;
                    $scope.profilePic = $scope.userDataUpdate.profilePic;
                 
                } else {
                    SweetAlert.swal({    
                        title: "Error while fetching user data", //Bold text
                        position: 'top-end',
                        type: 'error',
                        title: 'Error while fetching user data',
                        showConfirmButton: false,
                        timer: 2000
                     });      
                }
               
            }, function (error) {
                console.log("error while getting user data", error);
            });
        } else {
            SweetAlert.swal({    
                title: "Please login again", //Bold text
                position: 'top-end',
                type: 'error',
                title: 'Could not get cookie, Please login again.',
                showConfirmButton: false,
                timer: 4000
            });    
        }
    }
    $scope.getUserData();
    
    /* ------------------------UPDATE PTOFILE------------------- */
    $scope.updateProfile = function () {
        var profileObj = {
            "fname": $scope.first_username,
            "lname": $scope.last_username,
            "mobile": $scope.mob,
            "gender": "m",
            "password": $scope.password,
            "profilepic": null,
            "email": $scope.email,
            "country": $scope.countryCode,
            "pin": $scope.pincode,
            "studentid": "030"
        };
        $http.post(BEFIT_CONST.BEFIT_UPDATE_PROFILE + $scope.befit_userID, profileObj).then(function (res) {
            if(res.data.befitstatus == "$200"){
                SweetAlert.swal({
                    title: "Profile update successfully.", //Bold text
                    position: 'top-end',
                    type: 'success',
                    title: 'Profile update successfully.',
                    showConfirmButton: false,
                    timer: 2000
                });    
            } else {
                SweetAlert.swal({
                    title: "Error while updating profile.", //Bold text
                    position: 'top-end',
                    type: 'error',
                    title: 'Error while updating profile',
                    showConfirmButton: false,
                    timer: 2000
                });     
            }        
        }, function (error){
            console.log("error while getting user data", error);
            SweetAlert.swal({
                    title: "Error while updating profile.", //Bold text
                    position: 'top-end',
                    type: 'error',
                    title: 'Error while updating profile',
                    showConfirmButton: false,
                    timer: 2000
                });
        });
    }
    /* ------------------------------------------------------------------ */
    
	
    
}
// ============================================SignupCtrl================================================================//
function befitSignupCtrl($scope, $location, BEFIT_CONST, authService, $http, SweetAlert) {
	console.log("Inside Signup Controller");
    /* ------------------------------------- */
     var cookie = authService.getCookie();
    /* ------------------------------------- */
   
	$scope.signinFunc = function () {
        if($scope.isUserExist == false){
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
                        title: "Mobile number already exist.", //Bold text
                        position: 'top-end',
                        type: 'error',
                        title: 'User Registerd Successfully',
                        showConfirmButton: false,
                        timer: 2000
                     });     
                    $location.path("/befitLogin");
                }
            }, function (error) {
                console.log("error while signup", error);
            });    
        } else {
            SweetAlert.swal({    
                title: "Mobile number already exist.", //Bold text
                position: 'top-end',
                type: 'error',
                title: 'Mobile number already exist.',
                showConfirmButton: false,
                timer: 2000
            });    
        }
		
		// $location.path("/dashboard");
		// console.log("Signup func called", signup);
	}
    
    /* -------------checkIfMobileValid-------------------------- */
    $scope.checkIfMobileValid = function (mobileNumber) {
        if(mobileNumber.length === 10){
            console.log("mobile number");
            $scope.isMobileAvailable(mobileNumber); 
        }
    }
    $scope.isMobileChecked = false;
    /* ----------------------------------------------------- */
    $scope.isMobileAvailable = function (mobileNumber) {
        
        $http.get(BEFIT_CONST.BEFIT_CHECK_IF_MOBILE_VALID + mobileNumber).then(function (res) {
            console.log("mobile number validation", res);
            $scope.isMobileChecked = true;
            if (res.data.status === 'FOUND') {
            
                SweetAlert.swal({
					title: "Mobile number already exist.", //Bold text
					position: 'top-end',
					type: 'error',
					title: 'Mobile number already exist.',
					showConfirmButton: false,
					timer: 2000
				});
                $scope.loaderPath = "assets/img/redcross.png";
                $scope.isUserExist = true;
                

            } else if (res.data.status === 'NOT_FOUND') {
                SweetAlert.swal({
                    title: "Mobile number available.", //Bold text
                    position: 'top-end',
                    type: 'success',
                    title: 'Mobile number available.',
                    showConfirmButton: false,
                    timer: 2000
                });
                $scope.loaderPath = "assets/img/greencheck.png";
                $scope.isUserExist = false;
            }
        }, function (error) {
            console.log("error while signup", error);
        });
        
        
    }

}
// *=============================================================================================================*//

/* ======================================================================================================= */
/* ==========================================befitDashboardCtrl=========================================== */
/* ======================================================================================================= */
function befitDashboardCtrl($scope, BEFIT_CONST, $http, authService) {
        /* ------------------------------------- */
    var cookie = authService.getCookie();
    $scope.befit_userID = cookie.currentUser.id;
    console.log("cookie", cookie);    
    /* ---------------------Get user data by id-------------------- */
    $scope.getUserData = function () {
        if (cookie) {
            $http.get(BEFIT_CONST.BEFIT_USER_ID + $scope.befit_userID).then(function (res) {
                console.log("user data", res);
                if (res.data.befitstatus == "$302") {
                    $scope.userData = res.data;

                } else {
                    SweetAlert.swal({
                        title: "Error while fetching user data", //Bold text
                        position: 'top-end',
                        type: 'error',
                        title: 'Error while fetching user data',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }

            }, function (error) {
                console.log("error while getting user data", error);
            });
        } else {
            SweetAlert.swal({
                title: "Please login again", //Bold text
                position: 'top-end',
                type: 'error',
                title: 'Could not get cookie, Please login again.',
                showConfirmButton: false,
                timer: 4000
            });
        }
    }
    $scope.getUserData();
     /* =========================================Active challenges============================== */
     $http.get(BEFIT_CONST.BEFIT_GET_MONTHLY_DATA + $scope.befit_userID).then(function (res) {
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
        $scope.monthy_data = res.data.results;
        console.log("monthly data", res);
        $scope.nodata = true;
        am4core.useTheme(am4themes_animated);

        var chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.scrollbarX = new am4core.Scrollbar();

        // Add data
        chart.data = $scope.monthy_data;

        // Create axes
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "savedate";
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
        series.dataFields.valueY = "steps";
        series.dataFields.categoryX = "savedate";
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
        chart.cursor = new am4charts.XYCursor();
    });
	/* ==================================== User-Id ============================================= */


	$http.get(BEFIT_CONST.BEFIT_USER_ID +1).then(function(res){
		$scope.userId=res.data;
	});


	/*=======================================USER TODAYS ACTIVITY================================*/ 

	$http.get(BEFIT_CONST.BEFIT_TODAYS_ACTIVITY +$scope.befit_userID).then(function(res){
        console.log("todays data", res);
		$scope.todaysData=res.data;
	});

	/*========================================leaderboard========================================*/


	$http.get(BEFIT_CONST.BEFIT_LEADERBOARD +$scope.befit_userID).then(function(res){
		$scope.leaderboard=res.data.results;
		console.log("leader board",$scope.leaderboard);
	});




	/* =========================================Active challenges============================== */

	$http.get(BEFIT_CONST.BEFIT_ACTIVE_CHALLENGE +1).then(function(res){
		$scope.activechalleng=res.data.singleResult;
		console.log($scope.activechalleng)
	});

   

	/*===========================================================================================*/

	



/*========================================================Date Conversion=======================================================================*/

/* ----------------------------------------------------convert to human date------------------------------------------------------------------- */

$scope.showHumaneDate = function (value) {
	var dateString = moment(value).format("YY:MM:DD");
	//console.log("dateString",dateString);
	return dateString;
	}
/*============================================================================================================================================= */
}
function befitChallengeCtrl($scope) {
	/*$scope.activeChallenge = [];*/
	$scope.changeDiv = function (id) {
		$scope.showDiv = id;
	};

}



