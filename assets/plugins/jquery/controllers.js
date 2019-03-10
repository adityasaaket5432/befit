function IndexCtrl($scope, Idle) {
    console.log("Inside index control");
}

//app.controller('IndexCtrl',function(){
//    console.log("Inside index control");
//});


function LogoutCtrl(authenticationSvc, $location) {
    console.log("inside logout controller");
    authenticationSvc.removeCookie();
    $location.path("/login");

}

function LoginCtrl($scope, $location, $window, authenticationSvc, EF_CONS, $http, $log, FBAuthSvc,$q) {
   
  
    $scope.login = function () {
        $http.post(EF_CONS.AUTH_POINT, {
            userName: $scope.loginId,
            password: $scope.password
        }).then(function (result) {
            if (result.data.status === '$200') {
              var notify = {
					type: "success",
					title: "Login Successful !!",
                    content: 'Welcome',
                    timeout:3200
					};
                    $scope.$emit('notify', notify);
                    authenticationSvc.setCookie(result);
                    $location.path("/dashboard");  
                

            } else if(result.data.status === '$600'){
                var notify = {
					   type: "error",
					   title: "Login Failed !!",
                       content: 'User ID or Password Mismatch',
                       timeout:3200
					};
                    $scope.$emit('notify', notify);
            }
        }, function (error) {
           var notify = {
					   type: "error",
					   title: "Login Failed !!",
                       content: error,
                       timeout:3200
					};
                    $scope.$emit('notify', notify);
        });

    };

    $scope.cancel = function () {
        $scope.userName = "";
        $scope.password = "";
    };

    $scope.register = function () {
        $location.path("/register");
    };
    
    $scope.onFBLogin = function(){
        FB.login(function(response){
            if(response.status === "connected")
            FBAuthSvc.setCookiesFB(response);
            $location.path('/dashboard');
            //$log.info(FBAuthSvc.getCookieFB('FBglobals'));
            },{
           scope: 'email, user_likes',
           return_scopes: true 
       });
      $scope.facebook = {
        username:"",
        email:""
    };
    FB.api('/me','GET',{
                   fields:'email, first_name, name, id,picture', 
               },function(response){
                   $scope.$apply(function(){
                       $scope.facebook.username = response.name;
                       $scope.facebook.email = response.email;
                       $scope.fb_image = response.picture.data.url;
                   });
               });   
    }
} 

function RegCtrl($location, $scope, RegSvc,$log,EF_CONS) {
    
    console.log("registration");
    var config = {
        headers: {
            'Accept': 'application/json;odata=verbose'
        }
    };
     $scope.genOptions = [
        { name: 'Male', value: 1 },
        { name: 'Female', value: 2 },
        { name: 'Others', value: 4 }
    ];
    $scope.form = {
        type: $scope.genOptions[0].value
    };
    $scope.signup = function () {
        RegSvc.setFirstName($scope.fname);
        RegSvc.setLastName($scope.lname);
        RegSvc.setGenderID($scope.form.type);
        RegSvc.setEmail($scope.email);
        RegSvc.setMob($scope.mob);
        // RegSvc.setDob($scope.dob);
        RegSvc.setSmsId($scope.mob);
        if (signupfrm.chkemail.checked) {
            //alert("hi email selected");
            RegSvc.setUserId($scope.email);
        } else if (signupfrm.chkmob.checked) {
            //alert("Hi, Mobile is selected");
            RegSvc.setUserId($scope.mob);
        } else {
            //alert("Nothing is selected");
            RegSvc.setUserId($scope.mob);
        };
        $location.path("/regstep");
                // call otp service before going to registration step page
        
       
    };

    $scope.gotologin = function () {
        $location.path("/login")
    };

}

function RegStpCtrl($scope, RegSvc, $location, $http, EF_CONS,$log,OtpSet) {
    console.log("inside reg step controll ", OtpSet);
    //debugger;
    var config = {
        headers: {
            'Accept': 'application/json;odata=verbose'
        }
    };
    var data = RegSvc.getData();
                $log.info(data);
    $scope.signupstep = function () {
        $scope.checkpwd = true;
        if($scope.pssone === $scope.psstwo){
           // $scope.checkpwd = false;
			RegSvc.setPassword($scope.pssone);
            
            var otpcheck = OtpSet;
            if(otpcheck == $scope.otp_user){
                var data = RegSvc.getData();
                console.log("firstname: ",data.firstName, "lastname: ",data.lastName, " genderid : ",data.gender.id, " Email: ",data.email," Mobile :",data.mobileNo, " SMS: ", data.smsId, " userID: ",data.userId, " Pssword: ", data.password, "enterbypid: ",data.enteredByPId );
               /* $log.info("Pssword ",data.password);*/
                $http.post(EF_CONS.NEW_REG_POINT,data,config).then(function(response){
                    alert("Registered Successfully !!");
                },function(reason){
                    console.log("REason :",reason.data," Status : ",reason.status );
                }); 
            }else{
                alert("please enter valid OTP");
            } 
			
           }else{
			alert("Password mismatch !");
		}
    };
    $scope.gotoreg = function () {
        $location.path("/register");
    };
    
}// End of Registration_Step Controller

/********** Change Password Controller Begins*********************/
function ChangePwdCtrl(){
   // console.log("inside change password controller");
    $scope.onchangepwd = function(){
        alert("inside change password !!");
    }
}
/********** Change Password Controller Ends*********************/

