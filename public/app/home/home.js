'use strict';

angular.module('hyber.home', ['ngRoute'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/home', {
			templateUrl: 'app/home/home.html',
			controller: 'HomeCtrl'
		});
	}])
	.controller('HomeCtrl', function ($scope, WallpaperFactory) {
		WallpaperFactory.getWallpaper(1, function (err, wallpaper) {
			if (err) {
				console.log(err);
			} else {
				$scope.wallpaper = wallpaper;
			}
		})
	});