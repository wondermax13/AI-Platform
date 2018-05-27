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

  console.log('setting up api');

  server.use(ErrorHandler);
  server.use(cors());


  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.log('Server error. MONGODB_URI not defined');
    server.all('/{0,}', (req, res) => {
      res.send('Mongodb config not found');
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
    addQuestionRoute(router);
    addAnswerRoute(router);
    addFeedRoute(router);

  } catch (ex) {
    console.log('error occurred: ', ex.message || ex);

    server.all('/api/v1/*', (request: Request, response: Response, next: (err: string) => void) => {
      response.send({ failed: 'cannot continue', error: ex && ex.message || ex })
    });
    // server.all('*', (request: Request, response: Response, next: (err: string) => void) => next(ex));
  }

  server.all('/{0,}', (req, res) => {
    res.send('route not handled');
  });
}

export async function stop(server: Application) {
  console.log('stopping server...');
  if (mongooseConnected) {
    mongoose.disconnect();
  }
}
