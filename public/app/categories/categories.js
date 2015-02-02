/**
 * Created by jakobgaardandersen on 28/01/15.
 */
'use strict';

angular.module('hyber.categories', ['ngRoute']).controller('CategoriesCtrl', function ($scope, WallpaperFactory, ToolService, categoryCache) {

    var fetchCategories = function () {
        WallpaperFactory.getCategories()
            .success(function (data) {
                $scope.categories = ToolService.arrayToGroups(data, 4); // split into three equal arrays.
                categoryCache.put('categories', $scope.categories);
            })
            .error(function (reason) {
                $scope.error = reason;
            });
    };

    var cache = categoryCache.get('categories');
    if(cache) {
        $scope.categories = cache;
    } else {
        fetchCategories();
    }
});