function DashboardCtrl($scope, authenticationSvc, $http, MoreInfoOnChallengeSvc, $location, EF_CONS, Idle, Keepalive, $uibModal) {
    
    /* Facebook Test*/
//    $scope.facebook = {
//        username:"",
//        email:""
//    };
//    FB.api('/me','GET',{
//                   fields:'email, first_name, name, id,picture', 
//               },function(response){
//                   $scope.$apply(function(){
//                       $scope.facebook.username = response.name;
//                       $scope.facebook.email = response.email;
//                       $scope.fb_image = response.picture.data.url;
//                   });
//               });
    /*Facebook Test*/
    $scope.joinedChallenges = false;
    var uInfo = authenticationSvc.getCookie('globals');
    console.log(uInfo.currentUser.memberId);
    var memphoto = EF_CONS.PHOTO_PATH_POINT;
    var parphoto = EF_CONS.PHOTO_PATH_POINT;
    var config = {
        headers: {
            'h5cAuthToken': uInfo.currentUser.accessToken,
            'Accept': 'application/json;odata=verbose'
        }
    };
    var navbar = EF_CONS.USER_DATA_READ_POINT + uInfo.currentUser.memberId;
    $http.get(navbar, config).then(function (response) {
        $scope.navbarData = response.data;
    });
    $http.get(EF_CONS.DB_POINT, config).then(function (response) {
        //console.log("Dashboard Controller, DB_POINT", response);
        $scope.dashboardData = response.data;
        if (response.data.singleResult.toBeJoinedChallenges !== null) {
            $scope.joinedChallenges = true;
        }
        $scope.memphoto = memphoto + $scope.dashboardData.singleResult.userProfile.memberPhotoPath;
        //console.log($scope.memphoto);
        for (var i = 0; i < $scope.dashboardData.singleResult.userActivityFeedList.length; i++) {
            $scope.partcipantphoto = parphoto + $scope.dashboardData.singleResult.userActivityFeedList[i].participantPicPath;
            console.log($scope.dashboardData.singleResult.userActivityFeedList[i].participantPicPath);
            console.log($scope.partcipantphoto);  
        }
    });
    $scope.getTimeStamp = function(){
        return new Date();
    }
    $scope.inviteMore = function (id) {
        console.log("Inside Dashboard, Challenge ID:  " + id);
        MoreInfoOnChallengeSvc.setChallengeId(id);
        $location.path("/challengeDetail");

    }

    /*  Auto Logout */
    startAutoLogout();
    $scope.started = false;

    function closeModals() {
        if ($scope.warning) {
            $scope.warning.close();
            $scope.warning = null;
        }

        if ($scope.timedout) {
            $scope.timedout.close();
            $scope.timedout = null;
        }
    }

    function startAutoLogout() {
        closeModals();
        Idle.watch();
        $scope.started = true;
    }
    
    $scope.$on('IdleStart', function () {
        closeModals();
        $scope.warning = $uibModal.open({
            templateUrl: 'warning-dialog.html',
            windowClass: 'modal-danger'

        });
    });

    $scope.$on('IdleEnd', function () {
        closeModals();
    });

    $scope.$on('IdleTimeout', function () {
        closeModals();
        $scope.timedout = $uibModal.open({
            templateUrl: 'timedout-dialog.html',
            controller: TimedoutCtrl,
            windowClass: 'modal-danger'
        });
    });


    /* Auto Logout Ends */

    /* Test Date Picker Component Begins */
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };
    $scope.popup1 = {
        opened: false
    };
    /* Test Date Picker Component Ends */

}

function ChallengesCtrl($scope, authenticationSvc, $http, $location, MoreInfoOnChallengeSvc, $modal, EF_CONS, $uibModal, Idle) {
    // $scope.userInfo = auth;
    console.log("hello hi");
    $scope.getTimeStamp = function(){
        return new Date();
    }
    var uInfo = authenticationSvc.getCookie('globals');
    var actUrl = EF_CONS.ACT_CHL_POINT + uInfo.currentUser.memberId + "/1";
    var upUrl = EF_CONS.UP_CHL_POINT + uInfo.currentUser.memberId + "/1";
    var joiUrl = EF_CONS.JOI_CHL_POINT + uInfo.currentUser.memberId + "/1";
    var finUrl = EF_CONS.FIN_CHL_POINT + uInfo.currentUser.memberId + "/1";
    var othUrl = EF_CONS.OTH_CHL_POINT + uInfo.currentUser.memberId + "/1";
    var userImg = EF_CONS.PHOTO_PATH_POINT;

    var config = {
        headers: {
            'h5cAuthToken': uInfo.currentUser.accessToken,
            'Accept': 'application/json;odata=verbose'
        }
    };

    var navbar = EF_CONS.USER_DATA_READ_POINT + uInfo.currentUser.memberId;
    $http.get(navbar, config).then(function (response) {
        $scope.navbarData = response.data;
    });
    console.log(actUrl);
    $http.get(actUrl, config)
        .then(function (response) {
            $scope.activeChallenges = response.data;

            for (var i = 0; i < $scope.activeChallenges.results.length; i++) {
                //console.log($scope.activeChallenges.results[i].createdBy.memberPhotoPath);
                $scope.aImg = userImg + $scope.activeChallenges.results[i].createdBy.memberPhotoPath;
                // console.log($scope.aImg);
            }

        });
    $http.get(upUrl, config)
        .then(function (response) {
            $scope.upcomingChallenges = response.data;
            //  console.log($scope.upcomingChallenges.results.length);
            for (var i = 0; i < $scope.upcomingChallenges.results.length; i++) {
                $scope.uImg = userImg + $scope.upcomingChallenges.results[i].createdBy.memberPhotoPath;
            }

        });

    $http.get(joiUrl, config)
        .then(function (response) {
            $scope.joinChallenges = response.data;

        });

    $http.get(finUrl, config)
        .then(function (response) {
            $scope.finishedChallenges = response.data;
            // console.log("finished Challenge : "+$scope.finishedChallenges.results.length);
            for (var i = 0; i < $scope.finishedChallenges.results.length; i++) {
                $scope.fImg = userImg + $scope.finishedChallenges.results[i].createdBy.memberPhotoPath;
                // console.log("finished Challenge Image (" + i + ") :" + $scope.fImg);
            }

        });

    $http.get(othUrl, config)
        .then(function (response) {
            $scope.otherChallenges = response.data;
            for (var i = 0; i < $scope.otherChallenges.results.length; i++) {
                //console.log($scope.otherChallenges.results[i].createdBy.memberPhotoPath);
                $scope.oImg = $scope.otherChallenges.results[i].createdBy.memberPhotoPath;
            }
        });

    /* User data begins*/
    $http.get(EF_CONS.DB_POINT, config).success(function (data) {
        $scope.dashboardData = data;
    });

    $scope.moreInfo = function (challengeId) {
        //console.log(challengeId);
        MoreInfoOnChallengeSvc.setChallengeId(challengeId);
        $location.path("/challengeDetail");
    };

    $scope.inviteMoreFriends = function (challengeId) {
        //console.log(challengeId);
        MoreInfoOnChallengeSvc.setChallengeId(challengeId);
        $location.path("/challengeDetail");
    };

    $scope.createNewChallenge = function (size) {
        var modalInstance = $modal.open({
            controller: NewChallengeCtrl,
            templateUrl: 'assets/pages/new_challenge_plain.html',
            size: size

        });
    };
    $scope.moreInfoU = function (cid) {
        // console.log("Upcoming challenge: "+cid);
        MoreInfoOnChallengeSvc.setChallengeId(cid);
        $location.path("/challengeDetail");
    };

    $scope.inviteMoreFriendsU = function (cid) {
        //console.log("Upcoming challenge, Invite friend: "+cid);
        MoreInfoOnChallengeSvc.setChallengeId(cid);
        $location.path("/challengeDetail");
    };

    $scope.moreInfoF = function (cid) {
        //console.log("Finished Challenge ID:"+cid);
        MoreInfoOnChallengeSvc.setChallengeId(cid);
        $location.path("/challengeDetail");
    };

    $scope.moreInfoO = function (cid) {
        //console.log("Other Challenge ID:"+cid);
        MoreInfoOnChallengeSvc.setChallengeId(cid);
        $location.path("/challengeDetail");
    };

    /* Auto Logout Testing Starts */
    $scope.started = false;

    function closeModals() {
        if ($scope.warning) {
            $scope.warning.close();
            $scope.warning = null;
        }

        if ($scope.timedout) {
            $scope.timedout.close();
            $scope.timedout = null;
        }
    }

    function startAutoLogout() {
        closeModals();
        Idle.watch();
        $scope.started = true;
    }
    startAutoLogout();
    $scope.$on('IdleStart', function () {
        closeModals();
        $scope.warning = $uibModal.open({
            templateUrl: 'warning-dialog.html',
            windowClass: 'modal-danger'

        });
    });

    $scope.$on('IdleEnd', function () {
        closeModals();
    });

    $scope.$on('IdleTimeout', function () {
        closeModals();
        $scope.timedout = $uibModal.open({
            templateUrl: 'timedout-dialog.html',
            controller: TimedoutCtrl,
            windowClass: 'modal-danger'
        });
    });

    /* Auto Logout Testing Ends*/
}

