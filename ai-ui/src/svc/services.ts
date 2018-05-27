'use strict';

import { Application, Request, Response, Router } from 'express';
import ErrorHandler from './ErrorHandler';
import addAnswerRoute from './route/route-answer';
import addFeedRoute from './route/route-feed';
import addQuestionRoute from './route/route-question';

import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as path from 'path';

const envFile = `.env.${process.env.NODE_ENV}`;

// if (process.env.NODE_ENV !== 'production') {
  console.log(process.cwd());
  const env = path.resolve(process.cwd(), envFile);
  console.log(env);
  dotenv.config({ path: env });
// }

const MONGODB_URI = process.env.MONGODB_URI || console.error('Server error. MONGODB_URI not defined');
let mongooseConnected = false;

// SERVER CONTROLS
export async function services(server: Application) {

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
    server.all('*', (request: Request, response: Response, next: (err: string) => void) => next(ex));
  }
}

export async function stop(server: Application) {
  console.log('stopping server...');
  if (mongooseConnected) {
    mongoose.disconnect();
  }
}
