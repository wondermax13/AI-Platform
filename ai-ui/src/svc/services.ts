'use strict';

import { Application, Request, Response, Router } from 'express';
import ErrorHandler from './ErrorHandler';
import addAnswerRoute from './route/route-answer';
import addFeedRoute from './route/route-feed';
import addQuestionRoute from './route/route-question';

import * as cors from 'cors';
import * as mongoose from 'mongoose';

let mongooseConnected = false;

// SERVER CONTROLS
export async function services(server: Application) {

  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.log('Server error. MONGODB_URI not defined');
    process.exit(1);
  }

  server.use(ErrorHandler);
  server.use(cors());

  const router = Router();

  try {
    // connect mongoose
    await new Promise((resolve: (result?: any) => void, reject: (error: Error | string) => void) => {
      mongoose.connect(MONGODB_URI, {}, (err: Error) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    mongooseConnected = true;

    server.use('/api/v1', router);
    addQuestionRoute(router);
    addAnswerRoute(router);
    addFeedRoute(router);

  } catch (ex) {
    server.use('/api/v1/*', (request: Request, response: Response, next: (err: string) => void) => {
      response.status(404).send({ failed: 'cannot continue', error: ex && ex.message || ex })
    });
    // server.all('*', (request: Request, response: Response, next: (err: string) => void) => next(ex));
  }
}

export async function stop(server: Application) {
  console.log('stopping server...');
  if (mongooseConnected) {
    mongoose.disconnect();
  }
}
