

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
        $scope.chart1 = true;
        $scope.chart2 = false;
        $scope.currentChart = 0;

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
        $scope.openShine = function(){

            $window.location.href = "/shinebright";


        }
        $scope.tap = function(){

            $scope.audio.play()
        }

        $scope.left= function(){

            $scope.audio.play()
            if($scope.currentChart>0){

                $scope.currentChart--

            }else{

               $scope.currentChart = 2;
          

            }

        }

        $scope.right= function(){

            $scope.audio.play()
            if($scope.currentChart<2){

                $scope.currentChart++

            }else{

               $scope.currentChart = 0;
          

            }
        }


    }]);


}());


