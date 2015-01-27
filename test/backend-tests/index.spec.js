/**
 * Created by jakobgaardandersen on 27/01/15.
 */
var should = require('should');
var app = require('../../server/app');
var supertest = require('supertest');

describe('Index', function () {
    describe('/', function () {
        it('Should return angular application', function (done) {
            supertest(app)
                .get('/')
                .expect(200)
                .expect('Content-Type', 'text/html; charset=UTF-8')
                .end(function (err, res) {
                    var html = res.text;
                    var text = html.toString();
                    var regex = new RegExp('ng-app="hyber"');
                    regex.test(text).should.equal(true);
                    done();
                })
        })
    });
});