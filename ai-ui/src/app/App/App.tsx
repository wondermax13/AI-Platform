import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import * as React from 'react';
// import makeStylesheet from '../../utils/makeStylesheet';
import { ArtificialsDialog } from '../ArtificialsDialog';
import Feed, { IFeedProps } from '../Feed/Feed';
import { HumansDialog } from '../HumansDialog';
import aiProvider from '../providers/ai-v1';
import settings from '../providers/settings';
import { QuestionDialog } from '../QuestionDialog';

import { IArtificial, IArtificialModel } from './../models/Artificial';
import { IHuman, IHumanModel } from './../models/Human';
import { IQuestionModel } from './../models/Question';

import injectSheet from 'react-jss';

const styles = {
  tall: {
    height: '100%',
    position: 'relative',
  }
} as {
    tall: {
      height: '100%'
      position: 'relative',
    }
  };

export interface IChannel {
  name: string;
  default?: boolean;
}

initializeIcons(/* optional base url */);

export interface IAppState extends IFeedProps {
  newQuestionDialogIsOpen: boolean;
  humansDialogIsOpen: boolean;
  artificialsDialogIsOpen: boolean;
  recentlyAddedHuman?: IHumanModel;
  recentlyAddedArtificial?: IArtificialModel;
  mounted?: boolean;
}

export interface IAppProps {
  server?: boolean;
  initialQuestions: IQuestionModel[]
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    const questions: IQuestionModel[] = props.initialQuestions || [];

    this.state = {
      ai: settings.ai,
      artificialsDialogIsOpen: false,
      channels: settings.channels,
      humans: settings.humans,
      humansDialogIsOpen: false,
      newQuestionDialogIsOpen: false,
      questions,
      userId: '5aae56b8f36d284c92150e9f',
    };

    this.openArtificialsDialog = this.openArtificialsDialog.bind(this);
    this.onClickLocation = this.onClickLocation.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.openHumansDialog = this.openHumansDialog.bind(this);
    this.openNewQuestionDialog = this.openNewQuestionDialog.bind(this);
    this.closeNewQuestionDialog = this.closeNewQuestionDialog.bind(this);
    this.closeHumansDialog = this.closeHumansDialog.bind(this);
    this.closeArtificialsDialog = this.closeArtificialsDialog.bind(this);
    this.updateFeed = this.updateFeed.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.createArtificial = this.createArtificial.bind(this);
    this.findDefault = this.findDefault.bind(this);
  }

  public componentDidMount(): void {
    this.setState({ mounted: true })
    this.updateFeed();
  }

  public openNewQuestionDialog(): void {
    this.setState({ newQuestionDialogIsOpen: true });
  }

  public openHumansDialog(): void {
    this.setState({ humansDialogIsOpen: true });
  }

  public openArtificialsDialog(): void {
    this.setState({ artificialsDialogIsOpen: true });
  }

  public closeNewQuestionDialog(newQuestion?: IQuestionModel): void {
    this.setState({
      newQuestionDialogIsOpen: false,
      recentlyAddedQuestion: newQuestion
    });
  }

  public closeHumansDialog(human?: IHumanModel): void {
    this.setState({
      humansDialogIsOpen: false,
      recentlyAddedHuman: human
    });
  }

  public closeArtificialsDialog(artificial?: IArtificialModel): void {
    this.setState({
      artificialsDialogIsOpen: false,
      recentlyAddedArtificial: artificial
    });
  }

  public async updateFeed(): Promise<void> {
    const questions = await aiProvider.getFeed();
    this.setState({ questions });
  }

  public async createQuestion(question: string, channels: string[], individuals: string[]): Promise<IQuestionModel | undefined> {
    const newQuestion: Partial<IQuestionModel> = {
      // from: {
      //   type: 'user',
      //   value: this.state.userId
      // },
      channels: [ ...(channels || []), ...(individuals || [])],
      // channels: [ ...channels, ...individuals ].map(c => c), // .map((channel: string) => {
      // return {
      //   type: 'channel',
      //   value: channel
      // };
      question,
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

      if (newQuestion.question) {
        await aiProvider.postQuestion(newQuestion.question, newQuestion.channels);
        await this.updateFeed();
      }

    } catch (ex) {
      console.error('There was an error. Try again! ' + (ex.message || ex));
    }
    return undefined;
  }

  public async createArtificial(): Promise<IArtificial> {
    const newArtificial: IArtificial = {
      name: 'new artificial'
    };
    // const newArtificialsState = [newArtificial].concat(this.state.questions);
    // this.setState({ questions: newQuestionsState });
    return newArtificial;
  }

  public async createHuman(): Promise<IHuman> {
    const newHuman: IHuman = {
      name: 'new human',
    };
    // const newHumansState = [newHuman].concat(this.state.questions);
    // this.setState({ questions: newQuestionsState });
    return newHuman;
  }

  public getLocation(question: IQuestionModel): string {
    return question.channels.reduce((
      acc: string,
      nex: string
    ) =>
      acc + (acc.length > 0 ? ', ' : '') + nex, '');
  }

  public onClickLocation(): void {
    console.debug('onClickLocation', arguments);
  }

  public findDefault(items: IChannel[]) {
    const channel = items
      .find((c: IChannel) => (c.default || false));

    return channel && channel.name || undefined;
  }

  public StyleableComponent = (stylesheet: any, children: any) => {
    const defaultChannel = this.findDefault(this.state.channels);

    return (<Fabric className={stylesheet.classes.tall}>
      <ScrollablePane className={stylesheet.classes.tall}>
        {this.state.mounted &&
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
          </Sticky>}
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-lg6 ms-lgOffset3 ms-md8 ms-mdOffset2 ms-sm12 feed">
              <Feed {...this.state} />
            </div>
          </div>
        </div>
      </ScrollablePane>
      {this.state.newQuestionDialogIsOpen && <ProgressIndicator />}
      <QuestionDialog
        open={this.state.newQuestionDialogIsOpen && !this.state.artificialsDialogIsOpen && !this.state.humansDialogIsOpen}
        channels={this.state.channels}
        defaultChannel={defaultChannel}
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
    </Fabric>);
  }
  public render(): JSX.Element {

    const StyledComp = injectSheet<{}, IAppState>(styles)(this.StyleableComponent);

    return (<StyledComp />);
  }
}

export default App;
