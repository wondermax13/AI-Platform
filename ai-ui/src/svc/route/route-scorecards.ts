import { Router } from 'express';
import ScoreCards from '../../app/models/ScoreCards';

export async function getScoreCards() {
  return ScoreCards
    .findOne()
    .exec();
}

export default async function routeScorecards(router: Router) {

  router.get('/scorecards', async (request, response, next) => {
    console.log(`GET /scorecards`);
    try {
      const scorecards = await getScoreCards();
      response.status(200).json(scorecards);
    } catch (ex) {
      console.log('errorx', ex);
      next(ex);
    }
  });
}
