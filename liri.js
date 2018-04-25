var dotEnv = require("dotenv").config();
// save required files/npm packages as variables
var appKeys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var request = require("request");
var fs = require("fs");
var cTable = require("console.table");

var client = new Twitter(appKeys.twitterKeys); // npm twitter keys constructor
var spotify = new Spotify(appKeys.spotifyKeys); // npm spotify keys constructor

var args = process.argv.slice(2); // save the command input from the user
var command = args[0];
var userInput = args.slice(1).join(' ');

switch (command) { // run the appropriate command per the user input
    case 'my-tweets': return getTweets();
    case 'spotify-this-song': return getSpotify(userInput);
    case 'movie-this': return getMovie(userInput);
    case 'do-what-it-says': return justDoIt();
    default: return console.log(`Error: ${command} is not a valid command!`);
}

/**
 * [getTweets calls the twitter api to retreive latest tweets from my personal twitter account]
 */
function getTweets() {
    console.log(`FETCHING TWEETS`);
    client.get('statuses/user_timeline', { count: 20, tweet_mode: 'extended' }, function(err, tweets, response) {
        if (err) {
            return console.log(`error with my-tweets: ${err}`);
        }
        tweets.forEach(function(element) {
            var time = element.created_at,
                //get month day and year out of the time variable
                month = moment().month(time.substr(4, 3)).format("MM"); // format month as digit (ex. Jan will convert to 01)
                day = time.substr(8, 2),
                year = time.substr(-4),
                userName = element.user.name,
                tweet = element.full_text;
            var theDate = year + month + day;
            theDate = moment(theDate, "YYYYMMDD").fromNow(); // format the date
            var data = {
                "Tweet": `${userName} posted ${theDate}: ${tweet}`
            }
            logData(data);
        });
    });
}

/**
 * [getSpotify calls spotify and logs out information about a song specified]
 */
function getSpotify(input) {
    var songLength = Object.keys(input).length;
    if (songLength === 0) {
        input = "It's my life";
    }

    console.log(`FETCHING SONG: ${input}`);
    spotify.search({ type: 'track', query: input, limit: 1 }, function(err, data) {
        if (err) {
            return console.log(`Error occurred: ${err}`);
        }
        // console.log(data);
        var songData = data.tracks.items[0],
            releaseDate = moment(songData.album.release_date, "YYYYMMDD").fromNow(), // Release date
            artist = songData.album.artists[0].name, // Artist(s)
            album = songData.album.name, // The album that the song is from
            songName = songData.name, // The song's name
            songLink = songData.href; // A preview link of the song from Spotify

        var data = {
            "Artist": artist,
            "Song Name": songName,
            "Released": releaseDate,
            "Album": album,
            "Song Link": songLink
        };

        logData(data);
    });
}

/**
 * [getMovie get information about a movie input from the user]
 */
function getMovie(userInput) {
    var movieLength = Object.keys(userInput).length;
    if (movieLength === 0) {
        userInput = "Mr. Nobody";
    }
    console.log(`FETCHING MOVIE: ${userInput}`);
    request(`http://www.omdbapi.com/?apikey=trilogy&t=${userInput}`, function(err, resp, body) {
        if (!err && resp.statusCode === 200) {
            body = JSON.parse(body)
            var title = body.Title,
                year = body.Year,
                rating = body.imdbRating,
                rottenTomatoeRating = body.Ratings[1] ? body.Ratings[1].Value : 'Not Rated',
                country = body.Country,
                language = body.Language,
                plot = body.Plot,
                actors = body.Actors,
                data = {
                    "Title": title,
                    "Year": year,
                    "Rating": rating,
                    "Rotten Tomatoe Rating": rottenTomatoeRating,
                    "Country": country,
                    "Language": language,
                    "Plot": plot,
                    "Actors": actors
                };
            logData(data);
        }
    });
}

/**
 * [justDoIt reads the random.txt file and gets passes the song name to the spotify function to log out information about the song]
 */
function justDoIt() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var songName = data.split(',');
        songName = songName[1];
        getSpotify(songName);
    });
}

/**
 * [logData log the data to the terminal and write data to log.txt]
 */
function logData(data) {
    var table = cTable.getTable([data]);
    console.log(table); // Log the data to the terminal (some data - specifically movie plots - have long strings, enlarge terminal to get the best formatted result)

    fs.appendFile("log.txt", ',' + JSON.stringify(data, null, 2), function(err) {
        console.log('________________________');
        if (err) {
            console.log(err);
        } else {
            console.log("Content added to log.txt");
        }
    });
}