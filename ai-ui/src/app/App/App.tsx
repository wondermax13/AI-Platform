import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import * as React from 'react';
import { IQuestionModel } from '../models/Question';
import { IScoreCards } from '../models/ScoreCards';

import { Routes } from './Routes';
import { Fabric } from 'office-ui-fabric-react/lib/components/Fabric/Fabric';

initializeIcons(/* optional base url */);

export interface IAppProps {
  initialQuestions?: IQuestionModel[];
  initialScoreCards?: IScoreCards;
}

export default class App extends React.Component<IAppProps, {}> {

  public render(): React.ReactNode {
    const responsive = 'ms-Grid-col ms-lg6 ms-lgOffset3 ms-md10 ms-mdOffset1 ms-sm12 feed';

    return (
      <Fabric className={responsive}>
        <Routes {...this.props} />
      </Fabric>
    );
  }
}
