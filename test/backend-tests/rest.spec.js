/**
 * Created by jakobgaardandersen on 19/01/15.
 */
global.TEST_DATABASE = 'mongodb://localhost/hyber1z0r_test';
var should = require('should');
var app = require('../../server/app');
var supertest = require('supertest');

describe('REST API', function () {
    describe('/:id', function () {
        it('Should return 1 wallpaper with id 2', function (done) {
            supertest(app)
                .get('/api/wallpaper/' + 2)
                .end(function (err, res) {
                    should.not.exist(err);
                    var wallpaper = JSON.parse(res.text);
                    wallpaper._id.toString().should.equal('2');
                    done();
                });
        });

        it('Should return 404 when requested id does not exist', function (done) {
            supertest(app)
                .get('/api/wallpaper/' + 19999)
                .expect(404, done);
        });

        it('Should return 400 when requested id is not an id', function (done) {
            var id = 'notanid';
            supertest(app)
                .get('/api/wallpaper/' + id)
                .expect(400, done);
        });

        it('Should return 404 when nothing is requested, because "nothing" was not found', function (done) {
            supertest(app)
                .get('/api/wallpaper/')
                .expect(404, done);
        });
    });

    describe('/res/:res', function () {
        it('Should return 8 wallpapers with the given resolution', function (done) {
            var resolution = '1920x1080';
            supertest(app)
                .get('/api/res/' + resolution)
                .end(function (err, res) {
                    var wallpapers = JSON.parse(res.text);
                    wallpapers.length.should.equal(7);
                    for (var i = 0; i < wallpapers.length; i++) {
                        wallpapers[i].resolution.should.equal(resolution);
                    }
                    done();
                });
        });

        it('Should return 8 wallpapers with the given resolution (case insensitive)', function (done) {
            var resolution = '1920X1080';
            supertest(app)
                .get('/api/res/' + resolution)
                .end(function (err, res) {
                    var wallpapers = JSON.parse(res.text);
                    wallpapers.length.should.equal(7);
                    for (var i = 0; i < wallpapers.length; i++) {
                        wallpapers[i].resolution.should.equal(resolution.toLowerCase()); // resolutions is stored with a small x
                    }
                    done();
                });
        });

        it('Should return status 400 when resolution is not in valid format', function (done) {
            var resolution = '1280x';
            supertest(app)
                .get('/api/res/' + resolution)
                .expect(400, done);
        });

        it('Should return status 404 when the resolution is not found', function (done) {
            var resolution = '1920x44000';
            supertest(app)
                .get('/api/res/' + resolution)
                .expect(404, done);
        });
    });

    describe('/tags/:queries', function () {
        it('Should return 3 wallpapers with the right tags', function (done) {
            var tag = 'flower'; // id: 1, 2, 8 has flower as a tag
            supertest(app)
                .get('/api/tags/' + tag)
                .end(function (err, res) {
                    var wallpapers = JSON.parse(res.text);
                    wallpapers.length.should.equal(3);
                    for (var i = 0; i < wallpapers.length; i++) {
                        wallpapers[i].tags.indexOf(tag).should.not.equal(-1);
                    }
                    done();
                });
        });

        it('Should return 3 wallpapers with the right tags wierd format', function (done) {
            var tag = 'flOwEr'; // id: 1, 2, 8 has flower as a tag
            supertest(app)
                .get('/api/tags/' + tag)
                .end(function (err, res) {
                    var wallpapers = JSON.parse(res.text);
                    wallpapers.length.should.equal(3);
                    for (var i = 0; i < wallpapers.length; i++) {
                        wallpapers[i].tags.indexOf(tag.toLowerCase()).should.not.equal(-1);
                    }
                    done();
                });
        });

        it('Should return 5 wallpapers when given an array of search strings in correct format', function (done) {
            var tags = 'flower,outside';
            supertest(app)
                .get('/api/tags/' + tags)
                .end(function (err, res) {
                    var wallpapers = JSON.parse(res.text);
                    wallpapers.length.should.equal(5);
                    done();
                });
        });

        it('Should return 400 when no tag is entered', function (done) {
            supertest(app)
                .get('/api/tags/')
                .expect(404, done);
        });

        it('Should return 404 when tag is not found', function (done) {
            var tag = 'tagThatDoesNotExist';
            supertest(app)
                .get('/api/tags/' + tag)
                .expect(404, done);
        });
    });

    describe('/category/:queries', function () {
        it('Should return 2 wallpapers with the right category', function (done) {
            var category = 'general'; // id: 1, 2 has general as category
            supertest(app)
                .get('/api/category/' + category)
                .end(function (err, res) {
                    var wallpapers = JSON.parse(res.text);
                    wallpapers.length.should.equal(2);
                    for (var i = 0; i < wallpapers.length; i++) {
                        wallpapers[i].category.should.equal(category.toLowerCase());
                    }
                    done();
                });
        });

        it('Should return 2 wallpapers with the right tags wierd format', function (done) {
            var category = 'gEneRAl'; // id: 1, 2, 8 has flower as a tag
            supertest(app)
                .get('/api/category/' + category)
                .end(function (err, res) {
                    var wallpapers = JSON.parse(res.text);
                    wallpapers.length.should.equal(2);
                    for (var i = 0; i < wallpapers.length; i++) {
                        wallpapers[i].category.should.equal(category.toLowerCase());
                    }
                    done();
                });
        });

        it('Should return 4 wallpapers when given an array of search strings in correct format', function (done) {
            var categories = 'pokémon,anime';
            supertest(app)
                .get('/api/category/' + categories)
                .end(function (err, res) {
                    var wallpapers = JSON.parse(res.text);
                    wallpapers.length.should.equal(4);
                    done();
                });
        });

        it('Should return 404 when no category is entered', function (done) {
            supertest(app)
                .get('/api/category/')
                .expect(404, done);
        });

        it('Should return 404 when category is not found', function (done) {
            var category = 'unrealisticCategory';
            supertest(app)
                .get('/api/category/' + category)
                .expect(404, done);
        });
    });

    describe('/sorted/:sort/:limit', function () {
        it('Should return 5 sorted by added-date', function (done) {
            var limit = 5;
            var sort = '-added';
            supertest(app)
                .get('/api/sorted/' + sort + '/' + limit)
                .end(function (err, res) {
                    var wallpapers = JSON.parse(res.text);
                    wallpapers.length.should.equal(5);
                    for (var i = 0; i < wallpapers.length - 1; i++) {
                        wallpapers[i].added.should.be.greaterThan(wallpapers[i + 1].added);
                    }
                    done();
                });
        });


        it('Should return 20 when no limit is entered, sorted by added-date', function (done) {
            var limit = null;
            var sort = '-added';
            supertest(app)
                .get('/api/sorted/' + sort + '/' + limit)
                .end(function (err, res) {
                    var wallpapers = JSON.parse(res.text);
                    wallpapers.length.should.equal(20);
                    for (var i = 0; i < wallpapers.length - 1; i++) {
                        wallpapers[i].added.should.be.greaterThan(wallpapers[i + 1].added);
                    }
                    done();
                });
        });

        it('Should return 20 when gibberish is entered, sorted by added-date', function (done) {
            var gibber = 'asdadaDASDaadakj231';
            var sort = '-added';
            supertest(app)
                .get('/api/sorted/' + sort + '/' + gibber)
                .end(function (err, res) {
                    var wallpapers = JSON.parse(res.text);
                    wallpapers.length.should.equal(20);
                    for (var i = 0; i < wallpapers.length - 1; i++) {
                        wallpapers[i].added.should.be.greaterThan(wallpapers[i + 1].added);
                    }
                    done();
                });
        });

        it('Should return 5 sorted by views', function (done) {
            var limit = 5;
            var sort = '-views';
            supertest(app)
                .get('/api/sorted/' + sort + '/' + limit)
                .end(function (err, res) {
                    var wallpapers = JSON.parse(res.text);
                    wallpapers.length.should.equal(5);
                    for (var i = 0; i < wallpapers.length - 1; i++) {
                        wallpapers[i].views.should.be.greaterThan(wallpapers[i + 1].views);
                    }
                    done();
                });
        });


        it('Should return 20 when no limit is entered, sorted by views', function (done) {
            var limit = null;
            var sort = '-views';
            supertest(app)
                .get('/api/sorted/' + sort + '/' + limit)
                .end(function (err, res) {
                    var wallpapers = JSON.parse(res.text);
                    wallpapers.length.should.equal(20);
                    for (var i = 0; i < wallpapers.length - 1; i++) {
                        wallpapers[i].views.should.be.greaterThan(wallpapers[i + 1].views);
                    }
                    done();
                });
        });

        it('Should return 20 when gibberish is entered, sorted by views', function (done) {
            var gibber = 'asdadaDASDaadakj231';
            var sort = '-views';
            supertest(app)
                .get('/api/sorted/' + sort + '/' + gibber)
                .end(function (err, res) {
                    var wallpapers = JSON.parse(res.text);
                    wallpapers.length.should.equal(20);
                    for (var i = 0; i < wallpapers.length - 1; i++) {
                        wallpapers[i].views.should.be.greaterThan(wallpapers[i + 1].views);
                    }
                    done();
                });
        });

        it('Should return 400 when no sort is given', function (done) {
            var limit = 5;
            var sort = null;
            supertest(app)
                .get('/api/sorted/' + sort + '/' + limit)
                .expect(400, done);
        });
    });
});