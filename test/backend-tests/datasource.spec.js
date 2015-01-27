/**
 * Created by jakobgaardandersen on 19/01/15.
 */
global.TEST_DATABASE = 'mongodb://localhost/hyber1z0r_test';
var should = require('should');
var app = require('../../server/app');
var mongoose = require('mongoose');
var wallpaper = mongoose.model('Wallpaper');
var data = require('./data.json').splice(0, 10);
var dataSource = require('../../server/model/datasource');

describe('dataSource', function () {
    beforeEach(function (done) {
        wallpaper.remove({}, function () {
            wallpaper.create(data, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    done();
                }
            });
        });
    });

    describe('getWallpaper', function () {
        it('Should return one wallpaper with given id', function (done) {
            var id = 2;
            dataSource.getWallpaper(id, function (err, data) {
                should.not.exist(err);
                data.id.toString().should.equal(id.toString());
                done();
            });
        });

        it('Should return an error when not found', function (done) {
            var id = 200;
            dataSource.getWallpaper(id, function (err, data) {
                err.message.should.equal('Not found for given id');
                err.status.should.equal(404);
                should.not.exist(data); // data is null when not found
                done();
            });
        });

        it('Should increase views by one each time you request it', function (done) {
            var id = 2;
            dataSource.getWallpaper(id, function (err, data) {
                should.not.exist(err);
                data.id.toString().should.equal(id.toString());
                data.views.should.equal(59);

                dataSource.getWallpaper(id, function (err, data) {
                    should.not.exist(err);
                    data.id.toString().should.equal(id.toString());
                    data.views.should.equal(60);
                    done();
                });
            });
        });
    });

    describe('getWpByRes', function () {
        it('Should return 8 wallpapers', function (done) {
            var res = '1920x1080';
            dataSource.getWpByRes(res, function (err, data) {
                should.not.exist(err);
                data.length.should.equal(8);
                done();
            });
        });

        it('Should return an error when not found', function (done) {
            var res = '1000x1000'; // obvious res that isn't supported!
            dataSource.getWpByRes(res, function (err, data) {
                err.message.should.equal('Not found for given resolution');
                err.status.should.equal(404);
                should.not.exist(data); // data is null when not found
                done();
            });
        });

        it('Should not be case sensitive (e.g. 1280x720 and 1280X720) and return 1', function (done) {
            var res = '1280X720';
            dataSource.getWpByRes(res, function (err, data) {
                should.not.exist(err);
                data.length.should.equal(1);
                done();
            });
        });

        it('Should return an error when input is nonsense/gibberish', function (done) {
            var res = 'Test string';
            dataSource.getWpByRes(res, function (err, data) {
                err.message.should.equal('Input is not a valid resolution');
                err.status.should.equal(400);
                should.not.exist(data); // data is null when not found
                done();
            });
        });
    });

    describe('searchField', function () {
        it('Should return 3 wallpapers when given a string in the correct format', function (done) {
            var search = 'flower'; // id: 1, 2, 8 has flower as a tag
            var field = 'tags';
            dataSource.searchField(search, field, function (err, wps) {
                should.not.exist(err);
                wps.length.should.equal(3);
                for (var i = 0; i < wps.length; i++) {
                    wps[i].tags.indexOf(search).should.not.equal(-1);
                }
                done();
            });
        });

        it('Should return 3 wallpapers when given a string in some weird format', function (done) {
            var search = 'fLoWEr'; // id: 1, 2, 8 has flower as a tag
            var field = 'tags';
            dataSource.searchField(search, field, function (err, wps) {
                should.not.exist(err);
                wps.length.should.equal(3);
                for (var i = 0; i < wps.length; i++) {
                    wps[i].tags.indexOf(search.toLowerCase()).should.not.equal(-1);
                }
                done();
            });
        });

        it('Should return 5 wallpapers when given an array of search strings in correct format', function (done) {
            var search = ['flower', 'outside']; // id: 1, 2, 8 has flower as a tag, 1, 5, 7 has outside. - No duplicates
            var field = 'tags';
            dataSource.searchField(search, field, function (err, wps) {
                should.not.exist(err);
                wps.length.should.equal(5);
                done();
            });
        });

        it('Should return 5 wallpapers when given an array of search strings in weird format', function (done) {
            var search = ['fLoWEr', 'OUTsidE']; // id: 1, 2, 8 has flower as a tag, 1, 5, 7 has outside. - No duplicates
            var field = 'tags';
            dataSource.searchField(search, field, function (err, wps) {
                should.not.exist(err);
                wps.length.should.equal(5);
                done();
            });
        });

        it('Should return 2 wallpapers when given a string in the correct format', function (done) {
            var search = 'general'; // id: 1, 2 has General as category
            var field = 'category';
            dataSource.searchField(search, field, function (err, wps) {
                should.not.exist(err);
                wps.length.should.equal(2);
                done();
            });
        });

        it('Should return 2 wallpapers when given a string in some weird format', function (done) {
            var search = 'geNeRAl'; // id: 1, 2 has General as category
            var field = 'category';
            dataSource.searchField(search, field, function (err, wps) {
                should.not.exist(err);
                wps.length.should.equal(2);
                done();
            });
        });

        it('Should return 4 wallpapers when given an array of search strings in correct format', function (done) {
            var search = ['pokémon', 'anime']; // id: 3, 4 has Pokémon as a category - 5, 6 has Anime
            var field = 'category';
            dataSource.searchField(search, field, function (err, wps) {
                should.not.exist(err);
                wps.length.should.equal(4);
                done();
            });
        });

        it('Should return 4 wallpapers when given an array of search strings in weird format', function (done) {
            var search = ['pOkÉMOn', 'aNIMe']; // id: 3, 4 has Pokémon as a category - 5, 6 has Anime
            var field = 'category';
            dataSource.searchField(search, field, function (err, wps) {
                should.not.exist(err);
                wps.length.should.equal(4);
                done();
            });
        });

        it('Should return status 500 when dev is an idiot', function (done) {
            var search = ['pOkÉMOn', 'aNIMe']; // id: 3, 4 has Pokémon as a category - 5, 6 has Anime
            var field = null;
            dataSource.searchField(search, field, function (err, wps) {
                err.message.should.equal('No search field given');
                err.status.should.equal(500);
                should.not.exist(wps); // data is null when not found
                done();
            });
        });
    });

    describe('getSorted', function () {
        it('Should return 5 sorted by added-date', function (done) {
            var limit = 5;
            var sort = '-added';
            dataSource.getSorted(sort, limit, function (err, wps) {
                wps.length.should.equal(5);
                for (var i = 0; i < wps.length - 1; i++) {
                    wps[i].added.should.be.greaterThan(wps[i + 1].added);
                }
                done();
            });
        });
        // TODO: Get more sample data to prove that this works! (Above 20 wallpapers)
        // Now it's just returning all -> 10 wallpapers
        it('Should return the 20 latest when no limit is given, sorted by newest first', function (done) {
            var limit = null;
            var sort = '-added';
            dataSource.getSorted(sort, limit, function (err, wps) {
                should.not.exist(err);
                wps.length.should.equal(10);
                for (var i = 0; i < wps.length - 1; i++) {
                    wps[i].added.should.be.greaterThan(wps[i + 1].added); // checking they are sorted
                }
                done();
            });
        });

        it('Should return the 5 hottest, sorted by highest first', function (done) {
            var limit = 5;
            var sort = '-views';
            dataSource.getSorted(sort, limit, function (err, wps) {
                should.not.exist(err);
                for (var i = 0; i < wps.length - 1; i++) {
                    wps[i].views.should.be.greaterThan(wps[i + 1].views); // checking they are sorted
                }
                wps[0].views.should.equal(83); // id: 10 is the highest and has 83 views
                wps[1].views.should.equal(60); // id: 9 is the seconds highest and has 60 views!
                wps.length.should.equal(5);
                done();
            });
        });

        // TODO: Get more sample data to prove that this works! (Above 20 wallpapers)
        // Now it's just returning all -> 10 wallpapers
        it('Should return the 20 hottest when no limit is given, sorted by highest first', function (done) {
            var limit = null;
            var sort = '-views';
            dataSource.getSorted(sort, limit, function (err, wps) {
                should.not.exist(err);
                wps.length.should.equal(10);
                for (var i = 0; i < wps.length - 1; i++) {
                    wps[i].views.should.be.greaterThan(wps[i + 1].views); // checking they are sorted
                }
                wps[0].views.should.equal(83); // id: 10 is the highest and has 83 views
                wps[1].views.should.equal(60); // id: 9 is the seconds highest and has 60 views!
                done();
            });
        });

        it('Should return status 400 when dev is an idiot', function (done) {
            var limit = 10;
            var sort = null;
            dataSource.getSorted(sort, limit, function (err, wps) {
                err.message.should.equal('No sort attribute given');
                err.status.should.equal(400);
                should.not.exist(wps); // data is null when not found
                done();
            });
        });
    });

    // How to test a random function? :pPpP
    describe('getRandom', function () {
        it('Should get 5 totally random wallpapers', function (done) {
            var limit = 5;
            dataSource.getRandom(limit, function (err, wps) {
                wps.length.should.equal(5);
                done();
            });
        });

        it('Should return 20 when no limit is entered', function (done) {
            var limit = null;
            dataSource.getRandom(limit, function (err, wps) {
                wps.length.should.equal(10);
                done();
            });
        });
    });
});