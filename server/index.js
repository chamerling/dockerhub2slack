'use strict';

const PORT = process.env.PORT || 3000;
const webhook = process.env.SLACK_WEBHOOK;
const DEFAULT_CHANNEL = 'general';

if (!webhook) {
  throw new Error('You need to set the SLACK_WEBHOOK env variable. You can generate one on the webhook integration page at https://YOURTEAM.slack.com/services/new/incoming-webhook');
}

let SlackClient = require('./slack');
let client = new SlackClient({url: webhook});
let express = require('express');
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('DockerHub2Slack Webhooks http://github.com/chamerling/dockerhub2slack');
});

function processWebhook(channel, req, res){
  let msg = `Docker Repository ${req.body.repository.repo_name}:${req.body.push_data.tag} updated by ${req.body.push_data.pusher}`;

  client.sendMessage(channel, msg, [req.body.repository.repo_url], (err) => {
    if (err) {
      console.log('Error while sending message to slack', err);
    }
    res.status(200).send('ok');
  });
}

app.post('/webhook', (req, res) => {
  if (!req.body) {
    return res.status(400).send();
  }

  processWebhook('', req, res);

});

app.post('/webhook/:channelName', (req, res) => {
  let channel = req.params.channelName || DEFAULT_CHANNEL;

  if (!req.body) {
    return res.status(400).send();
  }

  processWebhook(channel, req, res);

});

app.listen(PORT, () => {
  console.log('dockerhub2slack is listening on port', PORT);
});