function RewardsCtrl($scope, authenticationSvc, $http, $modal, EF_CONS, $uibModal, Idle) {

    var uInfo = authenticationSvc.getCookie('globals');
    var actUrl = EF_CONS.ACT_CHL_POINT + uInfo.currentUser.memberId + "/1";
    var upUrl = EF_CONS.UP_CHL_POINT + uInfo.currentUser.memberId + "/1";
    var joiUrl = EF_CONS.JOI_CHL_POINT + uInfo.currentUser.memberId + "/1";
    var finUrl = EF_CONS.FIN_CHL_POINT + uInfo.currentUser.memberId + "/1";
    var othUrl = EF_CONS.OTH_CHL_POINT + uInfo.currentUser.memberId + "/1";
    // var rewUrl = "http://dev.health5c.com:8080/ccp-services/challengereward/allRewards";
    var config = {
        headers: {
            'h5cAuthToken': uInfo.currentUser.accessToken,
            'Accept': 'application/json;odata=verbose'
        }
    };
    var navbar = EF_CONS.USER_DATA_READ_POINT + uInfo.currentUser.memberId;
    $http.get(navbar, config).then(function (response) {
        $scope.navbarData = response.data;
    });
    $http.get(actUrl, config).then(function (response) {
        $scope.aChallenges = response.data;
    });
    $http.get(upUrl, config).then(function (response) {
        $scope.uChallenges = response.data;
    });
    $http.get(finUrl, config).then(function (response) {
        $scope.fChallenges = response.data;
    });
    $http.get(EF_CONS.DB_POINT, config).then(function (response) {
        $scope.dashboardData = response.data;

    });

    $scope.createNewChallenge = function (size) {
        var modalInstance = $modal.open({
            controller: NewChallengeCtrl,
            templateUrl: 'assets/pages/new_challenge_plain.html',
            size: size

        });
    };

    $scope.rewardsrange = [
        { name: '--select participant range--'},
        { name: '0-5', value: '0-5'},
        { name: '6-20', value: '6-20'},
        { name: '21-40', value: '21-40'},
        { name: '41-100', value: '41-100'}
    ];

    $scope.form = {
        type: $scope.rewardsrange[0].value
    };

    $scope.callme = function (val) {
            $http.get(EF_CONS.ALL_REW_POINT, config)
            .then(function (response) {
                $scope.rewsection = false;
                $scope.rewardData = response.data;
                // var d = response.data;
                //console.log("No result found :"+d.results.length);
                if ($scope.rewardData.results.length == 0) {
                    $scope.rewsection = true;

                }

            });

    };


    /* Auto Logout Testing Starts */
    $scope.started = false;

    function closeModals() {
        if ($scope.warning) {
            $scope.warning.close();
            $scope.warning = null;
        }

        if ($scope.timedout) {
            $scope.timedout.close();
            $scope.timedout = null;
        }
    }

    function startAutoLogout() {
        closeModals();
        Idle.watch();
        $scope.started = true;
    }
    startAutoLogout();
    $scope.$on('IdleStart', function () {
        closeModals();
        $scope.warning = $uibModal.open({
            templateUrl: 'warning-dialog.html',
            windowClass: 'modal-danger'

        });
    });

    $scope.$on('IdleEnd', function () {
        closeModals();
    });

    $scope.$on('IdleTimeout', function () {
        closeModals();
        $scope.timedout = $uibModal.open({
            templateUrl: 'timedout-dialog.html',
            controller: TimedoutCtrl,
            windowClass: 'modal-danger'
        });
    });

    /* Auto Logout Testing Ends*/
}

