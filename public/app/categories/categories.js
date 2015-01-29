/**
 * Created by jakobgaardandersen on 28/01/15.
 */
'use strict';

angular.module('hyber.categories', ['ngRoute']).controller('CategoriesCtrl', function ($scope, WallpaperFactory, ToolService) {
    WallpaperFactory.getCategories()
        .success(function (data) {
            $scope.categories = ToolService.arrayToGroups(data, 4); // split into three equal arrays.
        })
        .error(function (reason) {
            $scope.error = reason;
        });
});