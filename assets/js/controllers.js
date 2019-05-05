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
                if (cookie) {
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
            if (error.status == -1) {
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
function befitUpdateProfileCtrl($scope, $location, BEFIT_CONST, authService, $http, SweetAlert) {
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
            if (res.data.befitstatus == "$200") {
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
        }, function (error) {
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
// ============================================SignupCtrl==================================================//
function befitSignupCtrl($scope, $location, BEFIT_CONST, authService, $http, SweetAlert) {
    console.log("Inside Signup Controller");
    /* ------------------------------------- */
    var cookie = authService.getCookie();
    /* ------------------------------------- */

    $scope.signinFunc = function () {
        if ($scope.isUserExist == false) {
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
        if (mobileNumber.length === 10) {
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
// *======================================================================================================*//

/* ======================================================================================================= */
/* ==========================================befitDashboardCtrl=========================================== */
/* ======================================================================================================= */
function befitDashboardCtrl($scope, BEFIT_CONST, $http, authService,SweetAlert) {
    /* ------------------------------------- */
    var cookie = authService.getCookie();
    $scope.befit_userID = cookie.currentUser.id;
    console.log("cookie", cookie);
    /* ---------------------Get user data by id-------------------- */

    // /* ----------------------------onvert to human date-----------
    $scope.showHumaneDate = function (value) {
        var dateString = moment(value).format("YY:MM:DD");
        //console.log("dateString",dateString);
        return dateString;
    }

    /* ---------------------------------------------------------------------- */
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

    /*=======================================USER TODAYS ACTIVITY================================*/

    $http.get(BEFIT_CONST.BEFIT_TODAYS_ACTIVITY + $scope.befit_userID).then(function (res) {
        console.log("todays data", res);
        if (res.data.befitstatus == "$302"){
            $scope.todaysData=res.data;
        
        }
	});

	/*========================================leaderboard========================================*/
	$http.get(BEFIT_CONST.BEFIT_LEADERBOARD + $scope.befit_userID).then(function(res){
        console.log("leaderboard",$scope,res);
        if (res.data.befitstatus == "$302"){
            $scope.isleaderboard=true;
            $scope.leaderboard=res.data.results;
        
        } 
       else if(res.data.befitstatus == "$404"){
            this.isleaderboard  = !this.isleaderboard;
             
       }
	}, function(error){
        console.log("Network Error", error);
        SweetAlert.swal({
                title: "Network Error",
                position: 'top-end',
                type: 'error',
                title: 'Network Error',
                showConfirmButton: false,
                timer: 12000
            });

    });

    /* =========================================Active challenges============================== */

	$http.get(BEFIT_CONST.BEFIT_ACTIVE_CHALLENGE +$scope.befit_userID).then(function(res){
        if (res.data.befitstatus == "$302"){
            $scope.activeChallengeAbl=true;
		    $scope.activechalleng = res.data.singleResult;
            console.log("response of active dashboard",$scope.activechalleng)
        }
        else if(res.data.befitstatus == "$404"){
            this.activeChallengeAbl  = !this.activeChallengeAbl;
             
       }
    },function(error){
        console.log("Network Error", error);
        SweetAlert.swal({
                title: "Network Error",
                position: 'top-end',
                type: 'error',
                title: 'Network Error',
                showConfirmButton: false,
                timer: 12000
            });
    
	});

}

/* ============================================================================== */
function befitChallengeCtrl($scope, $http, BEFIT_CONST, authService, SweetAlert) {

    var cookie = authService.getCookie();
    $scope.befit_userID = cookie.currentUser.id;
    console.log("cookie", cookie);
    /* ---------------------------------------------------------------------- */
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
    // date picker
    $scope.today = function () {
        $scope.startDate = new Date();
        $scope.endDate = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.startDate = null;
        $scope.endDate = null;
    };

    $scope.inlineOptions = {
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.startDate = new Date(year, month, day);
        $scope.endDate = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    console.log("we are in challenge controller");
    $scope.showDiv = 1;
    $scope.changeDiv = function (id) {
        $scope.showDiv = id;

    };

    $scope.showChallengeDate = function (value) {

        var dateString = moment(value).format("YY:MM:DD");
        //console.log("dateString",dateString);
        return dateString;
    }

    // active challenge list
    $scope.getActiveChallengeList = function () {
        $http.get(BEFIT_CONST.BEFIT_ACTIVE_CHALLENGE + $scope.befit_userID).then(function (res) {

            if (res.data.befitstatus == "$302") {
                $scope.activeChallenge = res.data.singleResult;
                console.log("active challenge", $scope.activeChallenge)
            }
        });
    }
    $scope.getActiveChallengeList();


    // all challenge list
    $scope.getChallengeList = function () {
        $http.get(BEFIT_CONST.BEFIT_CHALLENGE_REQUEST_LIST + $scope.befit_userID).then(function (res) {
            console.log("response of join", res);
            if (res.data.befitstatus == "$302") {
                $scope.joinChallengeList = res.data.results;
                console.log("join challenge", $scope.joinChallengeList)
            }

        });
    }
    $scope.getChallengeList();

    // join challenge
    $scope.joinChallenge = function (obj) {

        var challengeid = obj.challenge.challengeid;

        $http.post(BEFIT_CONST.BEFIT_JOIN_CHALLENGE + $scope.befit_userID + "/" + challengeid).then(function (res) {

            console.log("response of join", res);
            if (res.data.befitstatus == "$501") {
                debugger;
                SweetAlert.swal({
                    title: "you have already joined another challenge", //Bold text
                    position: 'top-end',
                    type: 'error',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
            if (res.data.befitstatus == "$200") {
                SweetAlert.swal({
                    title: "you have successfully joined the challenge", //Bold text
                    position: 'top-end',
                    type: 'success',
                    showConfirmButton: false,
                    timer: 2000
                });
                $scope.getActiveChallengeList();
            }

        });
    }

    // create new challenge
    $scope.createChallenge = function (emp) {
        console.log("emp data", emp);

        var empData = {
            "challengename": $scope.challengeName,
            "startdate": $scope.startDate,
            "enddate": $scope.endDate
        };

        $http.post(BEFIT_CONST.BEFIT_CREATE_CHALLENGE + $scope.befit_userID, empData).then(function (res) {
            console.log("response of create challnege", res);
            SweetAlert.swal({
                title: "you have successfully create the challenge", //Bold text
                position: 'top-end',
                type: 'success',
                showConfirmButton: false,
                timer: 3000
            });

        });
    }

    // get all friend list
    $scope.getFriendList = function () {

        return $http.get(BEFIT_CONST.BEFIT_FRIEND_LIST + $scope.befit_userID).then(function (res) {
            console.log("response of friend list", res);
            if (res.data.befitstatus == "$302") {
                return res.data.results;
                // console.log("all friends  list",$scope.friendList)
            }

        });
    }
    $scope.getFriendList();

    // my challenge    

    $scope.getMyChallengeList = function () {

        return $http.get(BEFIT_CONST.BEFIT_MY_CHALLENGES + $scope.befit_userID).then(function (res) {
            console.log("response of friend list", res);
            if (res.data.befitstatus == "$302") {
                return res.data.results;
                // console.log("all friends  list",$scope.friendList)
            }

        });
    }
    $scope.getMyChallengeList();

    // refer chalenge to friend

    $scope.referChallenge = function () {
        var myFrnd = [];
        myFrnd.push($scope.myFriend.userid);
        var myChallengeData = {
            "challengeId": $scope.myChallenge.challengeid,
            "userIdlist": myFrnd,
            "referbyid": $scope.befit_userID
        }

        $http.post(BEFIT_CONST.BEFIT_REFER_CHALLENGE, myChallengeData).then(function (res) {

            console.log("response of create challnege", res);
            SweetAlert.swal({
                title: "you have successfully refer the challenge", //Bold text
                position: 'top-end',
                type: 'success',
                showConfirmButton: false,
                timer: 3000
            });

        });
    }

}
/* ============================================================================== */
function befitProfileCtrl($scope, $http, BEFIT_CONST, authService, SweetAlert) {
    var cookie = authService.getCookie();
    $scope.befit_userID = cookie.currentUser.id;
    console.log("cookie", cookie);
    /* ---------------------------------------------------------------------- */
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
    /*------------------------------update your post------------------*/
    $scope.updateStatus = function () {
        var sattusObj = {
            "article": $scope.status,
            "picture": ""
        };
        $http.post(BEFIT_CONST.BEFIT_UPLOAD_POST + $scope.befit_userID, sattusObj).then(function (res) {
            console.log("login response", res);
            if (res.data.befitstatus === '$200') {
                $scope.status = null;
                $scope.listNewsFeed();
                SweetAlert.swal({
                    title: "Status updated successfully.", //Bold text
                    position: 'top-end',
                    type: 'success',
                    title: 'Status updated successfully.',
                    showConfirmButton: false,
                    timer: 2000
                });
            } else if (res.data.befitstatus === '$501') {
                console.log("error while login");
                SweetAlert.swal({
                    title: "Something went wrong.", //Bold text
                    position: 'top-end',
                    type: 'error',
                    title: 'Something went wrong.',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        }, function (error) {
            console.log("error while login", error);
            if (error.status == -1) {
                SweetAlert.swal({
                    title: "", //Bold text
                    position: 'top-end',
                    type: 'error',
                    title: 'Server Down.',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        });
    }
    /* -------------------------LIST NEWS FEED------------------------- */
    $scope.listNewsFeed = function () {

        $http.get(BEFIT_CONST.BEFIT_LIST_NEWS_FEED).then(function (res) {
            console.log("news feed", res);

            if (res.data.befitstatus == "$302") {
                $scope.newsFeedArray = res.data.results.reverse();
            } else if (res.data.befitstatus === '$501') {
                console.log("error while fetching data");
                SweetAlert.swal({
                    title: "Something went wrong.", //Bold text
                    position: 'top-end',
                    type: 'error',
                    title: 'Something went wrong.',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        }, function (error) {
            console.log("error while fetching news feed", error);
            if (error.status == -1) {
                SweetAlert.swal({
                    title: "", //Bold text
                    position: 'top-end',
                    type: 'error',
                    title: 'Server Down.',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        });
    }
    $scope.listNewsFeed();
}

/* ============================befitCommunityCtrl=========================== */
function befitCommunityCtrl($scope, $http, BEFIT_CONST, authService, SweetAlert) {
    var cookie = authService.getCookie();
    $scope.befit_userID = cookie.currentUser.id;
    console.log("cookie", cookie);
    /* ---------------------------------------------------------------------- */
    $scope.getUserData = function (befit_userID) {
        if (cookie) {
            $http.get(BEFIT_CONST.BEFIT_USER_ID + befit_userID).then(function (res) {
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
    $scope.getUserData($scope.befit_userID);
    /* ----------------------------------- */
    $scope.showDiv = 1;
    $scope.changeDiv = function (id) {
        $scope.showDiv = id;
    };
    /* ----------------------------------- */
    $scope.search_friends = function (friends_name) {

        $http.get(BEFIT_CONST.BEFIT_SEARCH_FRIENDS + friends_name).then(function (res) {
            console.log("user data", res);
            if (res.data.befitstatus == "$302") {
                $scope.friends_list = res.data.results;
            } else if (res.data.befitstatus == '$404') {
                $scope.friends_list = [];
            }

        }, function (error) {
            console.log("error while getting user data", error);
        });
    }
    /* ------------------------------------------------------------------------ */
    $scope.get_data_for_Friend = function (friend) {
        $scope.isRequestAlreadySent = 0;
        $scope.isAddFriend = 0;
        $scope.isAddFriend = false;
        $scope.isRequestSent = false;
        $scope.isRequestRecieve = false;
        console.log("search friend for:", friend);
        $scope.other_friend_id = friend.userid;
        $('#isFriendModel').modal('show');
        $http.get(BEFIT_CONST.BEFIT_USER_ID + friend.userid).then(function (res) {
            console.log("user data", res);
            if (res.data.befitstatus == "$302") {
                $scope.checkfriend = res.data.singleResult;
                $scope.checkIfFriend(friend.userid);
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
    }
    /* ------------------------------------------------------------------------ */
    $scope.checkIfFriend = function (other_friend_id) {

        $http.get(BEFIT_CONST.BEFIT_CHECK_IF_FRIEND + $scope.befit_userID + "/" + other_friend_id).then(function (res) {
            console.log("isAlreadyFriend", res);
            
            if (res.data.befitstatus == "$302") {
                $scope.isAlreadyFriend = true;
                $scope.checkIfRequestSent(other_friend_id);
            } else if (res.data.befitstatus == "$404") {
                $scope.isAlreadyFriend = false;
                $scope.checkIfRequestSent(other_friend_id);
            }

        }, function (error) {
            console.log("error while getting user data", error);
        });
    }
    /* ------------------------------------------------------------------------ */
    $scope.checkIfRequestSent = function (other_friend_id) {

        $http.get(BEFIT_CONST.BEFIT_CHECK_IF_REQUEST_SENT + $scope.befit_userID + "/" + other_friend_id).then(function (res) {
            console.log("isRequestSent", res);
            
            if (res.data.befitstatus == "$302") {
                $scope.isRequestSent = true;
                $scope.checkIfRequestRecieve(other_friend_id);
            } else if (res.data.befitstatus == "$404") {
                $scope.isRequestSent = false;
                $scope.checkIfRequestRecieve(other_friend_id);
            }

        }, function (error) {
            console.log("error while getting user data", error);
        });
    }
    /* ------------------------------------------------------------------------ */
    $scope.checkIfRequestRecieve = function (other_friend_id) {

        $http.get(BEFIT_CONST.BEFIT_CHECK_IF_REQUEST_RECIEVE + $scope.befit_userID + "/" + other_friend_id).then(function (res) {
            console.log("isRequestRecieve", res);
            
            if (res.data.befitstatus == "$302") {
                $scope.isRequestRecieve = true;
                $scope.showResponceButton();
            } else if (res.data.befitstatus == "$404") {
                $scope.isRequestRecieve = false;
                $scope.showResponceButton();
            }

        }, function (error) {
            console.log("error while getting user data", error);
        });
    }
    /* ------------------------------------------------------------------------ */
    $scope.acceptFriendRequest = function () {
        $http.get(BEFIT_CONST.BEFIT_ACCEPT_FRIEND_REQUEST + $scope.befit_userID + "/" + $scope.other_friend_id).then(function (res) {
            console.log("isRequestRecieve", res);
            
            if (res.data.befitstatus == "$200") {
                $scope.checkIfFriend($scope.other_friend_id);
                $scope.checkIfRequestSent($scope.other_friend_id);
                $scope.checkIfRequestRecieve($scope.other_friend_id);
                $scope.showResponceButton();
            } else if (res.data.befitstatus == "$404") {
                $scope.isRequestRecieve = false;
            }

        }, function (error) {
            console.log("error while getting user data", error);
        });
    }     
    /* ------------------------------------------------------------------------ */
    $scope.acceptFriendRequestFromList = function (other_friend_id) {
        
        $http.get(BEFIT_CONST.BEFIT_ACCEPT_FRIEND_REQUEST + $scope.befit_userID + "/" + other_friend_id).then(function (res) {
            console.log("accept", res);
            
            if (res.data.befitstatus == "$200") {
                $scope.requestLists();
                SweetAlert.swal({
                    title: "congratulation!!! You both are now friends", //Bold text
                    position: 'top-end',
                    type: 'success',
                    title: 'Congratulation!!! You both are now friends',
                    showConfirmButton: false,
                    timer: 2000
                });    
            } else if (res.data.befitstatus == "$404") {
                
            }

        }, function (error) {
            console.log("error while getting user data", error);
        });
    }    
    /* ------------------------------------------------------------------------ */
    $scope.sendFriendRequest = function () {
        $http.get(BEFIT_CONST.BEFIT_SEND_FRIEND_REQUEST + $scope.befit_userID + "/" + $scope.other_friend_id).then(function (res) {
            console.log("SEND REQUEST", res);
            if (res.data.befitstatus == "$200") {
                $scope.checkIfFriend($scope.other_friend_id);
                $scope.checkIfRequestSent($scope.other_friend_id);
                $scope.checkIfRequestRecieve($scope.other_friend_id);
                $scope.showResponceButton();
            } else if (res.data.befitstatus == "$404") {
                
            }

        }, function (error) {
            console.log("error while getting user data", error);
        });
    }
    /* ------------------------------------------------------------------------ */
    $scope.listFriends = function () {
        $http.get(BEFIT_CONST.BEFIT_FRIEND_LIST + $scope.befit_userID).then(function (res) {
            console.log("friend list", res);
            if (res.data.befitstatus == "$302") {
                $scope.myFriendsListArr = res.data.results;    
            } else if (res.data.befitstatus == "$404") {
                $scope.myFriendsListArr = [];
            }

        }, function (error) {
            console.log("error while getting user data", error);
        });
    }    
    /* ------------------------------------------------------------------------ */
    $scope.requestLists = function () {
        $http.get(BEFIT_CONST.BEFIT_FRIEND_REQUESTS_LIST + $scope.befit_userID).then(function (res) {
            console.log("friend REQUEST", res);
            if (res.data.befitstatus == "$302") {
                $scope.requestListArr = res.data.results;    
            } else if (res.data.befitstatus == "$404") {
                $scope.requestListArr = [];
            }

        }, function (error) {
            console.log("error while getting user data", error);
        });
    }
    /* ------------------------------------------------------------------------ */
    $scope.isRequestAlreadySent = 0;
    $scope.isAddFriend = 0;
    $scope.showResponceButton = function () {
        $scope.isRequestAlreadySent = 0;
        $scope.isAddFriend = 0;
        if ($scope.isAlreadyFriend == true) {
            $scope.isRequestAlreadySent = 0;
            $scope.isAddFriend = 1;
        } else {
            $scope.isAddFriend = 2;
            if ($scope.isRequestSent == true) {
                $scope.isAddFriend = 0;
                $scope.isRequestAlreadySent = 1;
            } else {
                if ($scope.isRequestRecieve == true) {
                    $scope.isAddFriend = 0;
                    $scope.isRequestAlreadySent = 2;
                    debugger;
                } else {
                    $scope.isAddFriend = 2;
                    $scope.isRequestAlreadySent = 0;
                }
            }
        }
        console.log("add friend", $scope.isAddFriend);
        console.log("respont friend", $scope.isRequestAlreadySent);
        
    }
}
