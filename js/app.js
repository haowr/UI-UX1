

(function () {


    var app = angular.module('store', [ 'appRoutes']);



    app.config(function ($httpProvider) {

    });

    app.controller('mainCtrl', ['$http', '$scope', '$timeout',  '$interval', '$window', function ($http, $scope, $timeout, $interval, $window) {

        $scope.chapelOpen = true;
        $scope.soundOpen = false;
        $scope.shopOpen = false;
        $scope.lightsPageOpen = false;
        $scope.contactPageOpen = false;
        $scope.zoomPageOpen = false;
        $scope.volumeOn = false;
        $scope.zoomPageOpen = false;
        $scope.fadeoutleft = false
        $scope.fadeoutright = false;
        $scope.fadeinleft = false;
        $scope.fadeinright = false;

        $scope.fadein    =true

        $scope.audio = new Audio('../audio/ui_tap-variant-01.wav')


        $scope.contactPageOpen  = false;
        $scope.soundPageOpen    =   false;
        $scope.lightPageOpen    = false;
        $scope.homePageOpen     = true;

        $scope.openContactPage     = function(){

                if(!$scope.contactPageOpen){

                    $scope.contactPageOpen  = true;
                    $scope.homePageOpen = false;
                    $scope.soundOpen        = false;
                    $scope.soundPageOpen = false;
                    $scope.lightsPageOpen    = false;

                }

        }
        $scope.left= function(){

            $scope.audio.play()
            if(!$scope.fadeinleft){

                $scope.fadeinleft = false
                $scope.fadeoutleft = true;

            }else{
                $scope.fadeoutleft = false;
                $scope.fadeoutright = true

            }

        }
        $scope.right= function(){

            $scope.audio.play()
            if(!$scope.fadeoutright){

                $scope.fadeoutright = true
                $scope.fadeoutleft = false;

            }else{

                $scope.fadeinright = true;
            }
        }


    }]);


}());


