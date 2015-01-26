var mongoose = require('mongoose');
var randomPlugin = require('mongoose-simple-random');
var Schema = mongoose.Schema;
var dbURI = 'mongodb://localhost/hyber1z0r';

//This is set by the backend tests
if (typeof global.TEST_DATABASE !== 'undefined') {
    dbURI = global.TEST_DATABASE;
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI + '\n');
});

mongoose.connection.on('error', function (err) {
    global.mongo_error = "Not Connected to the Database";
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

/* Wallpaper schema */
var wallpaperSchema = new Schema({
    _id: {type: Number, unique: 'ID not unique'},
    image: {type: String/*, required: 'Image required'*/}, //base64
    thumbnail: {type: String},
    resolution: {type: String, required: 'Resolution not entered.'},
    category: {type: String, default: 'General'},
    tags: {type: [String]},
    views: {type: Number, default: 0},
    added: {type: Date, default: Date.now()}
});

wallpaperSchema.plugin(randomPlugin);

mongoose.model('Wallpaper', wallpaperSchema, 'wallpapers');


