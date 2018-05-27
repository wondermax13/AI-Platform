
import * as dotenv from 'dotenv';
import * as createServer from 'express';
import * as path from 'path';
import { app } from './app';
import { services } from './services';

export async function start() {
  console.log(`[${process.env.NODE_ENV}]`);
  dotenv.config();
  if (process.env.NODE_ENV !== 'production') {
    const envFile = `.env.${process.env.NODE_ENV}`;
    console.log(process.cwd());
    const env = path.resolve(process.cwd(), envFile);
    console.log(env);
    dotenv.config({ path: env });
  }
  console.log(`MONGODB_URI: ${process.env.MONGODB_URI}`);
  console.log(`PORT: ${process.env.PORT || 80}`);

  const server = createServer();

  app(server);
  services(server);

  server.listen(process.env.PORT || 80);
}
