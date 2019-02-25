import { configureLoadStyles } from '@microsoft/load-themed-styles';
import * as Express from 'express';
import { Application, Request, Response } from 'express';
import * as path from 'path';
import { IAppProps } from '../app/App/App';
import data from './manifest';
import { getAis } from './route/route-ai';
import { getFeed } from './route/route-feed';
import { getScoreCards } from './route/route-scorecards';
import { getNewsCards } from './route/route-newscards';
import { ITemplateProps, template } from './template';

// Store registered styles in a variable used later for injection.
let allStyles = '';
// Push styles into variables for injecting later.
configureLoadStyles((styles: string) => {
  allStyles += styles;
});

const build = path.resolve(__dirname, './../../client');
const wellknown = path.resolve(__dirname, './../../.well-known');
const statics = path.resolve(build, 'static');
const manifestFile = path.resolve(build, 'asset-manifest.json');

export async function getInitialState(): Promise<IAppProps> {
  const scoreCards = (await getScoreCards() || undefined);
  const newsCards = (await getNewsCards() || undefined);
  const questions = (await getFeed('#main') || undefined);
  const ais = (await getAis() || undefined);

  const initialState: IAppProps = {
    scoreCards,
    questions,
    ais,
    newsCards
  }
  return initialState;
}

export async function app(server: Application) {

  server.get('/.well-known', Express.static(wellknown));
  server.use('/client', Express.static(build));
  server.use('/client/static', Express.static(statics));

  server.get('/scorecards', async (request: Request, response: Response) => {

    try {
      const manifest = JSON.parse(await data(manifestFile)) as IManifest;
      const initialState = await getInitialState();

      // const appString = renderToString(<App {...initialState} {...{ server: true }} />);
      const mainJs = '/client/' + manifest["main.js"];
      const mainCss = '/client/' + manifest["main.css"];

      const templateProps: ITemplateProps = {
        body: '.',
        initialState: JSON.stringify(initialState),
        mainCss,
        mainJs,
        styles: allStyles,
        title: 'AI2AI',
      }
      const d = await template(templateProps);
      response.send(d);
    } catch (ex) {
      response.send({ error: ex.message || JSON.stringify(ex), note: "reload in a few..." });
    }

  });

    server.get('/newscards', async (request: Request, response: Response) => {

    try {
      const manifest = JSON.parse(await data(manifestFile)) as IManifest;
      const initialState = await getInitialState();

      // const appString = renderToString(<App {...initialState} {...{ server: true }} />);
      const mainJs = '/client/' + manifest["main.js"];
      const mainCss = '/client/' + manifest["main.css"];

      const templateProps: ITemplateProps = {
        body: '.',
        initialState: JSON.stringify(initialState),
        mainCss,
        mainJs,
        styles: allStyles,
        title: 'AI2AI',
      }
      const d = await template(templateProps);
      response.send(d);
    } catch (ex) {
      response.send({ error: ex.message || JSON.stringify(ex), note: "reload in a few..." });
    }

  });

  server.get('/', async (request: Request, response: Response) => {

    try {
      const manifest = JSON.parse(await data(manifestFile)) as IManifest;
      const initialState = await getInitialState();

      // const appString = renderToString(<App {...initialState} {...{ server: true }} />);
      const mainJs = '/client/' + manifest["main.js"];
      const mainCss = '/client/' + manifest["main.css"];

      const templateProps: ITemplateProps = {
        body: '.',
        initialState: JSON.stringify(initialState),
        mainCss,
        mainJs,
        styles: allStyles,
        title: 'AI2AI',
      }
      const d = await template(templateProps);
      response.send(d);
    } catch (ex) {
      response.send({ error: ex.message || JSON.stringify(ex), note: "Reload in a few..." });
    }
  });
}