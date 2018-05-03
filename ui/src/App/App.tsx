import React from 'react';
// import { app as appCss, section as sectionCss, column as columnCss, appScrollable } from './App.scss';
import { app as cssApp, appScrollable as cssAppScrollable } from './App.scss';
import {
  Fabric,
  ProgressIndicator,
  PrimaryButton,
  autobind,
  ScrollablePane,
  StickyPositionType,
  Sticky,
  DefaultButton
} from 'office-ui-fabric-react';
import { QuestionDialog } from '../QuestionDialog';
import { HumansDialog } from '../HumansDialog';
import { ArtificialsDialog } from '../ArtificialsDialog';
import { Question, Human, Artificial } from 'models';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Feed } from '../Feed';
import aiProvider from '../providers/ai-v1';
import settings from '../providers/settings';

// import { Header } from '../Header';
initializeIcons(/* optional base url */);

export interface InterfaceAppState {
  newQuestionDialogIsOpen: boolean;
  humansDialogIsOpen: boolean;
  artificialsDialogIsOpen: boolean;
  channels: Array<{ name: string, default?: boolean }>;
  humans: Array<{ name: string, default?: boolean }>;
  ai: Array<{ name: string, default?: boolean }>;
  questions: Array<Question>;
  userId: string;
  recentlyAddedQuestion: Question;
  recentlyAddedHuman: Human;
  recentlyAddedArtificial: Artificial;
}

export interface InterfaceAppProps {

}
class App extends React.Component<InterfaceAppProps, InterfaceAppState> {
  constructor(props: InterfaceAppProps) {
    super(props);

    const questions: Array<Question> = [];

    this.state = {
      newQuestionDialogIsOpen: false,
      humansDialogIsOpen: false,
      artificialsDialogIsOpen: false,
      channels: settings.channels,
      humans: settings.humans,
      ai: settings.ai,
      questions: questions,
      recentlyAddedQuestion: null,
      recentlyAddedHuman: null,
      recentlyAddedArtificial: null,
      userId: '5aae56b8f36d284c92150e9f'
    };
  }

  public componentDidMount(): void {
    this.updateFeed();
  }

  @autobind
  public openNewQuestionDialog(): void {
    this.setState({ newQuestionDialogIsOpen: true });
  }

  @autobind
  public openHumansDialog(): void {
    this.setState({ humansDialogIsOpen: true });
  }

  @autobind
  public openArtificialsDialog(): void {
    this.setState({ artificialsDialogIsOpen: true });
  }

  @autobind
  public closeNewQuestionDialog(newQuestion?: Question): void {
    this.setState({
      newQuestionDialogIsOpen: false,
      recentlyAddedQuestion: newQuestion
    });
  }
  @autobind
  public closeHumansDialog(human?: Human): void {
    this.setState({
      humansDialogIsOpen: false,
      recentlyAddedHuman: human
    });
  }
  @autobind
  public closeArtificialsDialog(artificial?: Artificial): void {
    this.setState({
      artificialsDialogIsOpen: false,
      recentlyAddedArtificial: artificial
    });
  }

  @autobind
  public async updateFeed(): Promise<void> {
    const questions = await aiProvider.getFeed();
    this.setState({ questions: questions });
  }

  @autobind
  public async createQuestion(question: string, channels: Array<string>, individuals: Array<string>): Promise<Question> {
    const newQuestion: Question = {
      question,
      // from: {
      //   type: 'user',
      //   value: this.state.userId
      // },
      channels: [].concat(channels, individuals) // .map((channel: string) => {
      // return {
      //   type: 'channel',
      //   value: channel
      // };
    };
    // )
    // if (individuals) {
    //   individuals.forEach((individual: string) => {
    //     newQuestion.to.push({
    //       type: 'individual',
    //       value: individual
    //     });
    //   });
    // }

    try {

      await aiProvider.postQuestion(newQuestion.question, newQuestion.channels);

      await this.updateFeed();

      return newQuestion;

    } catch (ex) {
      alert('There was an error. Try again! ' + (ex.message || ex));
    }
  }

  @autobind
  public async createArtificial(): Promise<Artificial> {
    const newArtificial: Artificial = {};
    // const newArtificialsState = [newArtificial].concat(this.state.questions);
    // this.setState({ questions: newQuestionsState });
    return newArtificial;
  }

  @autobind
  public async createHuman(): Promise<Human> {
    const newHuman: Human = {};
    // const newHumansState = [newHuman].concat(this.state.questions);
    // this.setState({ questions: newQuestionsState });
    return newHuman;
  }

  @autobind
  public getLocation(question: Question): string {
    return question.channels.reduce((
      acc: string,
      nex: string
    ) =>
      acc + (acc.length > 0 ? ', ' : '') + nex, '');
  }

  @autobind
  public onClickLocation(): void {
    console.log(arguments);
  }

  public render(): React.ReactNode {
    return (
      <Fabric className={ cssApp } >
        <ScrollablePane className={ cssAppScrollable }>
          <Sticky stickyPosition={StickyPositionType.Both}>
            <div className="ms-Grid">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-lg6 ms-lgOffset3 ms-md8 ms-mdOffset2 ms-sm12">
                  <PrimaryButton style={{ width: '50%' }} onClick={this.openNewQuestionDialog}>Ask a Question</PrimaryButton>
                  <DefaultButton style={{ width: '25%' }} onClick={this.openArtificialsDialog} >Artificials</DefaultButton>
                  <DefaultButton style={{ width: '25%' }} onClick={this.openHumansDialog} >Humans</DefaultButton>
                </div>
              </div>
            </div>
          </Sticky>
          <div className="ms-Grid">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-lg6 ms-lgOffset3 ms-md8 ms-mdOffset2 ms-sm12 feed">
                <Feed
                  {...this.state}
                />
              </div>
            </div>
          </div>
        </ScrollablePane>
        {this.state.newQuestionDialogIsOpen && <ProgressIndicator />}
        <QuestionDialog
          open={this.state.newQuestionDialogIsOpen && !this.state.artificialsDialogIsOpen && !this.state.humansDialogIsOpen}
          channels={this.state.channels}
          defaultChannel={this.state.channels.find((c: { name: string, default?: boolean }) => c.default).name}
          humans={this.state.humans}
          createQuestionAction={this.createQuestion}
          doneAction={this.closeNewQuestionDialog}
        />
        <HumansDialog
          open={this.state.humansDialogIsOpen && !this.state.artificialsDialogIsOpen && !this.state.newQuestionDialogIsOpen}
          createHumanAction={this.createHuman}
          doneAction={this.closeHumansDialog}
        />
        <ArtificialsDialog
          open={this.state.artificialsDialogIsOpen && !this.state.humansDialogIsOpen && !this.state.newQuestionDialogIsOpen}
          createArtificialAction={this.createArtificial}
          doneAction={this.closeArtificialsDialog}
        />
      </Fabric>
    );
  }
}
export default App;
