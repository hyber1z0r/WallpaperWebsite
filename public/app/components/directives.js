'use strict';

angular.module('hyber.directives', []).
    directive('photoGallery', function () {
        return {
            restrict: 'AE',
            replace: 'true',
            scope: {
                wallpapers: '=wallpapers'
            },
            link: function (scope, element, attributes) {
                scope.overskrift = attributes.overskrift;
                scope.beskrivelse = attributes.beskrivelse;
                scope.fa = attributes.fa;
            },
            templateUrl: '/app/components/tpl/photogal.tpl.html'
        };
    });
