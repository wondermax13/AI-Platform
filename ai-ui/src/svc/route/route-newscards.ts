import { Router } from 'express';
import MongooseSingleNewsCard from '../../app/models/NewsCards';

export async function getNewsCards() {
  return MongooseSingleNewsCard
    .findOne()
    .exec();
}

export default async function routeNewscards(router: Router) {

  router.get('/newscards', async (request, response, next) => {
    console.log(`GET /newscards`);
    try {
      const newscards = await getNewsCards();
      response.status(200).json(newscards);
      console.log(`Val: `);
    } catch (ex) {
      console.log('errorx', ex);
      next(ex);
    }
  });
}
