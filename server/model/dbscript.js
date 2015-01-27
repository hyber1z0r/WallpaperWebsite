/**
 * Created by jakobgaardandersen on 27/01/15.
 */
var app = require('../app');
var mongoose = require('mongoose');
var wallpaper = mongoose.model('Wallpaper');
var data = require('../../test/backend-tests/data.json');

function insertAllWps() {
    wallpaper.remove({}, function () { // empty the database -- very dangerous!
        console.log('Wallpaper collection: wiped!');
        wallpaper.create(data, function (err) {
            if(err) {
                console.log(err);
            } else {
                console.log('Data inserted');
                process.exit(0);
            }
        })
    });
}

insertAllWps();