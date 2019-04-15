var app = angular.module("earnfitApp", ['ngRoute', 'ui.bootstrap', 'ngFileUpload', 'oitozero.ngSweetAlert', 'ngImgCrop', 'ngCookies', 'ngStorage', 'ngIdle', 'angularNotify', 'infinite-scroll', 'ngMessages', 'ngAnimate', 'ngImageCompress', 'yaru22.angular-timeago', 'tw.directives.cropper', 'nvd3']);
var ip = 'http://192.168.2.3:8080/';
https: //be.fit/kmf-services/authenticate/login
    app.constant('BEFIT_CONST', {
        'BEFIT_LOGIN_POINT': ip + 'user/login',
        'BEFIT_SIGNUP_POINT': ip + 'user/addUser',
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

/*---------------------------------------------------------------------------------------*/
/*--------------/ For description collapse in comunity detail page /---------------------*/
/*---------------------------------------------------------------------------------------*/
app.directive('ddTextCollapse', ['$compile', function ($compile) {

    return {
        restrict: 'A',
        scope: true,
        link: function (scope, element, attrs) {

            // start collapsed
            scope.collapsed = false;

            // create the function to toggle the collapse
            scope.toggle = function () {
                scope.collapsed = !scope.collapsed;
            };

            // wait for changes on the text
            attrs.$observe('ddTextCollapseText', function (text) {

                // get the length from the attributes
                var maxLength = scope.$eval(attrs.ddTextCollapseMaxLength);

                if (text.length > maxLength) {
                    // split the text in two parts, the first always showing
                    var firstPart = String(text).substring(0, maxLength);
                    var secondPart = String(text).substring(maxLength, text.length);

                    // create some new html elements to hold the separate info
                    var firstSpan = $compile('<span>' + firstPart + '</span>')(scope);
                    var secondSpan = $compile('<span ng-if="collapsed">' + secondPart + '</span>')(scope);
                    var moreIndicatorSpan = $compile('<span ng-if="!collapsed">... </span>')(scope);
                    var lineBreak = $compile('<br ng-if="collapsed">')(scope);
                    var toggleButton = $compile('<span class="collapse-text-toggle" ng-click="toggle()" style="color: #2953dc;cursor: pointer;">{{collapsed ? "less" : "more"}}</span>')(scope);

                    // remove the current contents of the element
                    // and add the new ones we created
                    element.empty();
                    element.append(firstSpan);
                    element.append(secondSpan);
                    element.append(moreIndicatorSpan);
                    element.append(lineBreak);
                    element.append(toggleButton);
                } else {
                    element.empty();
                    element.append(text);
                }
            });
        }
    };
}]);

app.directive("communityTile", function () {
    return {
        restrict: 'A',
        scope: {
            com: '='
        },
        templateUrl: 'assets/directives/communitytiles.html'
    };
});
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
/***************************************************/

app.directive("passwordStrength", function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(attrs.passwordStrength, function (value) {
                var num = /[0-9]/;
                var special = /[~!@#\$%\^&\*()_-]/;
                var upper = /[A-Z]/;
                var lower = /[a-z]/;
                if (lower.test(value)) {
                    scope.lowercase = "fa fa-check casemet";
                } else if (upper.test(value)) {
                    scope.uppercase = "fa fa-check casemet";
                } else if (special.test(value)) {
                    scope.specialcase = "fa fa-check casemet";
                } else if (num.test(value)) {
                    scope.numcase = "fa fa-check casemet";
                }


                if (angular.isDefined(value)) {
                    if (value.length > 8 && lower.test(value) && upper.test(value) && special.test(value) && num.test(value)) {
                        scope.strength = 'strong';
                        scope.minchar = "fa fa-check casemet";
                        scope.lowercase = lower.test(value);
                        scope.uppercase = upper.test(value);
                        scope.specialcase = special.test(value);
                        scope.numcase = num.test(value);
                        scope.showHelp = false;
                    } else if (value.length > 3) {
                        scope.strength = 'medium';
                    } else {
                        scope.strength = 'weak';

                    }
                }
            });
        }
    };
});
/***************************************************/
/*------------Input file -------------------*/
app.directive('fileInput', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attributes) {
            element.bind('change', function () {
                $parse(attributes.fileInput)
                    .assign(scope, element[0].files)
                scope.$apply()
            });
        }
    };
}]);


app.directive('imageonload', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('load', function () {
                if (element[0].naturalWidth > element[0].naturalHeight) {
                    element.css('transform', 'rotate(270deg)');
                }
            });
        }
    };
});
/* Filters */
app.filter("roundup", function () {
    return function (value) {
        if (isNaN(value)) {
            return value;
        } else {
            return Math.ceil(value);
        }

    };
});

