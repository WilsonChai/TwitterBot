// Dependencies
var twit = require('twit'), config = require('./config');
var Twitter = new twit(config);

var retweet = function() {
  var params = {
    q: '407ETR',
    result_type: 'recent'
  }

  Twitter.get('search/tweets', params, function(err, data) {
    // if there no errors
    if (!err) {
      // grab ID of tweet to retweet
      var retweetId = data.statuses[0].id_str;
      // Tell Twitter to retweet
      Twitter.post('statuses/retweet/:id',
      {
        id: retweetId
      },
      function(err, response) {
        if (response) {
          console.log('Retweeted!!!');
        }
        // if there was an error while tweeting
        if (err) {
          console.log("error tweeting!");
        }

      });

    }
    else {
      console.log('Error searching');
    }
  }
);
}

retweet();
setInterval(retweet, 180000);
