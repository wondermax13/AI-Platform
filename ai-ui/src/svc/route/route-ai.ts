// import * as BodyParser from 'body-parser';
import { Router } from 'express';
// import Answer, { IAnswerModel } from '../../app/models/Answer';
import Artificial from '../../app/models/Artificial';

// const bodyParser = BodyParser.json();

export default function routeQuestion(router: Router) {
  router.get('/ai', async (request, response, next) => {
    try {
      console.log(`GET /ai`);
      const artificials = await Artificial.find();
      response.status(200).json(artificials);
    } catch (ex) {
      next(ex);
    }
  });

  router.get('/ai/:id', async (request, response, next) => {
    try {
      console.log(`GET /ai/${request.params.id}`);
      const ai = await Artificial.findById(request.params.id)
      if (!ai) {
        throw new Error(`Path Error: ai not found: ${request.params.id}`);
      }
      response.status(200).json(ai);
    } catch (ex) {
      next(ex);
    }
  });
}
