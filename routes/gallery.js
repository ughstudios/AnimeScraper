var express = require('express');
var router = express.Router();

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');



/* GET home page. */
router.get('/', function(req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("Request from: " + ip);

    res.render('gallery', { title: 'Cartoonamon' ,
    });
});

module.exports = router;
