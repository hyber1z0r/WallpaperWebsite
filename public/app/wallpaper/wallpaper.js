/**
 * Created by jakobgaardandersen on 27/01/15.
 */
angular.module('hyber.wallpaper', ['ngRoute']).controller('WallpaperCtrl', function ($scope, WallpaperFactory, $routeParams) {
    if ($routeParams.id) {
        WallpaperFactory.getWallpaper($routeParams.id)
            .success(function (data) {
                $scope.wallpaper = data;
            })
            .error(function (reason) {
                $scope.error = reason;
            })
    }
});