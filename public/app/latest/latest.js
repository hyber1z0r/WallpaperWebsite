/**
 * Created by jakobgaardandersen on 25/01/15.
 */
'use strict';

angular.module('hyber.latest', ['ngRoute']).controller('LatestCtrl', function ($scope, WallpaperFactory) {
    var limit = 20;
    var sort = '-added';
    WallpaperFactory.getSorted(sort, limit)
        .success(function (data) {
            $scope.wallpaperData = data;
        })
        .error(function (reason) {
            $scope.error = reason;
        })
});