function NewChallengeCtrl($scope, NewChallengeSvc, $modal, $modalInstance, Idle) {
    // console.log("inside testone popup controller");
    $scope.actyOptions = [
        { name: '-- Select Activity Type --'},
        { name: 'Running', value: 51},
        { name: 'Walking', value: 52},
        { name: 'Cycling', value: 53}
    ];
    
    $scope.form = {
        type: $scope.actyOptions[0].value
    };
    $scope.newChallenge = function (large) {
        console.log("hi");
        NewChallengeSvc.setChallengeName($scope.challengeName);
        NewChallengeSvc.setActivityType($scope.form.type);
        //alert($scope.form.type);
        NewChallengeSvc.setDistance($scope.distance);
        NewChallengeSvc.setStartDate($scope.startDate);
        NewChallengeSvc.setEndDate($scope.endDate);
        //console.log("ChallengeName: "+NewChallengeSvc.getChallengeName());
        // console.log("Start Date Test:> "+NewChallengeSvc.getStartDate());
        if ($scope.challengeName) {
            var modalInstance = $modal.open({
                templateUrl: 'assets/pages/prizes.html',
                controller: PrizesCtrl,
                size: large
            });
        } else {
            alert("Insert all fields");
        }
        // $location.path("/prizes");
    };
    
    //
    $scope.call = function () {
        console.log($scope.startDate);
       
    };
    //
    $scope.close = function () {
        console.log("NewChallengeCtrl, close")
        $modalInstance.close();
    };

    /* Date Picker Begins*/
    $scope.openStartDt = function () {
        $scope.popup1.opened = true;
    };
    $scope.popup1 = {
        opened: false
    };
    
    $scope.openEndDt = function () {
        $scope.popup2.opened = true;
    };
    $scope.popup2 = {
        opened: false
    };
    /* Date Picker Ends*/
}

function PrizesCtrl($location, $scope, authenticationSvc, $http, NewChallengeSvc, $modal, $modalInstance, EF_CONS, Idle) {
    // console.log(" hi inside prize controller");
    $scope.paRangeOptions = [
        {
            name: '-- Select Participant Range --'
        },
        {
            name: 'Beween 1 to 5',
            value: 5
        },
        {
            name: 'Beween 5 to 10',
            value: 10
        },
        {
            name: 'Beween 10 to 15',
            value: 15
        },
        {
            name: 'More than 15',
            value: 20
        }
    ];
    $scope.form = {
        type: $scope.paRangeOptions[0].value
    };
    $scope.rewardId = '';
    var uinfo = authenticationSvc.getCookie('globals');
    var config = {
        headers: {
            'h5cAuthToken': uinfo.currentUser.accessToken,
            'Accept': 'application/json;odata=verbose'
        }
    };

    $http.get(EF_CONS.ALL_REW_POINT, config)
        .then(function (response) {
            $scope.rewardData = response.data;

        });
    $scope.setRewardId = function (id) {
        NewChallengeSvc.setRewardId(id);

        $scope.selectPrizes = function (size) {
            NewChallengeSvc.setParticipantRange($scope.form.type);
            var modalInstance = $modal.open({
                // scope: $scope,
                templateUrl: 'assets/pages/invite.html',
                controller: InviteCtrl,
                size: size
            });
        };
        $scope.close = function () {
            console.log("PrizesCtrl, close")
            $modalInstance.close();
        };
    };
}


function InviteCtrl($location, $scope, NewChallengeSvc, authenticationSvc, $http, $modal, $modalInstance, Idle,EF_CONS) {
    var uinfo = authenticationSvc.getCookie('globals');
    var config = {
        headers: {
            'h5cAuthToken': uinfo.currentUser.accessToken,
            'Accept': 'application/json;odata=verbose'
        }
    };

    $scope.invite = function () {
        /*var phoneno = /^\d{10}$/;
        if (phno.value.match(phoneno)) {
            
           // return true;

        } else {
            alert("Enter Valid Phone Number");
            return false;
        }*/
        NewChallengeSvc.setReferredNumbers($scope.referredNumbers);
        var data = NewChallengeSvc.getData();
        $http.post(EF_CONS.CREATE_CHALLENGE_POINT, data, config).then(function (response) {
            var notify = {
					type: "success",
					title: "Success",
                    content: "Challenge Created",
                    timeout:3200
					};
            $scope.$emit('notify', notify);
            //$location.path("/dashboard");
        }, function(reason){
            var notify = {
					type: "error",
					title: "Failed",
                    content: "Challenge Not Created",
                    timeout:3200
					};
            $scope.$emit('notify', notify);
        });
    };
    $scope.close = function () {
        console.log("InviteCtrl, close")
        $modalInstance.close();
    };
    $location.path("/challenges");
}

