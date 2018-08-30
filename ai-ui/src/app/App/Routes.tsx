import * as React from 'react';
import { QAndAPage } from '../pages/QAndAPage';
import { History } from './History';

import { Route, Router } from 'react-router';
import { IAppProps } from './App';

import { ScoreCardPage } from '../pages/ScoreCardPage';

export const AppRouter = { history: History.current };

export class Routes extends React.PureComponent<IAppProps> {
  public render(): React.ReactNode {
    return (
      <Router history={History.current}>
        <React.Fragment>
          <Route exact={true} path='/' render={this.renderQAndAPage} />
          <Route exact={true} path='/scorecards' component={ScoreCardPage} />
        </React.Fragment>
      </Router>
    );
  }

  public renderScoreCardPage = (): React.ReactNode => {
    return (
      <ScoreCardPage initialScoreCards={this.props.initialScoreCards} />
    );
  }

  public renderQAndAPage = (): React.ReactNode => {
    return (
      <QAndAPage initialQuestions={this.props.initialQuestions || []} />
    );
  }
}
