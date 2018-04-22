// console.log('this is loaded');


var twitterKeys = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
}

var spotifyKeys = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
}

var ombdKey = {
	key: "00000000" // OMBD api requires you to pay for it at this time, so we use the trilogy api key. this is just a placeholder
}

module.exports = {
	twitterKeys: twitterKeys,
	spotifyKeys: spotifyKeys,
	ombdKey: ombdKey
};