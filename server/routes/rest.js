/**
 * Created by jakobgaardandersen on 19/01/15.
 */
var express = require('express');
var router = express.Router();
var dataSource = require('../model/datasource');

router.get('/wallpaper/:id', function (req, res, next) {
	var id = req.params.id;
	dataSource.getWallpaper(id, function (err, wallpaper) {
		if (err) {
			return next(err);
		}
		res.json(wallpaper);
	});
});

router.get('/wallpaper/res/:reso', function (req, res, next) {
	var resolution = req.params.reso;
	dataSource.getWpByRes(resolution, function (err, wallpapers) {
		if (err) {
			return next(err);
		}
		res.json(wallpapers);
	});
});

router.get('/wallpaper/tags/:queries', function (req, res, next) {
	var tags = req.params.queries.split(',');
	dataSource.searchTags(tags, function (err, wallpapers) {
		if (err) {
			return next(err);
		}
		res.json(wallpapers);
	});
});

router.get('/wallpaper/category/:queries', function (req, res, next) {
	var categories = req.params.queries.split(',');
	dataSource.searchCategory(categories, function (err, wallpapers) {
		if (err) {
			return next(err);
		}
		res.json(wallpapers);
	});
});

router.get('/wallpaper/latest/:limit', function (req, res, next) {
	var limit = req.params.limit;
	dataSource.getLatest(limit, function (err, wallpapers) {
		if (err) {
			return next(err);
		}
		res.json(wallpapers);
	});
});

router.get('/wallpaper/hottest/:limit', function (req, res, next) {
	var limit = req.params.limit;
	dataSource.getHottest(limit, function (err, wallpapers) {
		if (err) {
			return next(err);
		}
		res.json(wallpapers);
	});
});

module.exports = router;