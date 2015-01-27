/**
 * Created by jakobgaardandersen on 27/01/15.
 */
angular.module('hyber.wallpaper', ['ngRoute']).controller('WallpaperCtrl', function ($scope, WallpaperFactory, $routeParams) {
    if ($routeParams.id) {
        WallpaperFactory.getWallpaper($routeParams.id, function (err, wallpaper) {
            if (err) {
                console.log(err);
            } else {
                $scope.wallpaper = wallpaper;
            }
        });
    }
});