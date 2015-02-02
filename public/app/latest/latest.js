/**
 * Created by jakobgaardandersen on 25/01/15.
 */
'use strict';

angular.module('hyber.latest', ['ngRoute']).controller('LatestCtrl', function ($scope, WallpaperFactory, latestCache) {

    var fetchImages = function () {
        var limit = 20;
        var sort = '-added';
        WallpaperFactory.getSorted(sort, limit)
            .success(function (data) {
                $scope.wallpaperData = data;
                latestCache.put('latest', data);
            })
            .error(function (reason) {
                $scope.error = reason;
            });
    };

    var cache = latestCache.get('latest');
    if(cache) {
        $scope.wallpaperData = cache;
    } else {
        fetchImages();
    }
});