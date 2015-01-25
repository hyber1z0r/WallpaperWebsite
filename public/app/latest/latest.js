/**
 * Created by jakobgaardandersen on 25/01/15.
 */
'use strict';

angular.module('hyber.latest', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/latest', {
            templateUrl: 'app/latest/latest.html',
            controller: 'LatestCtrl'
        });
    }])
    .controller('LatestCtrl', function ($scope, WallpaperFactory) {
        $scope.limit = 20;
        WallpaperFactory.getLatest($scope.limit, function (err, wallpapers) {
            if (err) {
                console.log(err);
            } else {
                $scope.wallpapers = wallpapers;
                console.log(wallpapers);
            }
        });
    });