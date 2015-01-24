/**
 * Created by jakobgaardandersen on 25/01/15.
 */
'use strict';

angular.module('hyber.random', ['ngRoute'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/random', {
			templateUrl: 'app/random/random.html',
			controller: 'RandomCtrl'
		});
	}])
	.controller('RandomCtrl', function ($scope, WallpaperFactory) {

	});