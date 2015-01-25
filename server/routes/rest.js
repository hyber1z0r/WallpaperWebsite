/**
 * Created by jakobgaardandersen on 19/01/15.
 */
var express = require('express');
var router = express.Router();
var dataSource = require('../model/datasource');

router.get('/:id', function (req, res, next) {
	var id = req.params.id;
	dataSource.getWallpaper(id, function (err, wallpaper) {
		if (err) {
			return next(err);
		}
		res.json(wallpaper);
	});
});

router.get('/res/:reso', function (req, res, next) {
	var resolution = req.params.reso;
	dataSource.getWpByRes(resolution, function (err, wallpapers) {
		if (err) {
			return next(err);
		}
		res.json(wallpapers);
	});
});

router.get('/tags/:queries', function (req, res, next) {
	var tags = req.params.queries.split(',');
	dataSource.searchTags(tags, function (err, wallpapers) {
		if (err) {
			return next(err);
		}
		res.json(wallpapers);
	});
});

router.get('/category/:queries', function (req, res, next) {
	var categories = req.params.queries.split(',');
	dataSource.searchCategory(categories, function (err, wallpapers) {
		if (err) {
			return next(err);
		}
		res.json(wallpapers);
	});
});

router.get('/sorted/:sort/:limit', function (req, res) {
	var sort = req.params.sort;
	var limit = req.params.limit;
	dataSource.getSorted(sort, limit, function (err, wallpapers) {
		if (err) {
			return next(err);
		}
		res.json(wallpapers);
	});
});

module.exports = router;