/* To Capital initial letter as capital */
app.filter('capitalize', function () {
    return function (input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

/* To remove minus */
app.filter('abs', function () {
    return function (val) {
        return Math.abs(val);
    }
});

app.filter('setDecimal', function ($filter) {
    return function (input, places) {
        if (isNaN(input)) return input;
        var factor = "1" + Array(+(places > 0 && places + 1)).join("0");
        return Math.round(input * factor) / factor;
    };
});


/**********************/
/*app.directive('owlCarousel', [ '$timeout', function($timeout) {
  return {
    restrict: 'E',
    transclude: false,
    link: function (scope, element) {
      var defaultOptions = {
      };
      scope.initCarousel = function(element) {
        // provide any default options you want

        var customOptions = scope.$eval(jQuery(element).attr('data-options'));
        // combine the two options objects
        for(var key in customOptions) {
          defaultOptions[key] = customOptions[key];
        }
        // init carousel
        // jQuery(element).owlCarousel(defaultOptions);
      };
      // scope.$on('owlCarouselLoaded', function() {
        $timeout(function(){
          jQuery(element).owlCarousel(defaultOptions)
          scope.initCarousel();
        }, 0, false);
      // });
    }
  };
}]);*/
/*app.directive('owlCarouselItem', [function() {
  return {
    restrict: 'A',
    transclude: false,
    link: function(scope, element) {
      // wait for the last item in the ng-repeat then call init
      if(scope.$last) {
        scope.initCarousel(element.parent());
      }
    }
  };
}]);*/
app.directive('wrapOwlcarousel', function () {
    var link = function (scope, element, attr) {

        // Loads owl carousel with default settings, unless otherwise requested in parameters
        var carousel = function () {
            element.owlCarousel({
                // Most important owl features
                items: attr.owlItems ? attr.owlItems : 5,
                itemsCustom: attr.owlItemscustom ? (attr.owlItemscustom.toLowerCase() == 'true') : false,
                itemsDesktop: [1199, attr.owlItemsdesktop ? attr.owlItemsdesktop : 4],
                itemsDesktopSmall: [980, attr.owlItemsdesktopsmall ? attr.owlItemsdesktopsmall : 3],
                itemsTablet: [768, attr.owlItemstablet ? attr.owlItemstablet : 2],
                itemsTabletSmall: attr.owlItemstabletsmall ? (attr.owlItemstabletsmall.toLowerCase() == 'true') : false,
                itemsMobile: [479, attr.owlItemsmobile ? attr.owlItemsmobile : 1],
                singleItem: attr.owlSingleitem ? (attr.owlSingleitem.toLowerCase() == 'true') : false,
                itemsScaleUp: attr.owlItemsscaleup ? (attr.owlItemsscaleup.toLowerCase() == 'true') : false,

                //Basic Speeds
                slideSpeed: attr.owlSlidespeed ? attr.owlSlidespeed : 200,
                paginationSpeed: attr.owlPaginationspeed ? attr.owlPaginationspeed : 800,
                rewindSpeed: attr.owlRewindspeed ? attr.owlRewindspeed : 1000,

                //Autoplay
                autoPlay: attr.owlAutoplay ? (attr.owlAutoplay.toLowerCase() == 'true') : false,
                stopOnHover: attr.owlStoponhover ? (attr.owlStoponhover.toLowerCase() == 'true') : false,

                // Navigation
                navigation: attr.owlNavigation ? (attr.owlNavigation.toLowerCase() == 'true') : false,
                navigationText: [attr.owlNavigationtextprev ? attr.owlNavigationtextprev : "prev",
                    attr.owlNavigationtextnext ? attr.owlNavigationtextnext : "next"
                ],
                rewindNav: attr.owlRewindnav ? (attr.owlRewindnav.toLowerCase() == 'true') : true,
                scrollPerPage: attr.owlScrollperpage ? (attr.owlScrollperpage.toLowerCase() == 'true') : false,

                //Pagination
                pagination: attr.owlPagination ? (attr.owlPagination.toLowerCase() == 'true') : true,
                paginationNumbers: attr.owlPaginationnumbers ? (attr.owlPaginationnumbers.toLowerCase() == 'true') : false,

                // Responsive
                responsive: attr.owlResponsive ? (attr.owlResponsive.toLowerCase() == 'true') : true,
                responsiverefreshrate: attr.owlResponsiverefreshrate ? attr.owlResponsiverefreshrate : 200,
                responsivebasewidth: attr.owlResponsivebasewidth ? attr.owlResponsivebasewidth : window,

                // CSS Styles
                baseClass: attr.owlBaseclass ? attr.owlBaseclass : "owl-carousel",
                theme: attr.owlTheme ? attr.owlTheme : "owl-theme",

                //Lazy load
                lazyLoad: attr.owlLazyload ? (attr.owlLazyload.toLowerCase() == 'true') : false,
                lazyFollow: attr.owlLazyfollow ? (attr.owlLazyfollow.toLowerCase() == 'true') : true,
                lazyEffect: attr.owlLazyeffect ? attr.owlLazyeffect : "fade",

                //Auto height
                autoHeight: attr.owlAutoheight ? (attr.owlAutoheight.toLowerCase() == 'true') : false,

                //JSON
                jsonPath: attr.owlJsonpath ? (attr.owlJsonpath.toLowerCase() == 'true') : false,
                jsonSuccess: attr.owlJsonsuccess ? (attr.owlJsonsuccess.toLowerCase() == 'true') : false,

                //Mouse Events
                dragBeforeAnimFinish: attr.owlDragbeforeanimfinish ? (attr.owlDragbeforeanimfinish.toLowerCase() == 'true') : true,
                mouseDrag: attr.owlMousedrag ? (attr.owlMousedrag.toLowerCase() == 'true') : true,
                touchDrag: attr.owlTouchdrag ? (attr.owlTouchdrag.toLowerCase() == 'true') : true,

                //Transitions
                transitionStyle: attr.owlTransitionstyle ? (attr.owlTransitionstyle.toLowerCase() == 'true') : false,

                // Other
                addClassActive: attr.owlAddclassactive ? (attr.owlAddclassactive.toLowerCase() == 'true') : false,

                //Callbacks
                beforeUpdate: attr.owlBeforeupdate ? (attr.owlBeforeupdate.toLowerCase() == 'true') : false,
                afterUpdate: attr.owlAfterupdate ? (attr.owlAfterupdate.toLowerCase() == 'true') : false,
                beforeInit: attr.owlBeforeinit ? (attr.owlBeforeinit.toLowerCase() == 'true') : false,
                afterInit: attr.owlAfterinit ? (attr.owlAfterinit.toLowerCase() == 'true') : false,
                beforeMove: attr.owlBeforemove ? (attr.owlBeforemove.toLowerCase() == 'true') : false,
                afterMove: attr.owlAftermove ? (attr.owlAftermove.toLowerCase() == 'true') : false,
                afterAction: attr.owlAfteraction ? (attr.owlAfteraction.toLowerCase() == 'true') : false,
                startDragging: attr.owlStartdragging ? (attr.owlStartdragging.toLowerCase() == 'true') : false,
                afterLazyLoad: attr.owlAfterlazyload ? (attr.owlAfterlazyload.toLowerCase() == 'true') : false
            });
        }

        // Use carousel's id to bind control buttons to specific carousel (Multiple carousel support)
        // Otherwise, use owl-carousel as default.
        // Any element with given class will trigger control on click.
        //  '.owlcarousel-next' - Scrolls left
        //  '.owlcarousel-prev' - Scrolls right
        //  '.owlcarousel-play' - Starts autoplay
        //  '.owlcarousel-stop' = Stops autoplay
        var uniqueId = attr.id ? attr.id : 'owl-carousel';
        var actions = function () {
            angular.element("#nextItem").click(function () {
                element.trigger('owl.next');
            })
            angular.element("#prevItem").click(function () {
                element.trigger('owl.prev');
            })

        }

        // Watch items in carousel to reload when items are added/removed.
        scope.$watch(uniqueId + "-items", function (value) {
            carousel(element);
        })

        // Load the triggers for carousel controls.
        actions();
    }

    return {
        restrict: 'E',
        link: link
    }

})
/**********************/
app.run(["$rootScope", "$location", 'Idle', '$window', function ($rootScope, $location, Idle, $window, $http, EF_CONS, $localStorage) {


    /*-----------To reload the current page --------------*/
    $rootScope.$on("RELOAD", function () {
        location.reload();
    });
    $rootScope.$on("ONTOP", function () {
        $(document).scrollTop(0);
    });
    $rootScope.$on("clear", function () {
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    })



    $rootScope.$on("$routeChangeSuccess", function (obj) {
        $rootScope.showLoader = false;
        $(document).scrollTop(0);


    });
    $rootScope.$on("$routeChangeStart", function (next, current) {
        $rootScope.$emit('clear');
        $rootScope.showLoader = true;

        function removeWWW() {
            var url = location.href;
            var substring = "www.";
            if ((url.indexOf(substring)) > 1) {
                var newurl = $location.absUrl();
                newurl = newurl.replace(substring, "");
                window.location.href = newurl;

                //$window.location.href = newurl;
                // $window.location.path = "http://localhost:8080/keepmefit/angular_old/#/dashboard";
            }

        }
        removeWWW();

        /*------------------------------------------------*/
        /*
        var current_path = $location.path();
		if(current_path == '/login' ){
            
            if(confirm("Press OK for logged out or Cancel to stay in same page")){
                $location.path("/logout");
               }else{
                $location.path("/dashboard");
               }
        }*/

    });

    Idle.watch();



    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
        if (eventObj.authenticated === false) {
            $location.path("/login");
        }
    });
}]);
/*app.controller('SuperCtrl', function( $rootScope ) {

  $rootScope.$on('$routeChangeSuccess', function () {

    console.log('Route Changed');
      
  });

});*/


/* Filters */
app.filter("roundup", function () {
    return function (value) {
        if (isNaN(value)) {
            return value;
        } else {
            return Math.ceil(value);
        }

    };
});

/* To Capital initial letter as capital */
app.filter('capitalize', function () {
    return function (input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});



/* Authentication Service Begins */

app.factory("authenticationSvc", ["$http", "$q", "$window", "EF_CONS", "$cookies", "$log", function ($http, $q, $window, EF_CONS, $cookies, $log) {
    var globals;
    var deferred = $q.defer();

    function setCookie(res) {

        cookieObj = {
            currentUser: {
                accessToken: res.data.httpHeaders.h5cAuthToken,
                memberId: res.data.httpHeaders.memberId,
                accountId: res.data.httpHeaders.accountId,
                loginStatus: "LoggedIn"
            }
        };
        $cookies.putObject('Earnfitglobals', cookieObj);
        //deferred.resolve(Earnfitglobals);
    } // end of setCookie

    function setCookieUndefined() {

        cookieObj = {
            currentUser: {
                accessToken: undefined,
                memberId: undefined,
                accountId: undefined
            }
        };
        $cookies.putObject('Earnfitglobals', cookieObj);
        return cookieObj;
        //deferred.resolve(Earnfitglobals);
    } // end of setCookie undefined
    // function to get cookie
    function getCookie(cookieName) {
        return $cookies.getObject(cookieName);
    }

    //function to remove cookie
    function removeCookie() {
        $cookies.remove('Earnfitglobals');
    }
    return {
        setCookie: setCookie,
        getCookie: getCookie,
        removeCookie: removeCookie,
        setCookieUndefined: setCookieUndefined

    };
}]);

/* Authentication Service Ends */

/****** Authentication Service Using Facebook Starts *******/
app.factory("FBAuthSvc", ["$http", "EF_CONS", "$cookies", "$q", function ($http, EF_CONS, $cookies, $q) {

    function setCookiesFB(res) {
        cookieObj = {
            currentUser: {
                accessToken: res.authResponse.accessToken,
                userID: res.authResponse.userID
            }
        };
        $cookies.putObject('FBglobals', cookieObj);
    }

    function getCookieFB(cookieName) {
        return $cookies.getObject(cookieName);
    }

    function removeCookie() {
        $cookies.remove('FBglobals');
    }

    return {
        setCookiesFB: setCookiesFB,
        getCookieFB: getCookieFB,
        removeCookie: removeCookie

    };

}]);
/****** Authentication Service Using Facebook Ends *******/

/* Registration Service Begins */
app.factory("RegSvc", [function () {
    var data = {
        "userId": "",
        "email": "",
        "mobileNo": "",
        "smsId": "",
        "firstName": "",
        "lastName": "",
        "addressDto": {
            "source": "",
            "id": "",
            "state": "",
            "city": "",
            "area": "",
            "address": "",
            "pinCode": ""
        },
        "countryCode": "",
        /*"dob":"",*/
        "gender": {
            "id": "",
            "name": null,
            "sysMaster": false
        },
        "enteredByPId": "",
        "password": "",
        "studentId": "",
        "schoolDetailDto": {
            "id": ""
        }

    };

    return {
        setUserId: function (userid) {
            data.userId = userid;
        },
        setEmail: function (email) {
            data.email = email;
        },
        setMob: function (mo) {
            data.mobileNo = mo;
        },
        setSmsId: function (smsid) {
            data.smsId = smsid;
        },
        setFirstName: function (fname) {
            data.firstName = fname;
        },
        setLastName: function (lname) {
            data.lastName = lname;
        },
        setPinNumber: function (pin) {
            data.addressDto.pinCode = pin;
        },
        /*setDob: function (dob) {data.dob = dob;},*/
        setGenderID: function (id) {
            data.gender.id = id;
        },
        setEnteredByPID: function (pid) {
            data.enteredByPId = pid;
        },
        setPassword: function (pwd) {
            data.password = pwd;
        },
        setCountryCode: function (code) {
            data.countryCode = code;
        },
        setstudentId: function (studId) {
            data.studentId = studId;
        },
        setschoolDetailDto: function (schoolId) {
            data.schoolDetailDto.id = schoolId;
        },

        getData: function () {
            return data;
        }
    };
}]);
/* Registration Service Ends */

/* Create New Challenge Service Begins */
app.factory('NewChallengeSvc', [function () {
    var data = {
        challengeName: '',
        visibility: '',
        description: '',
        selectedRewardId: '',
        rewardName: '',
        startDate: '',
        endDate: '',
        activityCategoryId: '',
        distanceunit: '',
        minParticipant: '',
        referredNumbers: '',
        distance: '',
        challengeType: 'challenge',
        prov1: '',
        prov2: '',
        prov3: '',
        prov4: '',
        communityIdForInv: '',
        communityId: 0
    };

    return {
        setChallengeName: function (challengeName) {
            data.challengeName = challengeName;
        },
        setGroupType: function (groupType) {
            data.visibility = groupType;
        },
        setShortDescription: function (desc) {
            data.description = desc;
        },
        setCommunityIdForInv: function (id) {
            data.communityId = id;
        },
        setCommunityId: function (id) {
            data.communityId = id;
        },
        setActivityType: function (activityType) {
            data.activityCategoryId = activityType;
        },
        setDistanceUnit: function (unit) {
            data.distanceunit = unit;
        },
        setDistance: function (distance) {
            data.distance = distance;
        },
        setStartDate: function (startDate) {
            data.startDate = startDate;
        },
        setEndDate: function (endDate) {
            data.endDate = endDate;
        },
        setParticipantRange: function (participantRange) {
            data.minParticipant = participantRange;
        },
        setRewardId: function (rewardId) {
            data.selectedRewardId = rewardId;
        },
        setRewardName: function (rewardName) {
            data.rewardName = rewardName;
        },
        setReferredNumbers: function (referredNumbers) {
            data.referredNumbers = referredNumbers;
        },
        setProv1: function (p1) {
            data.prov1 = p1;
        },
        setProv2: function (p2) {
            data.prov2 = p2;
        },
        setProv3: function (p3) {
            data.prov3 = p3;
        },
        setProv4: function (p4) {
            data.prov4 = p4;
        },

        getData: function () {
            return data;
        }


    };
}]);

/* Create New Challenge Service Ends */


/* More INFO on challenge Service Begins */
app.factory("MoreInfoOnChallengeSvc", [function () {
    /*var data = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : {};*/
    var data = localStorage.getItem("data") ? localStorage.getItem("data") : {};

    function setChallengeId(id) {
        data = id;
        localStorage.setItem("data", JSON.stringify(data));
    }

    function getData() {
        return data;
    }
    return {
        setChallengeId: setChallengeId,
        getData: getData
    };

}]);

/* More INFO on challenge Service Ends */

/* Invite More Friends Service Begins*/
app.factory("InviteMoreFriendsSvc", [function () {
    var data = {
        challengeId: '',
        referredNumbers: ''
    };

    return {
        setChallengeId: function (challlengeID) {
            data.challengeId = challlengeID;
        },

        setReferredNumbers: function (referredNumbers) {
            data.referredNumbers = referredNumbers;
        },

        /*getReferredNumbers: function(){
          return data.referredNumbers;  
        },*/

        getData: function () {
            return data;
        }
    };
}]);
/* Invite More Friends Service Ends*/

/* Profile Service Begins */
app.factory("ProfileUpdateSvc", ["authenticationSvc", function (authenticationSvc) {
    var uInfo = authenticationSvc.getCookie('Earnfitglobals');
    var data = {
        memberId: uInfo.currentUser.memberId,
        dob: '',
        firstName: '',
        middleName: '',
        lastName: '',
        height: '',
        weight: '',
        mobileNo: '',
        primaryMember: '',
        memberType: '',
        created: '',
        gender: {
            id: ''
        },
        bloodGroup: {
            id: '',
            name: ''
        },
        contactRelationship: '',
        familyDrName: '',
        familyDrMobileNo: '',
        addressDto: {
            state: '',
            city: '',
            area: '',
            address: '',
            pinCode: ''
        },
        contactInfoDto: {
            contactPersonName: '',
            mobileNum: ''
        },
        memberPhotoPath: '',
        enteredByPId: ''
    };
    /*var data = {
        memberId: uInfo.currentUser.memberId,dob: '',firstName: '',middleName: '',lastName: '', mobileNo: '',primaryMember: '',memberType: '',created: '',gender: {id: ''},bloodGroup: {id: '',name: ''},contactRelationship: '',familyDrName: '',familyDrMobileNo: '',addressDto: {state: '',city: '',area: '',address: '',pinCode: ''},contactInfoDto: {contactPersonName: '',mobileNum: ''},memberPhotoPath: '',enteredByPId: ''
    };*/

    return {
        setDob: function (dob) {
            data.dob = dob;
        },
        setFirstName: function (fname) {
            data.firstName = fname;
        },
        setMiddleName: function (mname) {
            data.middleName = mname;
        },
        setLastName: function (lname) {
            data.lastName = lname;
        },
        setHeight: function (height) {
            data.height = height;
        },
        setWeight: function (weight) {
            data.weight = weight;
        },
        setMobileNo: function (mobNo) {
            data.mobileNo = mobNo;
        },
        setPrimaryMem: function (pmem) {
            data.primaryMember = pmem;
        },
        setMemberType: function (memType) {
            data.memberType = memType;
        },
        setCreated: function (created) {
            data.created = created;
        },
        setGender: function (gender) {
            data.gender.id = gender;
        },
        setBloodGroup: function (id, name) {
            data.bloodGroup.id = id;
            data.bloodGroup.name = name;
        },
        setContactRelationship: function (contRelationship) {
            data.contactRelationship = contRelationship;
        },
        setFamilyDrName: function (name) {
            data.familyDrName = name;
        },
        setFamilyDrMobNum: function (mno) {
            data.familyDrMobileNo = mno;
        },


        setAddress: function (addr, city, state, pin) {
            data.addressDto.address = addr;
            data.addressDto.city = city;
            data.addressDto.state = state;
            data.addressDto.pinCode = pin;
        },

        setContactInfo: function (cname, mno) {
            data.contactInfoDto.contactPersonName = cname;
            data.contactInfoDto.mobileNum = mno;
        },
        setMemPhotoPath: function (path) {
            data.memberPhotoPath = path;
        },
        setEnteredByPid: function (pid) {
            data.enteredByPId = pid;
        },
        getData: function () {
            return data;
        }
    };
}]); /* Profile Service Ends */
/* Profile Picture Service Begins */
app.factory("ProfilePicUpdateSvc", ["authenticationSvc", function (authenticationSvc) {
    var uInfo = authenticationSvc.getCookie('Earnfitglobals');
    var data = {
        id: uInfo.currentUser.memberId,
        content: ''
    };

    return {
        setPhoto: function (url) {
            data.content = url;
        },
        getData: function () {
            return data;
        }
    };
}]); /* Profile Picture Service Ends */



/* More INFO on challenge Service Begins */
/*
app.factory("MoreInfoOnChallengeSvc", [function () {
    var data = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : {};

    function setChallengeId(id) {
        data = id;
        localStorage.setItem("data", JSON.stringify(data));
    }

    function getData() {
        return data;
    }
    return {
        setChallengeId: setChallengeId,
        getData: getData
    };

}]);
*/

/* More INFO on challenge Service Ends */


app.factory("couponSvc", function () {
    var coudata = {
        cityid: '',
        catid: '',
        partnerid: '',
        coupid: '',
        couponNumber: '',
        pkgname: '',
        coupheader: '',
        coupdetails: '',
        tandc: '',
        imagepath: '',
        expDate: ''
    };

    return {
        setCityId: function (id) {
            coudata.cityid = id;
        },
        setCatId: function (id) {
            coudata.catid = id;
        },
        setCoupId: function (id) {
            coudata.coupid = id;
        },
        setPartnerId: function (id) {
            coudata.partnerid = id;
        },
        setPackageName: function (name) {
            coudata.pkgname = name;
        },
        setCouHeader: function (header) {
            coudata.coupheader = header;
        },
        setCouDetails: function (detail) {
            coudata.coupdetails = detail;
        },
        setTandC: function (tandc) {
            coudata.tandc = tandc;
        },
        setImagePath: function (path) {
            coudata.imagepath = path;
        },
        setCoupNum: function (counum) {
            coudata.couponNumber = counum;
        },
        setExpDate: function (dt) {
            coudata.expDate = dt;
        },
        getcoudata: function () {
            return coudata;
        }
    };
});

/* Coupon Services Ends Here */

/* Create Coupon Service Starts Here */
app.factory('UserCouponSvc', function () {
    var createCoupon = {
        id: '',
        partnerLogoPath: '',
        packageName: '',
        forName: '',
        forMobileNum: '',
        expDate: '',
        memberId: '',
        couponNumber: ''
    };
    return {
        setID: function (id) {
            createCoupon.id = id;
        },
        setPartnerLogoPath: function (path) {
            createCoupon.partnerLogoPath = path;
        },
        setPackageName: function (pkg) {
            createCoupon.packageName = pkg;
        },
        setForName: function (name) {
            createCoupon.forName = name;
        },
        setMobileNo: function (mno) {
            createCoupon.forMobileNum = mno;
        },
        setExpDate: function (exdate) {
            createCoupon.expDate = exdate;

        },
        setMemID: function (id) {
            createCoupon.memberId = id;
        },
        setCouponNo: function (cno) {
            createCoupon.couponNumber = cno;
        },
        getID: function () {
            return createCoupon.id;
        },
        getCreateCouponData: function () {
            return createCoupon;
        }

    };
});


/* Create Coupon Service Ends Here */

/* Coupon For MySelf Service Begins Here */
/*app.service('CouForMyself',['$http', '$q',function($http,$q){
    return {
        waitForNameAndMobile : function(){
          return   $q
        };
    }
}]);*/
/* Coupon For MySelf Service Ends Here */

/*app.factory("JoinSvc",function(){
    var data = {
        
    }
});*/

app.factory("OtpSvc", function () {
    var data = {

    };
    return {
        setOtp: function (otp) {
            data.otp = otp;
        },
        getData: function () {
            return data;
        }
    };

});

/**************** Activity Feed for Last 7 days ***********************/
app.factory("ActivityFeed", function ($http, authenticationSvc, EF_CONS) {
    var ActivityFeed = function () {
        this.userActivityFeedList = [];
        this.busy = false;
        this.after = '';
    };

    ActivityFeed.nextPage = function () {
        if (this.busy) return;
        this.busy = true;

        var uInfo = authenticationSvc.getCookie('Earnfitglobals');
        var config = {
            headers: {
                'h5cAuthToken': uInfo.currentUser.accessToken,
                'Accept': 'application/json;odata=verbose'
            }
        };

        $http.get(EF_CONS.DB_POINT + uInfo.currentUser.memberId, config).then(function (response) {
            var dbdata = response.data.singleResult.userActivityFeedList;
            /* alert(dbdata);*/
            for (var i = 0; i < dbdata.length; i++) {
                this.userActivityFeedList.push(dbdata[i].data);
            }
            this.after = "t3_" + this.userActivityFeedList[this.userActivityFeedList.length - 1].id;
            this.busy = false;
        }.bind(this), function (reason) {
            /*alert("Failed to hit dashboard: "+reason);*/
        });
    };

    return ActivityFeed;

});

/************** Create Community Service *************************/
/*app.factory("CreateCommunitySvc", function($http,authenticationSvc,EF_CONS ){
  var data = {
	  		challengeName:'',
			activityCategoryId:'',
			distance:'',
			startDate:'',
			endDate:'',
			selectedRewardId:'',
			minParticipant:'',
			referredNumbers:'',
			challengeType:'',
			rewardName:''
  };
	return {
        setChallengeName: function (challengeName) {data.challengeName = challengeName;},
        setActivityType: function (activityType) {data.activityCategoryId = activityType;},
        setDistance: function (distance) {data.distance = distance;},
        setStartDate: function (startDate) {data.startDate = startDate;},
        setEndDate: function (endDate) {data.endDate = endDate;},
        setParticipantRange: function (participantRange) {data.minParticipant = participantRange;},
        setRewardId: function (rewardId) {data.selectedRewardId = rewardId;},
        setReferredNumbers: function (referredNumbers) {data.referredNumbers = referredNumbers;},
		setRewardName: function(rewardName){data.rewardName = rewardName;},
		setChallengeType: function(challengeType){data.challengeType = challengeType;},
		
        getData: function () {
            return data;
        }


    };
    
});*/


/* Change Password Service */
app.factory("ChangePwdSvc", function () {
    var data = {
        userId: '',
        mobilNumber: '',
        emailId: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        otp: ''
    };
    return {
        setMemID: function (memid) {
            data.userId = memid;
        },
        setMobileNum: function (mno) {
            data.mobilNumber = mno;
        },
        setEmail: function (email) {
            data.emailId = email;
        },
        setOldPwd: function (oldpwd) {
            data.oldPassword = oldpwd;
        },
        setNewPwd: function (newpwd) {
            data.newPassword = newpwd;
        },
        setCnfrmPwd: function (cpwd) {
            data.confirmPassword = cpwd;
        },
        setOtp: function (otp) {
            data.otp = otp;
        },
        getData: function () {
            return data;
        }
    }
});

app.factory("ChngePwdSvc", function () {
    var data = {
        accountId: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    };
    return {
        setAccountId: function (accid) {
            data.accountId = accid;
        },
        setoldPwd: function (oldpwd) {
            data.oldPassword = oldpwd;
        },
        setnewPwd: function (newpwd) {
            data.newPassword = newpwd;
        },
        setcnfrmPwd: function (cpwd) {
            data.confirmPassword = cpwd;
        },
        getData: function () {
            return data;
        }
    }
});
app.factory("ForgotPwdSvc", function () {
    var data = {
        accountId: '',
        newPassword: '',
        otp: ''
    };
    return {
        setAccountId: function (acid) {
            data.accountId = acid;
        },
        setPassword: function (pwd) {
            data.newPassword = pwd;
        },
        setOtp: function (otp) {
            data.otp = otp;
        },
        getData: function () {
            return data;
        }
    }
});

/* Public Token Service */
app.factory("PublicTokenSvc", function () {
    var data = {
        publicToken: ''
    };
    return {
        setPublicToken: function (token) {
            data.publicToken = token;
        },
        getData: function () {
            return data;
        }
    }
});

app.factory("ChaIdForOffRuleSvc", function () {
    var data = {
        challengeId: ''
    };
    return {
        setChallengeId: function (cid) {
            data.challengeId = cid;
        },
        getData: function () {
            return data;
        }
    }
});


app.factory("CommunityCoverPicUpdateSvc", function () {
    var data = {
        challengeId: '',
        challengeImagePath: '',
        cahllengeImageData: ''
    };
    return {
        setChallengeId: function (id) {
            data.challengeId = id;
        },
        setChallengeImagePath: function (impath) {
            data.challengeImagePath = impath;
        },
        setChallengeImageData: function (imgData) {
            data.cahllengeImageData = imgData;
        },
        getData: function () {
            return data;
        }
    }
});




app.controller("OfficialRuleCtrl", ['$scope', '$uibModalInstance', '$http', 'EF_CONS', 'RegSvc', 'OtpSvc', 'ChaIdForOffRuleSvc', function ($scope, $uibModalInstance, $http, EF_CONS, RegSvc, OtpSvc, $localStorage, authenticationSvc, ChaIdForOffRuleSvc, chId) {
    setTimeout(function () {
        $scope.newval = $localStorage.chalidoff

        var challengeID = $scope.newval;
    }, 3000); //var chalState = $localStorage.chaldetail.challengeState;
    /*var uInfo = authenticationSvc.getCookie('Earnfitglobals');
	var config = {
        headers: {
            'h5cAuthToken': uInfo.currentUser.accessToken,
            'Accept': 'application/json;odata=verbose'
        } 
    };
	console.log("inside official rule controller");*/
    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    }
    // Service, for Single Challenge by Challenge ID
    /* $http.get(EF_CONS.CHALLENGE_BY_ID_POINT + challengeID, config).then(function (response) {
        $scope.singleChallengeDetail = response.data;
		console.log("Single Challenge Detail : ", $scope.singleChallengeDetail);
	});*/


}]);
app.controller('CommentController', function ($scope) {
    var post = $scope.post = {
        'likes': '',
        comments: [],
        author: ''
    };

    $scope.comment = {
        'body': '',
        'author': '',
        'poston': ''
    };
    $scope.addComment = function () {
        $scope.comment.poston = Date.now();
        post.comments.push($scope.comment);
        $scope.comment = {};

    };
});
app.controller('CommunityFeedController', function ($scope) {

    var post = $scope.post = {
        'likes': '',
        comments: [],
        author: ''
    };

    $scope.comment = {
        'body': '',
        'author': '',
        'poston': ''
    };
    $scope.addComment = function () {
        $scope.comment.poston = Date.now();
        post.comments.push($scope.comment);
        $scope.comment = {};

    };
});
/* --------------------------------------------------------------------------------------- */

app.directive('simpleChange', function simpleChangeDirective() {
    return {
        restrict: 'A',
        link: function (scope, el, attrs) {
            if (!attrs.simpleChange) {
                return;
            }

            el.on('change', function (e) {
                scope.$apply(function () {
                    scope.$eval(attrs.simpleChange, {
                        $event: e
                    });
                });
            });
        }
    };
});

app.controller('PicControl', function PicControl($scope, authenticationSvc, $http, EF_CONS, CommunityCoverPicUpdateSvc, $location) {
    var uInfo = authenticationSvc.getCookie('Earnfitglobals');
    var config = {
        headers: {
            'h5cAuthToken': uInfo.currentUser.accessToken,
            'Accept': 'application/json;odata=verbose'
        }
    };
    var ctrl = this;

    ctrl.fileChanged = function (event) {
        ctrl.file = event.target.files[0];
    };

    ctrl.handle = function handle(dataURL) {
        // Do your uploading here

        $scope.Valll = dataURL;


    };

    $scope.Cropped = function (obj) {
        debugger;

        var str = $scope.crop;
        var n = str.indexOf(",");
        var res = str.substring(n + 1, str.length);
        CommunityCoverPicUpdateSvc.setChallengeId(obj.challengeId);
        CommunityCoverPicUpdateSvc.setChallengeImagePath(obj.challengeImagePath);
        CommunityCoverPicUpdateSvc.setChallengeImageData(res);
        var data = CommunityCoverPicUpdateSvc.getData();

        $http.post(EF_CONS.COMMUNITY_COVER_PHOTO, data, config).then(function (response) {
            if (response.data.status == '$200') {
                debugger;
                var notify = {
                    type: "success",
                    title: "Success",
                    content: "Cover page got updated",
                    timeout: 2500
                };
                $scope.$emit('notify', notify);
                $scope.$emit('RELOAD');
            }
        }, function (rea) {
            if (rea.status == 403) {
                $location.path("/login");
            }

        });


    }
});
/* ---------------------------------------user profile ------------------------- */

app.directive('coverPicChange', function simpleChangeDirective() {
    return {
        restrict: 'A',
        link: function (scope, el, attrs) {
            if (!attrs.coverPicChange) {
                return;
            }

            el.on('change', function (e) {
                scope.$apply(function () {
                    scope.$eval(attrs.coverPicChange, {
                        $event: e
                    });
                });
            });
        }
    };
});

app.controller('CoverPicControl', function CoverPicControl($scope, MyCoverPic, authenticationSvc, $http, EF_CONS, $location, $localStorage, $route) {
    var uInfo = authenticationSvc.getCookie('Earnfitglobals');
    var config = {
        headers: {
            'h5cAuthToken': uInfo.currentUser.accessToken,
            'Accept': 'application/json;odata=verbose'
        }
    };
    var ctrl = this;

    ctrl.fileChanged = function (event) {
        ctrl.file = event.target.files[0];
    };

    ctrl.handle = function handle(dataURL) {
        // Do your uploading here

        $scope.Valll = dataURL;
        debugger;


    };

    $scope.Cropped = function (obj) {
        debugger;

        var str = $scope.crop;
        var n = str.indexOf(",");
        var res = str.substring(n + 1, str.length);
        MyCoverPic.setCoverFileName(obj.name);
        MyCoverPic.setPhotoContent(res);

        var data = MyCoverPic.getData();

        $http.post(EF_CONS.COVER_PHOTO + uInfo.currentUser.memberId, data, config).then(function (response) {
            if (response.data.status == '$200') {
                debugger;
                $scope.coverpic = response.data.singleResult + "?" + new Date().getTime();
                console.log("cover pic url", $scope.coverpic);
                var notify = {
                    type: "success",
                    title: "Success",
                    content: "Cover photo updated!!",
                    timeout: 2500
                };
                $scope.$emit('notify', notify);
                $scope.$emit('RELOAD');

            }
        }, function (rea) {
            if (rea.status == 403) {
                $location.path("/login");
            }

        });


    }
});

/*--------------------------------add friend request factory-------------------------------*/
app.factory("FRIENDREQUEST", ["authenticationSvc", function (authenticationSvc) {
    var uInfo = authenticationSvc.getCookie('Earnfitglobals');
    var data = {
        "id": null,
        "memberId": null,
        "reqToMeberId": null,
        "accepted": false,
        "created": null
    };
    return {
        SetId: function (ID) {
            data.id = ID;
        },
        SetMemId: function (MemId) {
            data.memberId = MemId;
        },
        SetReqToMemId: function (ReqToMemId) {
            data.reqToMeberId = ReqToMemId;
        },
        getData: function () {
            return data;
        }
    };
}]); /* add friend request factory */

/* -------------------------Update Profile factory--------------------------------------- */
app.factory("UPDATE_PROFILE", [function () {
    var data = {
        "memberId": "",
        "dob": "",
        "email": "",
        "firstName": "",
        "lastName": "",
        "mobileNo": "",
        "height": "",
        "hunit": "",
        "weight": "",
        "wunit": "",
        "gender": {
            "id": ""
        },
        "bloodGroup": {
            "id": 9,
            "name": "N/A"
        },
        "photo": null,
        "addressDto": {
            "source": "Self",
            "id": "",
            "state": "",
            "city": "",
            "area": "",
            "address": "",
            "pinCode": "",
            "countryCode": ""
        },
        "memberPhotoPath": "",
        "countryCode": 91,
        "primaryMember": true,
        "enteredByPId": "",
        "metric": "",
        "contactsDtoList": [],
        "schoolDetailDto": {
            "id": "",
            "schoolName": "",
            "schoolId": ""

        },
        "coverphotopath": null,
        "studentId": "",
        "grade": ""

    };
    return {
        setmemberId: function (a) {
            data.memberId = a;
        },

        setfirstName: function (b) {
            data.firstName = b;
        },
        setlastName: function (c) {
            data.lastName = c;
        },
        setmobileNo: function (d) {
            data.mobileNo = d;
        },
        setemail: function (e) {
            data.email = e;
        },
        setdob: function (i) {
            data.dob = i;
        },
        setgenderId: function (f) {
            data.gender = f;
        },
        setscholDtoId: function (g) {
            data.schoolDetailDto.id = g;
        },
        /* setschoolId:function(h) {data.schoolDetailDto.schoolId = h;}, */

        setParent: function (q) {
            data.contactsDtoList = q;
        },

        setaddressId: function (jj) {
            data.addressDto.id = jj;
        },
        setaddress: function (j) {
            data.addressDto.address = j;
        },
        setarea: function (k) {
            data.addressDto.area = k;
        },
        setcity: function (l) {
            data.addressDto.city = l;
        },
        setstate: function (m) {
            data.addressDto.state = m;
        },
        setpinCode: function (n) {
            data.addressDto.pinCode = n;
        },
        setcountryCode: function (nn) {
            data.addressDto.countryCode = nn;
        },

        setheight: function (o) {
            data.height = o;
        },
        setweight: function (p) {
            data.weight = p;
        },




        setMemPhotoPath: function (v) {
            data.memberPhotoPath = v;
        },
        setmetric: function (x) {
            data.metric = x;
        },
        setcoverPic: function (coverPic) {
            data.coverphotopath = coverPic
        },
        setHunit: function (htUnit) {
            data.hunit = htUnit
        },
        setWunit: function (wtUnit) {
            data.wunit = wtUnit
        },
        setEnterByPId: function (PId) {
            data.enteredByPId = PId
        },
        setstudentId: function (SID) {
            data.studentId = SID
        },
        setgrade: function (GRADE) {
            data.grade = GRADE
        },


        getData: function () {
            return data;
        }

    }
}]);
/* ---------------------------------------cover pic factory------------------- */
app.factory("MyCoverPic", ["authenticationSvc", function (authenticationSvc) {
    var uInfo = authenticationSvc.getCookie('Earnfitglobals');
    var data = {
        "fileName": "",
        "content": null
    };

    return {
        setCoverFileName: function (fileName) {
            data.fileName = fileName;
        },
        setPhotoContent: function (url) {
            data.content = url;
        },
        getData: function () {
            return data;
        }
    };
}]); /* Profile Picture Service Ends */
/*---------------------------------------user cover ctrl----------------------------------*/
app.controller('usercoverCtrl', function usercoverCtrl($scope, authenticationSvc, $http, EF_CONS, $location, $localStorage) {
    console.log("welcome to user cover ctrl");
    var uInfo = authenticationSvc.getCookie('Earnfitglobals');
    var config = {
        headers: {
            'h5cAuthToken': uInfo.currentUser.accessToken,
            'Accept': 'application/json;odata=verbose'
        }
    };

    $scope.userMemID = $localStorage.usersMemberId;
    console.log("user member id ", $scope.userMemID);
    $scope.userReadService = function () {
        debugger;
        $http.get(EF_CONS.PROFILE_READ_POINT + $scope.userMemID, config).then(function (response) {
            $scope.userData = response.data.singleResult;
            console.log("about user read service", $scope.userData);
            /* Data Binding to View */
            $scope.memphoto = $scope.userData.memberPhotoPath;
            $scope.userFname = $scope.userData.firstName;
            $scope.userLname = $scope.userData.lastName;
            $scope.userCoverPic = $scope.userData.coverphotopath;
            $scope.usermemidfromReadService = $scope.userData.memberId;
            $localStorage.FriendStatus = $scope.userData.friendReqStatus;
        });
    }
    $scope.userReadService();

    /* ------------------------------------------------------ */
    $scope.goToUserProfile = function (memId) {
        debugger;
        $localStorage.uSERmEMiD = memId;
        $location.path("/usersProfile");
    }
    $scope.goToAbtUser = function (memId) {
        debugger;
        $localStorage.uSERmEMiD = memId;
        $location.path("/aboutUsers");
    }
    $scope.goToUserAchievment = function (memId) {
        debugger;
        $localStorage.uSERmEMiD = memId;
        $location.path("/userAchivements");
    }
    $scope.goToUserFriends = function (memId) {
        debugger;
        $localStorage.uSERmEMiD = memId;
        $location.path("/userFriends");
    }
    /* ----------------------go to pending friend page ------------------------ */
    $scope.goToMyProfilePendingReq = function () {
        debugger;
        $location.path("/MyFriends");
    }
    /* -------------------------------myprofile friend list----------------------- */
    $scope.userProfileFriendList = function () {
        $http.get(EF_CONS.MY_FRIEND_LIST + $scope.userMemID + "/" + 0, config).then(function (res) {
            if (res.data.status == '$200') {
                $scope.userProfileFriendList = res.data.results;
                console.log("user Profile friend List ", $scope.userProfileFriendList);
                $scope.noOfUserFriends = $scope.userProfileFriendList.length;
                console.log("number of  friends on profile", $scope.noOfUserFriends);
            }
        }, function (reason) {
            $scope.$emit('clear');
            if (reason.status == 403) {
                var notify = {
                    type: "error",
                    title: "Error",
                    content: "Session got expired, please login again",
                    timeout: 2000
                };
                $scope.$emit('notify', notify);
                $location.path("/login");
            }
        });
    }
    $scope.userProfileFriendList();
    /* -------------------------------------------------BADGES_LIST ------------------------ */
    $scope.userProfileBadgesList = function () {
        debugger
        $http.get(EF_CONS.BADGES_LIST + $scope.userMemID, config).then(function (res) {
            if (res.data.status == '$200') {
                if (res.data.results != null) {
                    $scope.UserListOfBadges = res.data.results;
                    console.log("my profile  badges list..", $scope.UserListOfBadges);
                    $scope.noBadgesYet = true;
                } else {
                    $scope.noBadgesYet = false;
                }
            }
        }, function (reason) {
            $scope.$emit('clear');
            if (reason.status == 403) {
                var notify = {
                    type: "error",
                    title: "Error",
                    content: "Session got expired, please login again",
                    timeout: 2000
                };
                $scope.$emit('notify', notify);
                $location.path("/login");
            }
        });
    };
    $scope.userProfileBadgesList();
    /* ----------------------------make class active---------------- */

    if ($localStorage.RouteName == '/usersProfile') {
        $scope.UseProfileActive = "active";
    } else if ($localStorage.RouteName == '/aboutUsers') {
        $scope.aboutUseractive = "active";
    } else if ($localStorage.RouteName == '/userAchivements') {
        $scope.UserachiemntActive = "active";
    } else {
        $scope.userfriendsactive = "active"
    }
    /* ------------------------------------accept request ----------------------------- */
    $scope.fReqId = $localStorage.friendReqId;
    console.log("friend request id", $scope.fReqId);
    $scope.acceptFriendRequest = function (friendReqId, accept) {
        debugger;
        $http.get(EF_CONS.ACCEPT_REQUEST + accept + "/" + friendReqId, config).then(function (res) {
            $scope.pendingRequest = res.data.results;
            console.log(" friend request accepted ", $scope.pendingRequest);
            if (res.data.status == '$200') {
                $scope.showFriendBtn = true;

                var notify = {
                    type: "success",
                    title: "Success",
                    content: "friend request accepted",
                    timeout: 3000
                };
                $scope.$emit('notify', notify);
                setTimeout(function () {
                    $scope.$emit('RELOAD');
                }, 4000);
            } else {
                var notify = {
                    type: "error",
                    title: "Error",
                    content: "something went wrong",
                    timeout: 5000
                };
                $scope.$emit('notify', notify);
            }
        });

    }
    /* ------------------------------decline friend request--------------------- */
    $scope.declineFriendRequest = function (friendReqId, decline) {
        debugger;
        $http.get(EF_CONS.ACCEPT_REQUEST + decline + "/" + friendReqId, config).then(function (res) {
            $scope.pendingRequest = res.data.results;
            console.log(" friend request declined ", $scope.pendingRequest);
            if (res.data.status == '$200') {

                var notify = {
                    type: "success",
                    title: "Success",
                    content: res.data.httpHeaders.message,
                    timeout: 3000
                };
                $scope.$emit('notify', notify);
                setTimeout(function () {
                    $scope.$emit('RELOAD');
                }, 4000);
            } else {
                var notify = {
                    type: "error",
                    title: "Error",
                    content: "something went wrong",
                    timeout: 5000
                };
                $scope.$emit('notify', notify);
            }
        });

    }



});
app.run(function ($rootScope, $localStorage) {
    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
        var fullRoute = current.$$route.originalPath,
            routeParams = current.params,
            resolvedRoute;
        $localStorage.RouteName = fullRoute;
    });

});
/* ----------------------------focus comment box------------------------- */
app.directive('focusMe', function ($timeout) {
    return {
        scope: {
            trigger: '=focusMe'
        },
        link: function (scope, element) {
            scope.$watch('trigger', function (value) {
                if (value === true) {
                    //console.log('trigger',value);
                    //$timeout(function() {
                    element[0].focus();
                    scope.trigger = false;
                    //});
                }
            });
        }
    };
});
/* -----------------------------make firt letter capital-------------------- */
app.filter('titleCase', function () {
    return function (input) {
        input = input || '';
        return input.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
})

/* ----------------------------------------- */
/**
 * handles the behaviour of flipping card.
 */

app.directive('flippy', function () {
    return {
        restrict: 'EA',
        link: function ($scope, $elem, $attrs) {

            var options = {
                flipDuration: ($attrs.flipDuration) ? $attrs.flipDuration : 400,
                timingFunction: 'ease-in-out',
            };

            // setting flip options
            angular.forEach(['flippy-front', 'flippy-back'], function (name) {
                var el = $elem.find(name);
                if (el.length == 1) {
                    angular.forEach(['', '-ms-', '-webkit-'], function (prefix) {
                        angular.element(el[0]).css(prefix + 'transition', 'all ' + options.flipDuration / 2500 + 's ' + options.timingFunction);
                    });
                }
            });

            /**
             * behaviour for flipping effect.
             */
            $scope.flip = function () {
                $elem.toggleClass('flipped');
            }

        }
    };
});