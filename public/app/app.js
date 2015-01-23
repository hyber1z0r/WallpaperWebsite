'use strict';

// Declare app level module which depends on views, and components
angular.module('hyber', [
	'ngRoute',
	'hyber.controllers',
	'hyber.directives',
	'hyber.factories',
	'hyber.filters',
	'hyber.services',
	'hyber.home'
]).
	config(['$routeProvider', function ($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/home'});
	}]);
