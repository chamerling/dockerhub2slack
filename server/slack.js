'use strict';

let request = require('request');
const CHANNEL_PREFIX = '#';
const ICON = ':docker:';
const USERNAME = 'DockerHub2Slack';

class SlackClient {
  constructor(options = {}) {
    this.options = options;
    if (!this.options.url) {
      throw new Error('Hook URL is required');
    }
  }

  sendMessage(channel, text, links, callback) {
    let additionalText;

    if (links && Array.isArray(links)) {
      additionalText = '';
      links.forEach(function(link) {
        additionalText += '<' + link + '> ';
      });
    }

    let message = text;

    if (additionalText) {
      message += ' ' + additionalText;
    }

    let payload = {
      text: message,
      icon_emoji: ICON,
      username: USERNAME
    };

    if (channel) {
      payload.channel = CHANNEL_PREFIX + channel;
    }

    if (this.options.icon_url) {
      payload.icon_url = this.options.icon_url;
    }

    request({
      method: 'POST',
      url: this.options.url,
      json: true,
      body: payload
    }, (err, response, body) => {
      if (err) {
        return callback(err);
      }
      if (response.statusCode !== 200) {
        return callback(new Error('Wrong status code from slack API'));
      }

      return callback();
    });
  }
}

export default SlackClient;
