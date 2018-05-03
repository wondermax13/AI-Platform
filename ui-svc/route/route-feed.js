'use strict';

const Question = require('../model/question');
const Answer = require('../model/answer');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

async function feed(channel) {
  return Question
    .find({ channels: channel })
    .sort({ askTime: -1 })
    .limit(20)
    .exec()
}

module.exports = router => {
  router.param('channel', (req, res, next, channel) => {
    req.channel = `#${channel}`;
    next();
  });

  router.get('/feed/channel/:channel', async (request, response) => {
    console.log(`GET /feed/:channel (channel=${request.channel})`)
    try {
      const questions = await feed(request.channel);
      response.status(200).json(questions);
    } catch (ex) {
      errorHandler(err, response);
    }
  });
}
