# AnimeScraper
Scrapes animes from http://anime-joy.tv and displays them.

Notice:
I made this just to see if I could just to educate myself in NodeJS and Express, none of the actual shows are hosted on the site itself, it is scraped using Request and parsed using cheerio. If you have any ideas of how to fix some of the problems I would be so happy to be able to see how you did it! Also, because this is a parsed website, some of the stuff may not work in the future due to updates from the scraped site or if the site itself goes down.

Problems:
When you first load a show it will say "Not found" until you refresh and then it scrapes the data (not sure how to pre-load the data).
If you load one anime and then attempt to go back and load a new anime it will show the old anime data until you refresh, after you refresh it will reload the new scraped data.

!!! Some of the NPM modules may not be included in package.json !!!

Contributors:
Daniel Gleason

In action photos
Index page
![Image of index anime list](http://i.imgur.com/AMcQh8x.png)
Viewing of a show
![Image of a viewing page](http://i.imgur.com/oQcqr5L.png)
Episode list
![Episodes list plus a visual of the first epiosde](http://i.imgur.com/bKD5ejn.png)

