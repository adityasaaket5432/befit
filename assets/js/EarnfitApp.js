var app = angular.module("earnfitApp", ['ngRoute', 'ui.bootstrap', 'ngFileUpload', 'oitozero.ngSweetAlert', 'ngImgCrop', 'ngCookies', 'ngStorage', 'ngIdle', 'angularNotify', 'infinite-scroll', 'ngMessages', 'ngAnimate', 'ngImageCompress', 'yaru22.angular-timeago', 'tw.directives.cropper', 'nvd3']);
var ip = 'http://192.168.2.108:8080/';
https: //be.fit/kmf-services/authenticate/login
    app.constant('BEFIT_CONST', {
        'BEFIT_LOGIN_POINT': ip + 'user/login',
        'BEFIT_SIGNUP_POINT': ip + 'user/addUser',
        'BEFIT_CHECK_IF_MOBILE_VALID': ip + 'user/checkMobile/',
        'BEFIT_USER_ID': ip + 'user/getUserById/',
        'BEFIT_UPDATE_PROFILE': ip + 'user/update/',
//        'BEFIT_TODAYS_ACTIVITY': ip + 'challenge/getChallengeDataforUser/',
        'BEFIT_LEADERBOARD': ip + 'challenge/leaderboard/',
        'BEFIT_ACTIVE_CHALLENGE': ip + 'challenge/getActiveChallenge/',
        'BEFIT_GET_MONTHLY_DATA': ip + 'challenge/getMonthlydata/',
        'BEFIT_TODAYS_ACTIVITY': ip + 'challenge/gettodaysdata/',
        'BEFIT_CHALLENGE_REQUEST_LIST':ip + 'challenge/getChallengeRequestForUser/',
        'BEFIT_JOIN_CHALLENGE':ip + 'challenge/joinchallenge/',
        'BEFIT_CREATE_CHALLENGE':ip + 'challenge/createChallenge/',
        'BEFIT_FRIEND_LIST':ip + 'friend/friendlist/',
        'BEFIT_MY_CHALLENGES': ip + 'challenge/getmychallenge/',
        'BEFIT_REFER_CHALLENGE': ip + 'challenge/referChallenge/',
        'BEFIT_UPLOAD_POST': ip + 'newsfeed/uploadpost/',
        'BEFIT_LIST_NEWS_FEED': ip + 'newsfeed/getallnewsfeed/',
        'BEFIT_SEARCH_FRIENDS': ip + 'user/searchusers/',
        'BEFIT_CHECK_IF_FRIEND': ip + 'friend/isfriend/',
        'BEFIT_CHECK_IF_REQUEST_SENT': ip + 'friend/friendrequestsentcheck/',
        'BEFIT_CHECK_IF_REQUEST_RECIEVE': ip + 'friend/friendrequestrecievecheck/',
        'BEFIT_ACCEPT_FRIEND_REQUEST': ip + 'friend/acceptfriend/',
        'BEFIT_SEND_FRIEND_REQUEST': ip + 'friend/sendrequest/',
        'BEFIT_FRIEND_REQUESTS_LIST': ip + 'friend/getfriendrequests/',
        


    });
/* console.log = function(){}; */
app.config(["$routeProvider", "$locationProvider", 'IdleProvider', function ($routeProvider, $locationProvider, IdleProvider) {
    IdleProvider.idle(600);
    IdleProvider.timeout(15);

    $routeProvider
        .when("/", {
            templateUrl: "assets/pages/index.html",
            controller: IndexCtrl
        })

        .when("/befitLogin", {
            templateUrl: "assets/pages/login.html",
            controller: befitLoginCtrl
        })
        .when("/befitSignup", {
            templateUrl: "assets/pages/signup.html",
            controller: befitSignupCtrl
        })
        .when("/profile", {
            templateUrl: "assets/pages/profile.html",
            controller: befitProfileCtrl
        })
        .when("/dashboard", {
            templateUrl: "assets/pages/dashboard.html",
            controller: befitDashboardCtrl
        })
        .when("/profileUpdate", {
            templateUrl: "assets/pages/profileUpdate.html",
            controller: befitUpdateProfileCtrl
        })
        .when("/challenge", {
            templateUrl: "assets/pages/challenge.html",
            controller: befitChallengeCtrl
        })
        .when("/community", {
                templateUrl: "assets/pages/community.html",
                controller: befitCommunityCtrl
            })
        .otherwise({
            redirectTo: '/'
        });
}]);









/* Authentication Service Begins */

app.factory("authService", ["$http", "$q", "$window", "BEFIT_CONST", "$cookies", "$log", function ($http, $q, $window, BEFIT_CONST, $cookies, $log) {
    var globals;
    var deferred = $q.defer();

    function setCookie(res) {
        cookieObj = {
            currentUser: res.data.singleResult
        };
        $cookies.putObject('befitCookie', cookieObj);
    }

    function setCookieUndefined() {
        cookieObj = {
            currentUser: undefined
        };
        $cookies.putObject('befitCookie', cookieObj);
        return cookieObj;
    }

    function getCookie() {
        return $cookies.getObject("befitCookie");
    }

    function removeCookie() {
        $cookies.remove('befitCookie');
    }
    return {
        setCookie: setCookie,
        getCookie: getCookie,
        removeCookie: removeCookie,
        setCookieUndefined: setCookieUndefined

    };
}]);

/* Authentication Service Ends */

