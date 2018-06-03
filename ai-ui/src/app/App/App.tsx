import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import * as React from 'react';
import injectSheet from 'react-jss';
// import makeStylesheet from '../../utils/makeStylesheet';
import { AboutDialog } from '../AboutDialog/AboutDialog';
import { ArtificialsDialog } from '../ArtificialsDialog';
import { ICommon } from '../Common';
import Feed from '../Feed/Feed';
import { HumansDialog } from '../HumansDialog';
import { QuestionDialog } from '../QuestionDialog';
import { IArtificial, IArtificialModel } from './../models/Artificial';
import { IHuman, IHumanModel } from './../models/Human';
import { IQuestionModel } from './../models/Question';

import aiProvider from '../providers/ai-v1';
import settings from '../providers/settings';

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

enum Dialog {
  None,
  About,
  Artificials,
  Humans,
  NewQuestion,
}

export interface IChannel {
  name: string;
  default?: boolean;
}

initializeIcons(/* optional base url */);

export interface IAppState extends ICommon {
  currentDialog: Dialog,
  // aboutDialogIsOpen: boolean;
  // newQuestionDialogIsOpen: boolean;
  // humansDialogIsOpen: boolean;
  // artificialsDialogIsOpen: boolean;
  recentlyAddedHuman?: IHumanModel;
  recentlyAddedArtificial?: IArtificialModel;
  mounted?: boolean;
}

export interface IAppProps {
  server?: boolean;
  initialQuestions: IQuestionModel[]
}

export default class App extends React.Component<IAppProps, IAppState> {
  private timeouts: number[] = [];

  constructor(props: IAppProps) {
    super(props);

    const questions: IQuestionModel[] = props.initialQuestions || [];

    this.state = {
      ai: settings.ai,
      channels: settings.channels,
      currentDialog: Dialog.None,
      humans: settings.humans,
      questions,
      userId: '5aae56b8f36d284c92150e9f',
    };

    this.onClickLocation = this.onClickLocation.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.closeNewQuestionDialog = this.closeNewQuestionDialog.bind(this);
    this.closeHumansDialog = this.closeHumansDialog.bind(this);
    this.closeArtificialsDialog = this.closeArtificialsDialog.bind(this);
    this.closeAboutDialog = this.closeAboutDialog.bind(this);
    this.updateFeed = this.updateFeed.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.createArtificial = this.createArtificial.bind(this);
    this.findDefault = this.findDefault.bind(this);
  }

  public isDialogOpen = () => this.state.currentDialog === Dialog.None;
  public isArtificialsDialogOpen = () => this.state.currentDialog === Dialog.Artificials;
  public isAboutDialogOpen = () => this.state.currentDialog === Dialog.About;
  public isHumansDialogOpen = () => this.state.currentDialog === Dialog.Humans;
  public isNewQuestionDialogOpen = () => this.state.currentDialog === Dialog.NewQuestion;

  public openAboutDialog = () => this.setState({ currentDialog: Dialog.About });
  public openNewQuestionDialog = () => this.setState({ currentDialog: Dialog.NewQuestion });
  public openHumansDialog = () => this.setState({ currentDialog: Dialog.Humans });
  public openArtificialsDialog = () => this.setState({ currentDialog: Dialog.Artificials });

  public setInterval = (delay: number, action: () => void) => {
    this.timeouts.push(window.setInterval(action, delay));
  };

  public clearTimeouts = () => {
    this.timeouts.forEach(timeout => clearTimeout(timeout));
  };

  public scheduleUpdate() {
    this.setInterval(10000, this.updateFeed);
  }

  public componentDidMount(): void {
    this.setState({ mounted: true })
    this.updateFeed();
    this.scheduleUpdate();
  }

  public componentWillUnmount(): void {
    this.clearTimeouts();
  }

  public closeNewQuestionDialog(newQuestion?: IQuestionModel): void {
    this.setState({
      currentDialog: Dialog.None,
      recentlyAddedQuestion: newQuestion
    });
  }

  public closeHumansDialog(human?: IHumanModel): void {
    this.setState({
      currentDialog: Dialog.None,
      recentlyAddedHuman: human
    });
  }

  public closeArtificialsDialog(artificial?: IArtificialModel): void {
    this.setState({
      currentDialog: Dialog.None,
      recentlyAddedArtificial: artificial
    });
  }

  public closeAboutDialog(): void {
    this.setState({
      currentDialog: Dialog.None,
    });
  }

  public updateFeed = async (): Promise<void> => {
    const questions = await aiProvider.getFeed();
    this.setState({ questions });
  }

  public shouldComponentUpdate(nextProps: IAppProps, nextState: IAppState) {
    return JSON.stringify(nextState) !== JSON.stringify(this.state);
  }

  public async createQuestion(question: string, channels: string[], individuals: string[]): Promise<IQuestionModel | undefined> {
    const newQuestion: Partial<IQuestionModel> = {
      // from: {
      //   type: 'user',
      //   value: this.state.userId
      // },
      // answered: 'false',
      channels: [...(channels || []), ...(individuals || [])],
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
      avatar: 'android-mask',
      name: 'new artificial',
      version: '1',
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

    const isNewQuestionDialogOpen = this.isNewQuestionDialogOpen();
    const isArtificialsDialogOpen = this.isArtificialsDialogOpen();
    const isHumansDialogOpen = this.isHumansDialogOpen();
    const isAboutDialogOpen = this.isAboutDialogOpen();

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
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-lg6 ms-lgOffset3 ms-md8 ms-mdOffset2 ms-sm12">
              <PrimaryButton style={{ width: '100%' }} onClick={this.openAboutDialog}>About</PrimaryButton>
            </div>
          </div>
        </div>
      </ScrollablePane>
      <QuestionDialog
        open={isNewQuestionDialogOpen}
        defaultChannel={defaultChannel}
        createQuestionAction={this.createQuestion}
        doneAction={this.closeNewQuestionDialog}
        {...this.state}
      />
      <HumansDialog
        open={isHumansDialogOpen}
        createHumanAction={this.createHuman}
        doneAction={this.closeHumansDialog}
      />
      <ArtificialsDialog
        open={isArtificialsDialogOpen}
        createArtificialAction={this.createArtificial}
        doneAction={this.closeArtificialsDialog}
      />
      <AboutDialog
        open={isAboutDialogOpen}
        doneAction={this.closeAboutDialog}
      />
    </Fabric>);
  }

  public render(): JSX.Element {

    const StyledComp = injectSheet<{}, IAppState>(styles)(this.StyleableComponent);

    return (<StyledComp />);
  }
}
