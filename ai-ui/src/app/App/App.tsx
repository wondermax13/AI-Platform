import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import * as React from 'react';
import { IQuestionModel } from '../models/Question';
import QAndPage from '../pages/QAndAPage';

initializeIcons(/* optional base url */);

export interface IAppProps {
  server?: boolean;
  initialQuestions: IQuestionModel[]
}

export default class App extends React.Component<IAppProps, {}> {

  public render(): React.ReactNode {
    return <QAndPage initialQuestions={this.props.initialQuestions} />
  }
}
