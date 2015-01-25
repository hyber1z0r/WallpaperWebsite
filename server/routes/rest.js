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

router.get('/res/:resolution', function (req, res, next) {
    var resolution = req.params.resolution;
    dataSource.getWpByRes(resolution, function (err, wallpapers) {
        if (err) {
            return next(err);
        }
        res.json(wallpapers);
    });
});

router.get('/tags/:tag', function (req, res, next) {
    var tags = req.params.tag.split(',');
    dataSource.searchField(tags, 'tags', function (err, wallpapers) {
        if (err) {
            return next(err);
        }
        res.json(wallpapers);
    });
});

router.get('/category/:cat', function (req, res, next) {
    var categories = req.params.cat.split(',');
    dataSource.searchField(categories, 'category', function (err, wallpapers) {
        if (err) {
            return next(err);
        }
        res.json(wallpapers);
    });
});

router.get('/sorted/:sort/:limit', function (req, res, next) {
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