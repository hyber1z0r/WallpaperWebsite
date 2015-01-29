'use strict';

angular.module('hyber.factories', [])
    .factory('WallpaperFactory', function ($http) {
        var getWallpaper = function (id) {
            return $http.get('/api/wallpaper/' + id);
        };

        var getWallpapersWithRes = function (res) {
            return $http.get('/api/res/' + res);
        };

        var searchTags = function (tags) {
            // tags should be an array of strings - should i check for that? No right?
            var search = '';
            for (var i = 0; i < tags.length; i++) {
                if (i === tags.length - 1) { // this is the last
                    search += tags[i];
                } else { // this is all others
                    search += tags[i] + ',';
                }
            }
            return $http.get('/api/tags/' + search);
        };

        var searchCategory = function (categories) {
            // categories should be an array of strings - should i check for that? No right?
            var search = '';
            for (var i = 0; i < categories.length; i++) {
                if (i === categories.length - 1) { // this is the last
                    search += categories[i];
                } else { // this is all others
                    search += categories[i] + ',';
                }
            }
            return $http.get('/api/category/' + search);
        };

        var getSorted = function (sort, limit) {
            return $http.get('/api/sorted/' + sort + '/' + limit);
        };

        var getRandom = function (limit) {
            return $http.get('/api/random/' + limit);
        };

        var getCategories = function () {
          return $http.get('/api/category');
        };

        return {
            getWallpaper: getWallpaper,
            getWallpapersWithRes: getWallpapersWithRes,
            searchTags: searchTags,
            searchCategory: searchCategory,
            getSorted: getSorted,
            getRandom: getRandom,
            getCategories: getCategories
        };
    });

// TODO: Make tests of factory functions!