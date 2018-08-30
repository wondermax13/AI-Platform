import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import * as React from 'react';
import { IQuestionModel } from '../models/Question';
import { IScoreCards } from '../models/ScoreCard';

import { Routes } from './Routes';

initializeIcons(/* optional base url */);

export interface IAppProps {
  server?: boolean;
  initialQuestions?: IQuestionModel[];
  initialScoreCards?: IScoreCards;
}

export default class App extends React.Component<IAppProps, {}> {

  public render(): React.ReactNode {
    return <Routes {...this.props}/>
  }
}
