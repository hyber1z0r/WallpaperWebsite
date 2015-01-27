'use strict';

// Declare app level module which depends on views, and components
angular.module('hyber', [
    'ngRoute',
    'ngAnimate',
    'mgcrea.ngStrap',
    'ui.bootstrap',
    'hyber.controllers',
    'hyber.directives',
    'hyber.factories',
    'hyber.filters',
    'hyber.services',
    'hyber.home',
    'hyber.latest',
    'hyber.random',
    'hyber.search',
    'hyber.wallpaper'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'app/home/home.html',
                controller: 'HomeCtrl'
            })
            .when('/latest', {
                templateUrl: 'app/latest/latest.html',
                controller: 'LatestCtrl'
            })
            .when('/random', {
                templateUrl: 'app/random/random.html',
                controller: 'RandomCtrl'
            })
            .when('/search', {
                templateUrl: 'app/search/search.html',
                controller: 'SearchCtrl'
            })
            .when('/wallpaper/:id', {
                templateUrl: 'app/wallpaper/wallpaper.html',
                controller: 'WallpaperCtrl'
            })
            .otherwise({redirectTo: '/home'});
    }]);
