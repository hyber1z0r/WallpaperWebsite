/**
 * Created by jakobgaardandersen on 19/01/15.
 */
var mongoose = require('mongoose');
var wallpaper = mongoose.model('Wallpaper');
var _ = require('underscore');

/* returns wallpaper by id, and counts views one up! */
function getWallpaper(id, callback) {
    // this catches all wrong inputs, such as 'test' instead of e.g '1';
    if (isNaN(Number(id))) {
        var error = new Error('Input was not an ID');
        error.status = 400;
        return callback(error);
    }
    wallpaper.findById(id, function (err, wp) {
        if (err) {
            console.log(err);
            callback(err);
        }
        else if (!wp) {
            var e = new Error('Not found for given id');
            e.status = 404;
            callback(e);
        } else {
            wp.views++;
            wp.save(function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, wp);
                }
            });
        }
    });
}

function getWpByRes(res, callback) {
    var reg = new RegExp('[0-9]{1,4}x[0-9]{1,4}', 'i');
    if (!reg.test(res)) {
        var e = new Error('Input is not a valid resolution');
        e.status = 400;
        return callback(e);
    }
    wallpaper.find({resolution: {$regex: new RegExp(res, 'i')}}, function (err, wps) {
        if (err) {
            callback(err);
        } else if (wps.length === 0) {
            var e = new Error('Not found for given resolution');
            e.status = 404;
            callback(e);
        } else {
            callback(null, wps);
        }
    });
}


function searchField(search, field, callback) {
    var query = {};
    var e;
    if (!field) {
        var error = new Error('No search field given');
        error.status = 500;
        return callback(error);
    }
    switch (field.toUpperCase()) {
        case 'CATEGORY':
            if (_.isArray(search)) {
                query = {category: {$in: search.map(function (e) {return e.toLowerCase();})}};
            } else {
                query = {category: {$regex: new RegExp(search, 'i')}};
            }
            e = new Error('Not found for given category');
            break;
        case 'TAGS':
            if (_.isArray(search)) {
                query = {tags: {$in: search.map(function (e) {return e.toLowerCase();})}};
            } else {
                query = {tags: {$regex: new RegExp(search, 'i')}};
            }
            e = new Error('Not found for given tag(s)');
            break;
    }
    e.status = 404;
    wallpaper.find(query, function (err, wps) {
        if (err) {
            callback(err);
        } else if (wps.length === 0) {
            callback(e);
        } else {
            callback(null, wps);
        }
    });
}

// sort by views, added date or what you want
function getSorted(sort, limit, callback) {
    if (!sort) {
        var e = new Error('No sort attribute given');
        e.status = 500;
        return callback(e);
    }
    wallpaper.find({}, '', {sort: sort, limit: limit || 20}, function (err, wps) {
        if (err) {
            callback(err);
        } else {
            callback(null, wps);
        }
    });
}

function getRandom(limit, callback) {
    wallpaper.findRandom({}, '', {limit: limit || 20}, function (err, wps) {
        if (err) {
            callback(err);
        } else {
            callback(null, wps);
        }
    });
}

// TODO: GETS ARE MADE, NOW WE NEED SOME ADDING, UPDATING AND DELETING!

module.exports = {
    getWallpaper: getWallpaper,
    getWpByRes: getWpByRes,
    searchField: searchField,
    getSorted: getSorted,
    getRandom: getRandom
};