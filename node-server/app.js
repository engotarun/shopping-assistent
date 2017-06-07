var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request-promise');
const store = require('./lib/SessionStore');
const fbPage = {
  token: "EAADS4KBN7EoBAESdrjh0ZBZAhVvqSAAErDCGJSZB2eZCPfQsG7ZBYKqc0QjsUn8UcB6ZCLDpZCjNm19gwhO3f5f4KsCBomtTKZCzgHElQ62WV3XZA2bpZBajPR01MEvrZCOeqskMuP0jPJcU2lHeftsPDti6ZBjZAXaWQgFCEZBZAPzJd8TzwZDZD",
  verifyToken: "aisha_rocks",
  appSecret: "5fb0918da7cbbd55e56d217987e390f9"
};

const { Wit, log } = require('node-wit');
const WIT_TOKEN = "MLSUPEHPHIWHH6JSQYMPWMU7C23REVI3";

const Bot = require('messenger-bot');
let bot = new Bot({
  token: fbPage.token,
  verify: fbPage.verifyToken,
  app_secret: fbPage.appSecret
});

// Wit.ai actions
const actions = {
  send({ sessionId }, { text }) {
    const recipientId = store.getFbId(sessionId);
    if (recipientId) {
      bot.sendMessage(recipientId, { text })
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



bot.on('error', (err) => {
  console.log(err.message)
})

bot.on('message', (payload, reply) => {
  let text = payload.message.text

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

    let sessionId = store.getSessionId(payload.sender.id);
    wit.runActions(
        sessionId, // the user's current session
        text, // the user's message
        store.getState(sessionId) // the user's current session state
      ).then((context) => {
        // Our bot did everything it has to do.
        // Now it's waiting for further messages to proceed.
        console.log('Waiting for next user messages');

        // Updating the user's current session state
        store.setState(sessionId, context);
      })
      .catch((err) => {
        console.error('Oops! Got an error from Wit: ', err.stack || err);
      })

  })

})

app.set('port', (process.env.PORT || 5000));

// FB Messager middleware
app.use(bot.middleware());

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Process application/json
app.use(bodyParser.json())

// Main route
app.get('/', function(req, res) {
  res.send('Hello world, I am a chat bot');
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});