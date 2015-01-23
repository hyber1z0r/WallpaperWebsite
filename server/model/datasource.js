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
		} else if (wps.length == 0) {
			var e = new Error('Not found for given resolution');
			e.status = 404;
			callback(e);
		} else {
			callback(null, wps);
		}
	});
}

function searchTags(search, callback) {
	var cb = function (err, wps) {
		if (err) {
			callback(err);
		} else if (wps.length == 0) {
			var e = new Error('Not found for given resolution');
			e.status = 404;
			callback(e);
		} else {
			callback(null, wps);
		}
	};

	// TODO: Fix so it functions as a reg-exp, and not just assumes that all tags in db is stored lowerCase.
	if (_.isArray(search)) {
		wallpaper.find({
			tags: {
				$in: search.map(function (e) {
					return e.toLowerCase();
				})
			}
		}, cb);
	} else {
		wallpaper.find({tags: {$regex: new RegExp(search, 'i')}}, cb);
	}
}

function searchCategory(search, callback) {
	var cb = function (err, wps) {
		if (err) {
			callback(err);
		} else if (wps.length == 0) {
			var e = new Error('Not found for given resolution');
			e.status = 404;
			callback(e);
		} else {
			callback(null, wps);
		}
	};

	// TODO: Fix so it functions as a reg-exp, and not just assumes that all categories in db is stored lowerCase.
	if (_.isArray(search)) {
		wallpaper.find({
			category: {
				$in: search.map(function (e) {
					return e.toLowerCase();
				})
			}
		}, cb);
	} else {
		wallpaper.find({category: {$regex: new RegExp(search, 'i')}}, cb);
	}
}

function getLatest(limit, callback) {
	wallpaper.find({}, '', {sort: '-added', limit: limit || 20}, function (err, wps) {
		if (err) {
			callback(err);
		} else {
			callback(null, wps);
		}
	});
}

function getHottest(limit, callback) {
	wallpaper.find({}, '', {sort: '-views', limit: limit || 20}, function (err, wps) {
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
	searchTags: searchTags,
	getLatest: getLatest,
	searchCategory: searchCategory,
	getHottest: getHottest
};