import { Router } from 'express';
import Question from '../../app/models/Question';

export async function getFeed(channel: string) {
  return Question
    .find({ channels: channel })
    .sort({ askTime: -1 })
    .limit(20)
    .exec();
}

export default function routeFeed(router: Router) {
  router.param('channel', (req, res, next, channel) => {
    req.params.channel = `#${channel}`;
    console.log(`loaded param: ${channel}`);
    next();
  });

  router.get('/feed/channel/:channel', async (request, response, next) => {
    console.log(`GET /feed/:channel (channel=${request.params.channel})`)
    try {
      const questions = await getFeed(request.params.channel);
      response.status(200).json(questions);
    } catch (ex) {
      next(ex);
    }
  });
}
