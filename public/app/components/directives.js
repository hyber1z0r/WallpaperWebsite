'use strict';

/* Directives */

angular.module('hyber.directives', []).
  directive('photoGallery', function () {
    return {
      restrict: 'AE',
      replace: 'true',
      templateUrl: '/app/components/tpl/photogal.html'
    };
  });
