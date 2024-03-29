import { Request, Response } from 'express';

export default function (error: Error, request: Request, response: Response, next: () => void) {
  if (error) {
    const msg = error.message.toLowerCase();

    switch (true) {
      case msg.includes('validation'): {
        response.status(400).send(`${error.name}: ${error.message}`);
      }
      case msg.includes('enoent'): {
        response.status(400).send(`${error.name}: ${error.message}`);
      }
      case msg.includes('cast'): {
        response.status(400).send(`${error.name}: ${error.message}`);
      }
      case msg.includes('path Error'): {
        response.status(404).send(`${error.name}: ${error.message}`);
      }
      case msg.includes('objectid failed'): {
        response.status(404).send(`${error.name}: ${error.message}`);
      }
      case msg.includes('duplicate key'): {
        response.status(409).send(`${error.name}: ${error.message}`);
      }
      default: {
        response.status(500).send(`${error.name}: ${error.message}`);
      }
    };
  }
  next();
};

