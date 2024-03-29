'use strict';

import { Application, Request, Response, Router } from 'express';
import ErrorHandler from './ErrorHandler';
import addAiRoute from './route/route-ai';
import addAnswerRoute from './route/route-answer';
import addFeedRoute from './route/route-feed';
import addQuestionRoute from './route/route-question';
import addScoreCardsRoute from './route/route-scorecards';
import addNewsCardsRoute from './route/route-newscards';

import * as cors from 'cors';
import * as mongoose from 'mongoose';

let mongooseConnected = false;

// SERVER CONTROLS
export async function services(server: Application) {

  console.log('setting up api');

  server.use(ErrorHandler);
  server.use(cors());

  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.log('Server error. MONGODB_URI not defined');
    server.all('/api/{0,}', (req, res, next) => {
      res.send('Mongodb config not found');
      next();
    });
    return;
  }

  const router = Router();

  try {
    // connect mongoose
    await new Promise((resolve: (result?: any) => void, reject: (error: Error | string) => void) => {
      mongoose.connect(MONGODB_URI, {}, (err: Error) => {
        if (err) {
          console.log('failed to connect mongo');
          reject(err);
        } else {
          resolve();
        }
      });
    });
    mongooseConnected = true;

    console.log('conncted db. configuring router');

    server.use('/api/v1', router);
    addAiRoute(router);
    addQuestionRoute(router);
    addAnswerRoute(router);
    addFeedRoute(router);
    addScoreCardsRoute(router);
    addNewsCardsRoute(router);

  } catch (ex) {
    console.log('error occurred: ', ex.message || ex);

    server.all('/api/v1/{0,}', (request: Request, response: Response, next: (err?: string) => void) => {
      response.status(500).send({ failed: 'cannot continue', error: ex && ex.message || ex });
      next(ex);
    });
  }
}

export async function stop(server: Application) {
  console.log('stopping server...');
  if (mongooseConnected) {
    mongoose.disconnect();
  }
}
