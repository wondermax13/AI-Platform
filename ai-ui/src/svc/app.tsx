import { configureLoadStyles } from '@microsoft/load-themed-styles';
    // const sheets = new SheetsRegistry()
    // Store registered styles in a variable used later for injection.
    let allStyles = '';

    // Push styles into variables for injecting later.
    configureLoadStyles((styles: string) => {
      allStyles += styles;
    });

// import * as React from 'react';
// import { renderToString } from 'react-dom/server';
// import { App } from '../app/App';
import { ITemplateProps, template } from './template';

import * as path from 'path';

import { Application, Request, Response } from 'express';
import * as Express from 'express';
import { IAppProps } from '../app/App/App';
import data from './manifest';
import { getFeed } from './route/route-feed';

const build = path.resolve(__dirname, './../../build');
const statics = path.resolve(build, 'static');
const manifestFile = path.resolve(build, 'asset-manifest.json');

export async function app(server: Application) {

  server.use('/static', Express.static(statics));
  server.get('/', async (request: Request, response: Response) => {

    try {
      const manifest = JSON.parse(await data(manifestFile)) as IManifest;
      const feed = await getFeed('#main');

      const initialState: IAppProps = {
        initialQuestions: feed,
        server: false
      }

      // const appString = renderToString(<App {...initialState} {...{ server: true }} />);
      const mainJs = manifest["main.js"];
      const mainCss = manifest["main.css"];

      const templateProps: ITemplateProps = {
        body: 'Connecting to AI...',// appString,
        initialState: JSON.stringify(initialState),
        mainCss,
        mainJs,
        styles: allStyles,
        title: 'AI-2-AI',
      }
      const d = await template(templateProps);
      response.send(d);
    } catch (ex) {
      response.send({ error: ex.message || JSON.stringify(ex), note: "reload in a few..." });
    }
  });
}