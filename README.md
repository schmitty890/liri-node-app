# liri-node-app

Liri is a terminal node application that returns tweets, song and movie data.

### Installation

`git clone` this repo
run `npm install`

You will need to create a `.env` file along with your API keys
Example
![Screenshot](https://user-images.githubusercontent.com/16051859/39334862-83a2efd8-497e-11e8-812a-a73c38d49e7d.png)

### Commands

`node liri.js my-tweets` - displays the last 20 tweets and when they were created at in your terminal/bash window.
![Screenshot](https://user-images.githubusercontent.com/16051859/39210568-21956dc8-47d7-11e8-8fb9-303ddc986f17.png)

`node liri.js spotify-this-song '<song name here>'` - displays the artist, the song name, preview link from Spotify and the album the song is from.
![Screenshot](https://user-images.githubusercontent.com/16051859/39210569-21a36770-47d7-11e8-966f-1c2620dc8519.png)

`node liri.js movie-this '<movie name here>'` - displays the title of the movie, year the movie came out, IMDB rating of the movie, rotten tomatoes rating of the movie, country where the movie was produced, language of the movie, plot of the movie and actors in the movie.
![Screenshot](https://user-images.githubusercontent.com/16051859/39210570-21b11de8-47d7-11e8-98fb-6a20d7b99f92.png)

`node liri.js do-what-it-says` - displays the song data of the song listed in the random.txt file.
![Screenshot](https://user-images.githubusercontent.com/16051859/39210571-21bfef08-47d7-11e8-8b27-86e2067ac186.png)

All data is saved to log.txt.

### npm packages used
[console.table](https://www.npmjs.com/package/console.table)

[dotenv](https://www.npmjs.com/package/dotenv)

[fs](https://www.npmjs.com/package/fs)

[moment](https://www.npmjs.com/package/moment)

[node-spotify-api](https://www.npmjs.com/package/node-spotify-api)

[request](https://www.npmjs.com/package/request)

[twitter](https://www.npmjs.com/package/twitter)

