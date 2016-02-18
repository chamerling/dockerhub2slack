# dockerhub2slack [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Docker Hub Webhooks to Slack

## Installation

```sh
$ git clone XXX
$ npm install
```

## Usage

1. Create an incoming Webhook on Slack integrations page, then start you dockerhub2slack service:

```bash
SLACK_WEBHOOK=<YOUR_INCOMING_WEBHOOK> node dist/server/index.js
```

2. Add webhooks to your Docker Hub repositories. The Webhook URL is your server URL with the /webhook/:channelName suffix. This means that you can define the channel you want to post message to on Docker Hub webhook call ie a call to http://<YOUR_SERVER>/webhook/docker will post a message to the \#docker channel on your Slack instance.

## Tests

Once configured (at least the incoming webhook part), you can call your service to check that you receive messages on your Slack instance:

```bash
curl -X POST -H "Content-Type: application/json" http://localhost:3000/webhook/docker -d @assets/payload.json
```
## License

MIT © [Christophe Hamerling](http://chamerling.github.io)

[npm-image]: https://badge.fury.io/js/dockerhub2slack.svg
[npm-url]: https://npmjs.org/package/dockerhub2slack
[travis-image]: https://travis-ci.org/chamerling/dockerhub2slack.svg?branch=master
[travis-url]: https://travis-ci.org/chamerling/dockerhub2slack
[daviddm-image]: https://david-dm.org/chamerling/dockerhub2slack.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/chamerling/dockerhub2slack
