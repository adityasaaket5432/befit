var app = angular.module("earnfitApp", ['ngRoute', 'ui.bootstrap', 'ngFileUpload', 'oitozero.ngSweetAlert', 'ngImgCrop', 'ngCookies', 'ngStorage', 'ngIdle', 'angularNotify', 'infinite-scroll', 'ngMessages', 'ngAnimate', 'ngImageCompress', 'yaru22.angular-timeago', 'tw.directives.cropper', 'nvd3']);
var ip = 'http://192.168.2.5:8080/';
https: //be.fit/kmf-services/authenticate/login
    app.constant('BEFIT_CONST', {
        'BEFIT_LOGIN_POINT': ip + 'user/login',
        'BEFIT_SIGNUP_POINT': ip + 'user/addUser',
        'BEFIT_CHECK_IF_MOBILE_VALID': ip + 'user/checkMobile/',
        'BEFIT_USER_ID': ip + 'user/getUserById/',
        'BEFIT_TODAYS_ACTIVITY': ip + 'challenge/getChallengeDataforUser/',
        'BEFIT_LEADERBOARD': ip + 'challenge/leaderboard/'


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
            controller: befitSignupCtrl
        })
        .when("/dashboard", {
            templateUrl: "assets/pages/dashboard.html",
            controller: befitDashboardCtrl
        })
        .when("/profileUpdate", {
            templateUrl: "assets/pages/profileUpdate.html",
            controller: befitSignupCtrl
        })
        .when("/challenge", {
            templateUrl: "assets/pages/challenge.html",
            controller: befitChallengeCtrl
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

