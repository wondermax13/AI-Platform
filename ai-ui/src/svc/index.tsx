
import * as createServer from 'express';
import { app } from './app';
import { services } from './services';

export async function start() {

  const server = createServer();

  services(server);
  app(server);

  server.listen(80);
}
