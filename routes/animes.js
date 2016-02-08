var express = require('express');
var router = express.Router();

var index = require('./index');

var request = require('request');
var cheerio = require('cheerio');

var boxsetImage = null;
var description = null;

var animeData = null;
var episodes = [];
var animeEmbeds = [];

// iteration of episodes
var iteration = 1;

router.get('/*', function(req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("Request from: " + ip);



    if (req.url === '/') {
        res.redirect('/');
    }


    var animeUrl = req.url;
    // kissanime keeps returning a 503 because of their CDN thingy which seems to be blocking my scraping
    var kissAnimeGrab = 'https://kissanime.to/Anime' + animeUrl;
    var animeJoyGrab = 'http://anime-joy.tv/watch' + animeUrl;
    // save cover images to a folder in public instead of using them from another site?
    request(animeJoyGrab, function(err, resp, body) {
        if (!err && resp.statusCode == 200) {
            var $ = cheerio.load(body);
            description = $('.ozet').html();
            boxsetImage = $('.animedetaysol > img').attr('src');

            animeData = $('.animedetaysag').html();
            animeData = animeData.replace(/ozellik/g, '').replace(/class=\"ozelliksol\"/g, '').replace(/class=\"ozelliksag\"/g, '').replace('View Count:', '').replace(/.*? views/g, '');

            if (iteration > $('.ep').length) {
                iteration = 1;
                animeEmbeds = [];
                episodes = [];
            }



            $('.ep').each(function () {

                var animeJoyEmbeds = 'http://anime-joy.tv/watch' + animeUrl + '/' + iteration;
                request(animeJoyEmbeds, function(err, resp, body) {
                    if (!err && resp.statusCode == 200) {
                        var $ = cheerio.load(body);
                        var videoEmbed = $('#video_container_div').html();
                        animeEmbeds.push(videoEmbed);
                    }
                });

                var episode = $(this).html();
                episodes.push(episode);
                iteration++;
            });

        }
    });



    // for some reason the x in 3x3 eyes is weird and I have to replace %973 and %C to make it look right on the webpage :(
    var animeTitle = req.url.replace(/-/g, ' ').replace('/', '').replace('%973', '').replace('%C', 'x').replace('.', '').replace('//', ' ');
    res.render('animes', {
        title: animeTitle,

        animeDescription: description,
        animeCover: boxsetImage,
        animeData: animeData,
        episodes: episodes,
        animeEmbeds: animeEmbeds


    });

});

module.exports = router;
