import { Router } from 'express';
import Artificial from '../../app/models/Artificial';

export async function getAis() {
  return await Artificial.find();
}

export async function getAi(aiId: string) {
  return await Artificial.findById(aiId);
}

export default async function routeAis(router: Router) {
  router.get('/ai', async (request, response, next) => {
    try {
      console.log(`GET /ai`);
      const artificials = await getAis();
      response.status(200).json(artificials);
    } catch (ex) {
      next(ex);
    }
  });

  router.get('/ai/:id', async (request, response, next) => {
    try {
      console.log(`GET /ai/${request.params.id}`);
      const ai = await getAi(request.params.id);
      if (!ai) {
        throw new Error(`Path Error: ai not found: ${request.params.id}`);
      }
      response.status(200).json(ai);
    } catch (ex) {
      next(ex);
    }
  });
}