/* Challenge Details Begins */
function ChallengeDetailCtrl($scope, authenticationSvc, $http, MoreInfoOnChallengeSvc, InviteMoreFriendsSvc, $location, EF_CONS, $uibModal, Idle) {
    var challengeInfo = MoreInfoOnChallengeSvc.getData();
    //console.log(challengeInfo);
    var url = EF_CONS.CHALLENGE_BY_ID_POINT + challengeInfo;
    var uInfo = authenticationSvc.getCookie('globals');
    var config = {
        headers: {
            'h5cAuthToken': uInfo.currentUser.accessToken,
            'Accept': 'application/json;odata=verbose'
        }
    };
    var navbar = EF_CONS.USER_DATA_READ_POINT + uInfo.currentUser.memberId;
    $http.get(navbar, config).then(function (response) {
        $scope.navbarData = response.data;
    });
    InviteMoreFriendsSvc.setChallengeId(challengeInfo);

    // Service, for Single Challenge by Challenge ID
    $http.get(url, config).then(function (response) {
        $scope.singleChallengeDetail = response.data;
        $scope.memphoto = EF_CONS.PHOTO_PATH_POINT + $scope.singleChallengeDetail.singleResult.createdBy.memberPhotoPath;
    });

    $http.get(EF_CONS.DB_POINT, config).then(function (response) {
        $scope.dashboardData = response.data;

    });

    //Invite friends
    $scope.inviteFriends = function () {
        // console.log("Challenge ID: " + challengeInfo);
        InviteMoreFriendsSvc.setReferredNumbers($scope.referredNumbers);
        //console.log("Referred Numbers : "+InviteMoreFriendsSvc.getReferredNumbers());
        var data = InviteMoreFriendsSvc.getData();
        $http.post(EF_CONS.INVITE_MORE_POINT, data, config).then(function () {
            alert("More friends Invited");
            $location.path("/challenges");

        });

    };
    /*  Auto Logout */

    $scope.started = false;

    function closeModals() {
        if ($scope.warning) {
            $scope.warning.close();
            $scope.warning = null;
        }

        if ($scope.timedout) {
            $scope.timedout.close();
            $scope.timedout = null;
        }
    }

    function startAutoLogout() {
        closeModals();
        Idle.watch();
        $scope.started = true;
    }
    startAutoLogout();
    $scope.$on('IdleStart', function () {
        closeModals();
        $scope.warning = $uibModal.open({
            templateUrl: 'warning-dialog.html',
            windowClass: 'modal-danger'

        });
    });

    $scope.$on('IdleEnd', function () {
        closeModals();
    });

    $scope.$on('IdleTimeout', function () {
        closeModals();
        $scope.timedout = $uibModal.open({
            templateUrl: 'timedout-dialog.html',
            controller: TimedoutCtrl,
            windowClass: 'modal-danger'
        });
    });

    /* Auto Logout Ends */

}
/* Challenge Details Ends */

/* Profile Controller Begins */
function ProfileCtrl(authenticationSvc, $http, $scope, ProfileUpdateSvc, ProfilePicUpdateSvc, $location, Upload, $timeout, EF_CONS, $uibModal, Idle) {
    var data = ProfileUpdateSvc.getData();
    var uInfo = authenticationSvc.getCookie('globals');
    //console.log(uinfo.currentUser.memberId);
    var txt = "";
    var config = {
        headers: {
            'h5cAuthToken': uInfo.currentUser.accessToken,
            'Accept': 'application/json;odata=verbose'
        }
    };
    $http.get(EF_CONS.USER_DATA_READ_POINT + uInfo.currentUser.memberId, config).then(function (response) {
        $scope.userData = response.data;
        /* To convert date into timestamp */
        var dt = $scope.userData.single;

        /* Data Binding to View */
        $scope.firstName = $scope.userData.singleResult.firstName;
        $scope.lastName = $scope.userData.singleResult.lastName;
        $scope.address = $scope.userData.singleResult.addressDto.address;
        $scope.area = $scope.userData.singleResult.addressDto.area;
        $scope.city = $scope.userData.singleResult.addressDto.city;
        $scope.state = $scope.userData.singleResult.addressDto.state;
        $scope.pinCode = $scope.userData.singleResult.addressDto.pinCode;
        $scope.dob = $scope.userData.singleResult.dob;
        $scope.gender = $scope.userData.singleResult.gender.id;

       /* ProfileUpdateSvc.setMiddleName($scope.userData.singleResult.middleName);
        ProfileUpdateSvc.setMobileNo($scope.userData.singleResult.mobileNo);
        ProfileUpdateSvc.setPrimaryMem($scope.userData.singleResult.primaryMember);
        ProfileUpdateSvc.setMemberType($scope.userData.singleResult.memberType);
        ProfileUpdateSvc.setCreated($scope.userData.singleResult.created);
        ProfileUpdateSvc.setBloodGroup($scope.userData.singleResult.bloodGroup.id, $scope.userData.singleResult.bloodGroup.name);
        ProfileUpdateSvc.setContactRelationship($scope.userData.singleResult.contactRelationship);
        ProfileUpdateSvc.setFamilyDrName($scope.userData.singleResult.familyDrName);
        ProfileUpdateSvc.setFamilyDrMobNum($scope.userData.singleResult.familyDrMobileNo);
        ProfileUpdateSvc.setEnteredByPid($scope.userData.singleResult.enteredByPId);*/
    });

    /* Upload Profile picture Begins */
    $scope.upload = function (dataurl, name, size) {
        ProfilePicUpdateSvc.setFirstName($scope.firstName);
        ProfilePicUpdateSvc.setLastName($scope.lastName);
        ProfilePicUpdateSvc.setDob($scope.dob);
        ProfilePicUpdateSvc.setGender($scope.gender);
        ProfilePicUpdateSvc.setAddress($scope.address, $scope.area, $scope.city, $scope.state, $scope.pinCode);
       
        ProfilePicUpdateSvc.setMiddleName($scope.userData.singleResult.middleName);
        ProfilePicUpdateSvc.setMobileNo($scope.userData.singleResult.mobileNo);
        ProfilePicUpdateSvc.setPrimaryMem($scope.userData.singleResult.primaryMember);
        ProfilePicUpdateSvc.setMemberType($scope.userData.singleResult.memberType);
        ProfilePicUpdateSvc.setCreated($scope.userData.singleResult.created);
        ProfilePicUpdateSvc.setBloodGroup($scope.userData.singleResult.bloodGroup.id, $scope.userData.singleResult.bloodGroup.name);
        ProfilePicUpdateSvc.setContactRelationship($scope.userData.singleResult.contactRelationship);
        ProfilePicUpdateSvc.setFamilyDrName($scope.userData.singleResult.familyDrName);
        ProfilePicUpdateSvc.setFamilyDrMobNum($scope.userData.singleResult.familyDrMobileNo);
        ProfilePicUpdateSvc.setEnteredByPid($scope.userData.singleResult.enteredByPId);
        var str = dataurl;
        var n = str.indexOf(",");
        var res = str.substring(n + 1, str.length);
        console.log(res);
        if (size >= 1000000) {
            alert("size is greater than 1mb");
        } else {
            txt += "dataurl: " + res + "<br>";
            txt += "name: " + name + "<br>";
            txt += "size: " + size + "<br>";
            ProfilePicUpdateSvc.setPhoto(res);
           // document.getElementById("demo").innerHTML = txt;
        }
         var data = ProfilePicUpdateSvc.getData();
       // console.log(data.memberId);
        $http.post(EF_CONS.PROFILE_UPDATE_POINT, data, config).then(function (response) {
           // alert("Picture Got Updated !!");
            var notify = {
					type: "success",
					title: "Success",
                    content: "Picture Got updated",
                    timeout:3200
					};
            $scope.$emit('notify', notify);
            $location.path("/dashboard");
        });

    };

    /*  Upload Profile picture Ends */

    $scope.saveProfile = function () {
      //  var updateUrl = "";
        ProfileUpdateSvc.setFirstName($scope.firstName);
        ProfileUpdateSvc.setLastName($scope.lastName);
        ProfileUpdateSvc.setDob($scope.dob);
        ProfileUpdateSvc.setGender($scope.gender);
        ProfileUpdateSvc.setAddress($scope.address, $scope.area, $scope.city, $scope.state, $scope.pinCode);
        
        ProfileUpdateSvc.setMiddleName($scope.userData.singleResult.middleName);
        ProfileUpdateSvc.setMobileNo($scope.userData.singleResult.mobileNo);
        ProfileUpdateSvc.setPrimaryMem($scope.userData.singleResult.primaryMember);
        ProfileUpdateSvc.setMemberType($scope.userData.singleResult.memberType);
        ProfileUpdateSvc.setCreated($scope.userData.singleResult.created);
        ProfileUpdateSvc.setBloodGroup($scope.userData.singleResult.bloodGroup.id, $scope.userData.singleResult.bloodGroup.name);
        ProfileUpdateSvc.setContactRelationship($scope.userData.singleResult.contactRelationship);
        ProfileUpdateSvc.setFamilyDrName($scope.userData.singleResult.familyDrName);
        ProfileUpdateSvc.setFamilyDrMobNum($scope.userData.singleResult.familyDrMobileNo);
        ProfileUpdateSvc.setEnteredByPid($scope.userData.singleResult.enteredByPId);
        var data = ProfileUpdateSvc.getData();
       // console.log(data.memberId);
        $http.post(EF_CONS.PROFILE_UPDATE_POINT, data, config).then(function (response) {
            alert("Profile Got Updated");
            $location.path("/dashboard");
        });
    };

    /* For Nav Bar */
    var navbar = EF_CONS.USER_DATA_READ_POINT + uInfo.currentUser.memberId;
    $http.get(navbar, config).then(function (response) {
        $scope.navbarData = response.data;
    });

    /*  Auto Logout */
    $scope.started = false;

    function closeModals() {
        if ($scope.warning) {
            $scope.warning.close();
            $scope.warning = null;
        }

        if ($scope.timedout) {
            $scope.timedout.close();
            $scope.timedout = null;
        }
    }

    function startAutoLogout() {
        closeModals();
        Idle.watch();
        $scope.started = true;
    }
    startAutoLogout();
    $scope.$on('IdleStart', function () {
        closeModals();
        $scope.warning = $uibModal.open({
            templateUrl: 'warning-dialog.html',
            windowClass: 'modal-danger'

        });
    });

    $scope.$on('IdleEnd', function () {
        closeModals();
    });

    $scope.$on('IdleTimeout', function () {
        closeModals();
        $scope.timedout = $uibModal.open({
            templateUrl: 'timedout-dialog.html',
            controller: TimedoutCtrl,
            windowClass: 'modal-danger'
        });
    });

    /* Auto Logout Ends */
    
    $scope.open = function () {
        $scope.popup.opened = true;
    };
    $scope.popup = {
        opened: false
    };
   
    /* Conditions for calendar */
    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        //maxDate: new Date(2018, 5, 22),
        //minDate: new Date(), 
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }
}
/* Profile Controller Ends */


