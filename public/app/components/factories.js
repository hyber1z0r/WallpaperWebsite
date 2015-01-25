'use strict';

angular.module('hyber.factories', [])
    .factory('WallpaperFactory', function ($http) {
        var getWallpaper = function (id, callback) {
            $http.get('/api/wallpaper/' + id)
                .success(function (data) {
                    callback(null, data);
                })
                .error(function (err) {
                    callback(err);
                });
        };

        var getWallpapersWithRes = function (res, callback) {
            $http.get('/api/res/' + res)
                .success(function (data) {
                    callback(null, data);
                })
                .error(function (err) {
                    callback(err);
                });
        };

        var searchTags = function (tags, callback) {
            // tags should be an array of strings - should i check for that? No right?
            var search = '';
            for (var i = 0; i < tags.length; i++) {
                if (i === tags.length - 1) { // this is the last
                    search += tags[i];
                } else { // this is all others
                    search += tags[i] + ',';
                }
            }

            $http.get('/api/tags/' + search)
                .success(function (data) {
                    callback(null, data);
                })
                .error(function (err) {
                    callback(err);
                });
        };

        var searchCategory = function (categories, callback) {
            // categories should be an array of strings - should i check for that? No right?
            var search = '';
            for (var i = 0; i < categories.length; i++) {
                if (i === categories.length - 1) { // this is the last
                    search += categories[i];
                } else { // this is all others
                    search += categories[i] + ',';
                }
            }

            $http.get('/api/category/' + search)
                .success(function (data) {
                    callback(null, data);
                })
                .error(function (err) {
                    callback(err);
                });
        };

        var getSorted = function (sort, limit, callback) {
            $http.get('/api/sorted/' + sort + '/' + limit)
                .success(function (data) {
                    callback(null, data);
                })
                .error(function (err) {
                    callback(err);
                });
        };

        return {
            getWallpaper: getWallpaper,
            getWallpapersWithRes: getWallpapersWithRes,
            searchTags: searchTags,
            searchCategory: searchCategory,
            getSorted: getSorted
        };
    });

// TODO: Make rest of factory functions, that speaks with REST
// TODO: Make tests of factory functions!