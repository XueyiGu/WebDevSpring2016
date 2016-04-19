var express = require('express');
var app = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');

//console.log(process.env.SECRET);

process.env.PASSPORT_SECRET = 'this is a secret';

app.use(session({
    secret: process.env.PASSPORT_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// GET /style.css etc
app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

// default to a 'localhost' configuration:
var connection_string = 'mongodb://localhost/xueyigu';

// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connection_string);
console.log(mongoose);

require("./public/assignment/server/app.js")(app, mongoose, db, passport, LocalStrategy);

//project

// Request API access: http://www.yelp.com/developers/getting_started/api_access
var Yelp = require('yelp');

var yelp = new Yelp({
    consumer_key: '3f9JGN7LavtyadBI2xDN2g',
    consumer_secret: 'NB2z7FX6lVzmUh-rJ6zZGJt3i4c',
    token: 'EaAFObDQnbWIVrmgeQ1Fh6h3Trk9mt-I',
    token_secret: 'nqziy8fbib4_31d9sGH7EgvfVU4',
});
require("./public/project/server/app.js")(app, yelp);

//yelp.search({ term: 'food', location: 'Seattle' })
    //.then(function (data) {
    //    console.log(data);
    //})
    //.catch(function (err) {
    //    console.error(err);
    //});



app.listen(port, ipaddress);