function CoupCatCtrl($scope, $http, authenticationSvc, $location, couponSvc, EF_CONS, $timeout, $q, $log, AllCatagories, $uibModal, Idle) {
    var uInfo = authenticationSvc.getCookie('globals');
    var config = {
        headers: {
            'h5cAuthToken': uInfo.currentUser.accessToken,
            'Accept': 'application/json;odata=verbose'
        }
    };
    var navbar = EF_CONS.USER_DATA_READ_POINT + uInfo.currentUser.memberId;
    $http.get(navbar, config).then(function (response) {
        $scope.navbarData = response.data;
    });
    var c = couponSvc.getcoudata();
    /* Populate all Coupons Categories */
    $scope.coupons = AllCatagories;


    /* ========== To set the city id =================== */
    $scope.selCity = function () {
        var ciseurl = EF_CONS.ALL_CITY_POINT + $scope.selectcity;
        console.log("url  ->> " + ciseurl);
        $http.get(ciseurl, config).then(function (response) {
            $scope.cities = response.data.results;
            couponSvc.setCityId($scope.cities[length].id);
        });
    };

    $scope.selPartner = function () {
        var partsearurl = EF_CONS.ALL_PART_POINT + $scope.selectpartner;
        console.log("url  ->> " + partsearurl);
        $http.get(partsearurl, config).then(function (response) {
            $scope.partners = response.data.results;
            couponSvc.setPartnerId($scope.partners[length].id);

        });
    };
    $scope.setCat = function (catid) {
        console.log("Category ID : " + catid);
        couponSvc.setCatId(catid);
        var c = couponSvc.getcoudata();
        console.log(c.cityid);
        console.log(c.catid);
        $location.path("/coulist");
        // alert("City ID : " + couponSvc.getCityId() + ", Catagory ID Selected : " + couponSvc.getCatId());
    };

    $scope.searchcoupons = function () {
            if (c.cityid && c.partnerid) {
                console.log(c.cityid + ', ' + c.partnerid);
                $location.path('/coulistpartner');
            }

        }
        /*  Auto Logout */

    $scope.started = false;

    function closeModals() {
        if ($scope.warning) {
            $scope.warning.close();
            $scope.warning = null;
        }

        if ($scope.timedout) {
            $scope.timedout.close();
            $scope.timedout = null;
        }
    }

    function startAutoLogout() {
        closeModals();
        Idle.watch();
        $scope.started = true;
    }
    startAutoLogout();
    $scope.$on('IdleStart', function () {
        closeModals();
        $scope.warning = $uibModal.open({
            templateUrl: 'warning-dialog.html',
            windowClass: 'modal-danger'

        });
    });

    $scope.$on('IdleEnd', function () {
        closeModals();
    });

    $scope.$on('IdleTimeout', function () {
        closeModals();
        $scope.timedout = $uibModal.open({
            templateUrl: 'timedout-dialog.html',
            controller: TimedoutCtrl,
            windowClass: 'modal-danger'
        });
    });

    /* Auto Logout Ends */

}

