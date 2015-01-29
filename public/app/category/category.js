/**
 * Created by jakobgaardandersen on 29/01/15.
 */
'use strict';

angular.module('hyber.category', ['ngRoute']).controller('CategoryCtrl', function ($scope, WallpaperFactory, $routeParams) {
    if ($routeParams.cat) {
        $scope.category = $routeParams.cat;
        WallpaperFactory.searchCategory($routeParams.cat)
            .success(function (data) {
                $scope.wallpaperData = data;
            })
            .error(function (reason) {
                $scope.error = reason;
            });
    }
});