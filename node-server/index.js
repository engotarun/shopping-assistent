var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request-promise');
const store = require('./lib/SessionStore');

const replyUrl = "https://graph.facebook.com/v2.6/me/messages";
const token = "EAADS4KBN7EoBAESdrjh0ZBZAhVvqSAAErDCGJSZB2eZCPfQsG7ZBYKqc0QjsUn8UcB6ZCLDpZCjNm19gwhO3f5f4KsCBomtTKZCzgHElQ62WV3XZA2bpZBajPR01MEvrZCOeqskMuP0jPJcU2lHeftsPDti6ZBjZAXaWQgFCEZBZAPzJd8TzwZDZD";
const { Wit, log } = require('node-wit');
const WIT_TOKEN = "MLSUPEHPHIWHH6JSQYMPWMU7C23REVI3";

// Wit.ai actions
const actions = {
  send({ sessionId }, { text }) {
    const recipientId = store.getFbId(sessionId);
    if (recipientId) {
      return sendToFb(recipientId, text)
        .catch((err) => {
          console.error(
            'Oops! An error occurred while forwarding the response to',
            recipientId,
            ':',
            err.stack || err
          );
        });
    } else {
      console.error('Oops! Couldn\'t find user for session:', sessionId);
      return Promise.resolve();
    }
  },
};

const wit = new Wit({
  accessToken: WIT_TOKEN,
  actions,
  logger: new log.Logger(log.INFO)
});

app.set('port', (process.env.PORT || 5000));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Process application/json
app.use(bodyParser.json())

// Main route
app.get('/', function(req, res) {
  res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function(req, res) {
  if (req.query['hub.verify_token'] === "aisha_rocks") {
    res.send(req.query['hub.challenge'])
  }
  res.send('Error, wrong token')
})

// FB API End Point 
app.post('/webhook/', function(req, res) {
  // console.log("Got a post request", req.body);
  const data = req.body;
  if (data && data.object === 'page') {
    data.entry.forEach(function(pageEntry) {
      pageEntry.messaging.forEach((event) => {
        let fbid = event.sender.id;
        let sessionId = store.getSessionId(fbid);
        if (event.message && !event.message.is_echo) {
          let text = event.message.text;
          wit.runActions(
              sessionId, // the user's current session
              text, // the user's message
              store.getState(sessionId) // the user's current session state
            ).then((context) => {
              // Our bot did everything it has to do.
              // Now it's waiting for further messages to proceed.
              console.log('Waiting for next user messages');

              // Based on the session state, you might want to reset the session.
              // This depends heavily on the business logic of your bot.
              // Example:
              // if (context['done']) {
              //   delete sessions[sessionId];
              // }

              // Updating the user's current session state
              store.setState(sessionId);
            })
            .catch((err) => {
              console.error('Oops! Got an error from Wit: ', err.stack || err);
            })
        }
      });
    });
    res.sendStatus(200)
  } else {
    res.sendStatus(500);
  }
})

/**
 * Sends a message back to fb messenger
 * @param {FB UserId} id 
 * @param {*} text 
 */
function sendToFb(id, text) {
  request({
      url: replyUrl,
      qs: { access_token: token },
      method: 'POST',
      json: {
        recipient: { id },
        message: { text },
      }
    })
    .then((body) => {
      if (body.error) {
        console.log('Error in response: ', body.error);
      }
    })
    .catch((err) => {
      console.log("Error while sending request::", err);
    })
}

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});