function cListCtrl($scope, couponSvc, $http, authenticationSvc, $location, EF_CONS, AvailableCoupons, $uibModal, Idle) {
    console.log("inside control list");
    var uInfo = authenticationSvc.getCookie('globals');
    var config = {
        headers: {
            'h5cAuthToken': uInfo.currentUser.accessToken,
            'Accept': 'application/json;odata=verbose'
        }
    };
    var navbar = EF_CONS.USER_DATA_READ_POINT + uInfo.currentUser.memberId;
    $http.get(navbar, config).then(function (response) {
        $scope.navbarData = response.data;
    });

    /* Get all available coupons according to CityID and CategoryID */
    $scope.coupons = AvailableCoupons;
    console.log("coupons : ", $scope.coupons);



    $scope.coupdetail = function (coupid, pkgname, coupheader, coupdetail, couptandc, img, coupnum, expdate) {
        console.log('coupid : ' + coupid + ', pkgname : ' + pkgname + ', Coupon Header : ' + coupheader + ', CouponDetails : ' + coupdetail + ', T&C : ' + couptandc + ', img : ' + img + ', coupon Number : ' + coupnum + ', Exp Date : ' + expdate);

        couponSvc.setCoupId(coupid);
        couponSvc.setPackageName(pkgname);
        couponSvc.setCouHeader(coupheader);
        couponSvc.setCouDetails(coupdetail);
        couponSvc.setTandC(couptandc);
        couponSvc.setImagePath(img);
        couponSvc.setCoupNum(coupnum);
        couponSvc.setExpDate(expdate);
        $location.path("/coupdetail");
    }

    /*  Auto Logout */

    $scope.started = false;

    function closeModals() {
        if ($scope.warning) {
            $scope.warning.close();
            $scope.warning = null;
        }

        if ($scope.timedout) {
            $scope.timedout.close();
            $scope.timedout = null;
        }
    }

    function startAutoLogout() {
        closeModals();
        Idle.watch();
        $scope.started = true;
    }
    startAutoLogout();
    $scope.$on('IdleStart', function () {
        closeModals();
        $scope.warning = $uibModal.open({
            templateUrl: 'warning-dialog.html',
            windowClass: 'modal-danger'

        });
    });

    $scope.$on('IdleEnd', function () {
        closeModals();
    });

    $scope.$on('IdleTimeout', function () {
        closeModals();
        $scope.timedout = $uibModal.open({
            templateUrl: 'timedout-dialog.html',
            controller: TimedoutCtrl,
            windowClass: 'modal-danger'
        });
    });

    /* Auto Logout Ends */

}

function cListPartnerCtrl($scope, AvailableCoupons, authenticationSvc, EF_CONS, $http, couponSvc, $location, $uibModal, Idle) {
    console.log("inside coupon list partner");
    var uInfo = authenticationSvc.getCookie('globals');
    var config = {
        headers: {
            'h5cAuthToken': uInfo.currentUser.accessToken,
            'Accept': 'application/json;odata=verbose'
        }
    };
    var navbar = EF_CONS.USER_DATA_READ_POINT + uInfo.currentUser.memberId;
    $http.get(navbar, config).then(function (response) {
        $scope.navbarData = response.data;
    });
    console.log(AvailableCoupons);
    $scope.coupons = AvailableCoupons;

    $scope.coupdetail = function (coupid, pkgname, coupheader, coupdetail, couptandc, img) {
        console.log('coupid : ' + coupid + ', pkgname : ' + pkgname + ', Coupon Header : ' + coupheader + ', CouponDetails : ' + coupdetail + ', T&C : ' + couptandc + ', img : ' + img);
        couponSvc.setCoupId(coupid);
        couponSvc.setPackageName(pkgname);
        couponSvc.setCouHeader(coupheader);
        couponSvc.setCouDetails(coupdetail);
        couponSvc.setTandC(couptandc);
        couponSvc.setImagePath(img);
        $location.path("/coupdetail");
    }

    /*  Auto Logout */

    $scope.started = false;

    function closeModals() {
        if ($scope.warning) {
            $scope.warning.close();
            $scope.warning = null;
        }

        if ($scope.timedout) {
            $scope.timedout.close();
            $scope.timedout = null;
        }
    }

    function startAutoLogout() {
        closeModals();
        Idle.watch();
        $scope.started = true;
    }
    startAutoLogout();
    $scope.$on('IdleStart', function () {
        closeModals();
        $scope.warning = $uibModal.open({
            templateUrl: 'warning-dialog.html',
            windowClass: 'modal-danger'

        });
    });

    $scope.$on('IdleEnd', function () {
        closeModals();
    });

    $scope.$on('IdleTimeout', function () {
        closeModals();
        $scope.timedout = $uibModal.open({
            templateUrl: 'timedout-dialog.html',
            controller: TimedoutCtrl,
            windowClass: 'modal-danger'
        });
    });
    /* Auto Logout Ends */
}

