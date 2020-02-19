var twit = require('twit'), config = require('./config');
var Twitter = new twit(config);

// Respond when someone mentions @407etr
var stream = Twitter.stream('statuses/filter',
{ track: ['@WilsonChaiTea']});
// Look for my name
stream.on('tweet', tweetEvent);
// Get Twitter handle of who tweeted me
function tweetEvent(tweet) {
  var nameID = tweet.user.screen_name;
  // Send a reply back to the sender
  var reply = 'You mentioned me! @' + nameID + ' ' + 'Shout out to 407ETR!';
  var params = {
    status: reply, in_reply_to_status_id: nameID
  };
  Twitter.post('statuses/update', params,
function(err, data,response) {
  if (err!==undefined) {
    console.log(err);
  } else {
    console.log('Tweeted: ' + params.status);

    var Gpio = require('onoff').Gpio,
    led = new Gpio(4, 'out');
    var iv = setInterval(function() {
      led.writeSync(led.readSync() === 0 ? 1 : 0)
    }, 500);
    // Toggle state of the LED every half second
    setTimeout(function() {
      clearInterval(iv);
      led.writeSync(0);
      // Turn LED off
      led.unexport();
    }, 2000);
    // End blinking after 2 seconds
  }
})
}
