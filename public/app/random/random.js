/**
 * Created by jakobgaardandersen on 25/01/15.
 */
'use strict';

angular.module('hyber.random', ['ngRoute']).controller('RandomCtrl', function ($scope, WallpaperFactory) {
    var limit = 20;
    WallpaperFactory.getRandom(limit)
        .success(function (data) {
            $scope.wallpaperData = data;
        })
        .error(function (reason) {
            $scope.error = reason;
        })
});