function coupDetailCtrl(authenticationSvc, $http, EF_CONS, $scope, couponSvc, CouponDetail, SetNameAndMobileCouponDetail, $modal, UserCouponSvc, $uibModal, Idle) {
    var uInfo = authenticationSvc.getCookie('globals');
    var c = couponSvc.getcoudata();
    var config = {
        headers: {
            'h5cAuthToken': uInfo.currentUser.accessToken,
            'Accept': 'application/json;odata=verbose'
        }
    };
    var navbar = EF_CONS.USER_DATA_READ_POINT + uInfo.currentUser.memberId;
    $http.get(navbar, config).then(function (response) {
        $scope.navbarData = response.data;
        console.log($scope.navbarData); //  User Data

    });

    $scope.coupon = CouponDetail;
    //  $scope.coupon = couponDetail;
    console.log($scope.coupon.coupid);

    $scope.openModal = function (size) {
        $scope.modalinstance = $modal.open({
            templateUrl: 'couponDetailModal.html',
            scope: $scope,
            size: size
        });

    }

    $scope.modalClose = function () {
        $scope.modalinstance.close();
        console.log("modal closed ");
    }
    $scope.cancel = function () {
        $scope.modalinstance.dismiss('cancel');
        console.log("modal dismissed ");
    }


    /* To create Coupon */
    $scope.generateForMyself = function () {
        var namemobile = SetNameAndMobileCouponDetail;
        /*console.log(namemobile);
        console.log(namemobile.singleResult.firstName, namemobile.singleResult.mobileNo);*/
        UserCouponSvc.setForName(namemobile.singleResult.firstName);
        UserCouponSvc.setMobileNo(namemobile.singleResult.mobileNo);
        UserCouponSvc.setID($scope.coupon.coupid);
        UserCouponSvc.setPartnerLogoPath($scope.coupon.imagepath);
        UserCouponSvc.setPackageName($scope.coupon.pkgname);
        UserCouponSvc.setExpDate(c.expDate);
        UserCouponSvc.setMemID(uInfo.currentUser.memberId);
        UserCouponSvc.setCouponNo(c.couponNumber);
        var coupn = UserCouponSvc.getCreateCouponData();
        $http.post(EF_CONS.COU_CREATE_COUP_POINT, coupn, config).then(function (response) {
            // console.log(response);
            console.log("Coupon Created Successfully, Please Check your coupon in My coupons Section !!");
        }, function (error) {
            console.log(error);
        });
        $scope.modalinstance.close();
    }

    $scope.submit = function (name, mobile) {
        this.n = name;
        this.mo = mobile;
        UserCouponSvc.setID($scope.coupon.coupid);
        UserCouponSvc.setPartnerLogoPath($scope.coupon.imagepath);
        UserCouponSvc.setPackageName($scope.coupon.pkgname);
        UserCouponSvc.setForName(this.n);
        UserCouponSvc.setMobileNo(this.mo);
        UserCouponSvc.setExpDate(c.expDate);
        UserCouponSvc.setMemID(uInfo.currentUser.memberId);
        UserCouponSvc.setCouponNo(c.couponNumber);
        var coupn = UserCouponSvc.getCreateCouponData();
        $http.post(EF_CONS.COU_CREATE_COUP_POINT, coupn, config).then(function (response) {
            // console.log(response);
            console.log("Coupon Created Successfully, Please Check your coupon in My coupons Section !!");
        }, function (error) {
            console.log(error);
        });
        console.log("Result ", coupn);
        //console.log(coupn.forName);
        //  console.log(name,mobile);
        $scope.modalinstance.close();
        console.log("modal submitted !!");
    }

    /* Make string to list for coupon Details */
    var string = $scope.coupon.coupdetails;
    $scope.arrcoupdetail = new Array();
    $scope.arrcoupdetail = string.split(',');

    /* Make string to list for Terms & Conditions */
    var tandcstring = $scope.coupon.tandc;
    $scope.arrtandc = new Array();
    $scope.arrtandc = tandcstring.split(',');


    /*  Auto Logout */

    $scope.started = false;

    function closeModals() {
        if ($scope.warning) {
            $scope.warning.close();
            $scope.warning = null;
        }

        if ($scope.timedout) {
            $scope.timedout.close();
            $scope.timedout = null;
        }
    }

    function startAutoLogout() {
        closeModals();
        Idle.watch();
        $scope.started = true;
    }
    startAutoLogout();
    $scope.$on('IdleStart', function () {
        closeModals();
        $scope.warning = $uibModal.open({
            templateUrl: 'warning-dialog.html',
            windowClass: 'modal-danger'

        });
    });

    $scope.$on('IdleEnd', function () {
        closeModals();
    });

    $scope.$on('IdleTimeout', function () {
        closeModals();
        $scope.timedout = $uibModal.open({
            templateUrl: 'timedout-dialog.html',
            controller: TimedoutCtrl,
            windowClass: 'modal-danger'
        });
    });

    /* Auto Logout Ends */


}

function userCoupCtrl(authenticationSvc, $http, EF_CONS, $scope, UserCouponList, $uibModal, Idle) {
    var uInfo = authenticationSvc.getCookie('globals');
    var config = {
        headers: {
            'h5cAuthToken': uInfo.currentUser.accessToken,
            'Accept': 'application/json;odata=verbose'
        }
    };
    var navbar = EF_CONS.USER_DATA_READ_POINT + uInfo.currentUser.memberId;
    $http.get(navbar, config).then(function (response) {
        $scope.navbarData = response.data;
    });

    $scope.usercoupons = UserCouponList;

    console.log(UserCouponList);

    /*  Auto Logout */

    $scope.started = false;

    function closeModals() {
        if ($scope.warning) {
            $scope.warning.close();
            $scope.warning = null;
        }

        if ($scope.timedout) {
            $scope.timedout.close();
            $scope.timedout = null;
        }
    }

    function startAutoLogout() {
        closeModals();
        Idle.watch();
        $scope.started = true;
    }
    startAutoLogout();
    $scope.$on('IdleStart', function () {
        closeModals();
        $scope.warning = $uibModal.open({
            templateUrl: 'warning-dialog.html',
            windowClass: 'modal-danger'

        });
    });

    $scope.$on('IdleEnd', function () {
        closeModals();
    });

    $scope.$on('IdleTimeout', function () {
        closeModals();
        $scope.timedout = $uibModal.open({
            templateUrl: 'timedout-dialog.html',
            controller: TimedoutCtrl,
            windowClass: 'modal-danger'
        });
    });

    /* Auto Logout Ends */


}

function TimedoutCtrl($location, $scope) {
    console.log("Timedout Controll !!");
    $location.path('/logout');

}
