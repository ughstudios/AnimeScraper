var express = require('express');
var router = express.Router();

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var animeList = [];
// Anime Site may change if it is not of use
//var animeSite = 'http://www.watch-anime.net/anime-list-all/';
var animeSite = 'http://anime-joy.tv/animelist';
// Maybe save all anime names to a text file for easier loading?

request(animeSite, function(err, resp, body) {
  if (!err && resp.statusCode == 200) {
    var $ = cheerio.load(body);
    /*$('a.anm_det_pop', '.pag_ctt_ara').each(function() {
      var animeTitle = $(this).attr('title');
      animeList.push(animeTitle);

    }); */
    $('a', '.animlist').each(function() {
        var animeTitle = $(this).html();
        animeList.push(animeTitle);
    })

    console.log(animeList);

  }
});



/* GET home page. */
router.get('/', function(req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log("Request from: " + ip);

  res.render('index', { title: 'Cartoonamon' ,
    animeList: animeList
  });
});

module.exports.animeList = animeList;
module.exports = router;
