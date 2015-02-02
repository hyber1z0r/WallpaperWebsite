'use strict';

/* Services */

// Demonstrate how to register services
angular.module('hyber.services', [])
    .service('ToolService', [function () {
        this.arrayToGroups = function(source, groups) {

            //This is the array of groups to return:
            var grouped = [];

            //work out the size of the group
            var groupSize = Math.ceil(source.length / groups);

            //clone the source array so we can safely splice it
            var queue = source;

            for (var r = 0; r < groups; r++) {
                //Grab the next groupful from the queue, and append it to the array of groups
                grouped.push(queue.splice(0, groupSize));
            }
            return grouped;
        };
    }]);
