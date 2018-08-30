import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import * as React from 'react';
import { AboutDialog } from '../components/AboutDialog/AboutDialog';
// import { Feed } from '../components/Feed/Feed';
// import aiProvider from '../providers/ai-v1';
// import settings from '../providers/settings';
import { ScoreCards } from '../components/ScoreCards/ScoreCards';
import { IScoreCard, IScoreCards, IScoreCardScore } from '../models/ScoreCard';

import { Selection } from 'office-ui-fabric-react/lib/utilities/selection';
import { ScoreCardDialog } from '../components/ScoreCards/ScoreCardDialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import { RouteComponentProps, withRouter } from 'react-router';

enum Dialog {
  None,
  About,
  ScoreCard,
}

export interface IScoreCardPageState {
  currentDialog: Dialog,
  scoreCards: IScoreCards,
  scoreCard?: IScoreCard,
  selection: Selection
}

const selection = new Selection();

const history = () => {
  return [
    Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
    Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
    Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
  ]
};

const top: IScoreCardScore = {
  stock: 'MSFT',
  score: 100,
  history: history(),
};
const bottom: IScoreCardScore = {
  stock: 'AMZN',
  score: 10,
  history: history(),
};
const middle: IScoreCardScore = {
  stock: 'GOOG',
  score: 50,
  history: history(),
};
const scoreCards: IScoreCards = {
  sources: [
    {
      bottom: {
        stock: 'AMZN',
        score: 10,
      },
      top: {
        stock: 'MSFT',
        score: 99,
      },
      name: 'New York Times Business Page',
      scores: [top, middle, bottom],
    },
    {
      bottom: {
        stock: 'AMZN',
        score: 12,
      },
      top: {
        stock: 'APPL',
        score: 100,
      },
      name: 'CNBC Financial',
      scores: [top, middle, bottom],
    },
    {
      bottom: {
        stock: 'ASDF',
        score: 11,
      },
      top: {
        stock: 'APPL',
        score: 95,
      },
      name: 'Cramer & Cramer',
      scores: [top, middle, bottom],
    },
    {
      bottom: {
        stock: 'ASDF',
        score: 11,
      },
      top: {
        stock: 'APPL',
        score: 95,
      },
      name: 'Cramer & Cramer2',
      scores: [top, middle, bottom],
    },
    {
      bottom: {
        stock: 'ASDF',
        score: 11,
      },
      top: {
        stock: 'APPL',
        score: 95,
      },
      name: 'Cramer & Cramer3',
      scores: [top, middle, bottom],
    },
    {
      bottom: {
        stock: 'ASDF',
        score: 11,
      },
      top: {
        stock: 'APPL',
        score: 95,
      },
      name: 'Cramer & Cramer4',
      scores: [top, middle, bottom],
    },
    {
      bottom: {
        stock: 'ASDF',
        score: 11,
      },
      top: {
        stock: 'APPL',
        score: 95,
      },
      name: 'Cramer & Cramer5',
      scores: [top, middle, bottom],
    },
    {
      bottom: {
        stock: 'ASDF',
        score: 11,
      },
      top: {
        stock: 'APPL',
        score: 95,
      },
      name: 'Cramer & Cramer6',
      scores: [top, middle, bottom],
    },
    {
      bottom: {
        stock: 'ASDF',
        score: 11,
      },
      top: {
        stock: 'APPL',
        score: 95,
      },
      name: 'Cramer & Cramer7',
      scores: [top, middle, bottom],
    },
    {
      bottom: {
        stock: 'ASDF',
        score: 11,
      },
      top: {
        stock: 'APPL',
        score: 95,
      },
      name: 'Cramer & Cramer8',
      scores: [top, middle, bottom],
    },
    {
      bottom: {
        stock: 'ASDF',
        score: 11,
      },
      top: {
        stock: 'APPL',
        score: 95,
      },
      name: 'Cramer & Cramer9',
      scores: [top, middle, bottom],
    },
    {
      bottom: {
        stock: 'ASDF',
        score: 11,
      },
      top: {
        stock: 'APPL',
        score: 95,
      },
      name: 'Cramer & Cramer10',
      scores: [top, middle, bottom],
    },
    {
      bottom: {
        stock: 'ASDF',
        score: 11,
      },
      top: {
        stock: 'APPL',
        score: 95,
      },
      name: 'Cramer & Cramer11',
      scores: [top, middle, bottom],
    },
  ],
  time: new Date(),
};

export interface IScoreCardPageProps extends RouteComponentProps<IScoreCardPageProps> {
  initialScoreCards?: IScoreCards;
}

class ScoreCardPageBase extends React.PureComponent<IScoreCardPageProps, IScoreCardPageState> {
  public state: IScoreCardPageState = {
    currentDialog: Dialog.None,
    scoreCards,
    selection,
  }

  public scoreCardsRef: React.RefObject<ScoreCards> = React.createRef<ScoreCards>();

  public routeToScoreCards = () => this.props.history.push('/');
  public isAboutDialogOpen = () => this.state.currentDialog === Dialog.About;
  public openAboutDialog = () => this.setState({ currentDialog: Dialog.About });

  public closeAboutDialog = (): void => {
    this.setState({
      currentDialog: Dialog.None,
    });
  }

  public onOpenScoreCard = (scoreCard: IScoreCard) => {
    this.setState({
      scoreCard,
      currentDialog: Dialog.ScoreCard
    })
  };

  public render(): React.ReactNode {
    const isAboutDialogOpen = this.isAboutDialogOpen();

    const cards = this.state.scoreCards || this.props.initialScoreCards;
    const scoreCard = this.state.scoreCard;

    const scoreCardHeight = this.state.scoreCard ? 'minmax(100px, max-content)' : '0px';
    const layout: React.CSSProperties = {
      backgroundColor: 'white',
      display: 'grid',
      gridGap: '10px',
      gridTemplateRows: `min-content min-content ${scoreCardHeight} minmax(100px, 80vh) 1px`,
      height: '100vh',
      padding: 0,
    };
    // const domRef = this.scoreCardsRef.current && this.scoreCardsRef.current.domRef || { current: null };
    const menuLayout: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: 'auto auto',
    }
    const dateTime = this.state.scoreCards.time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
      <Fabric className='ms-Grid'>
        {/* <div className="ms-Grid" style={{height: '100vh'}}>
          <div className="ms-Grid-row" style={{height: '100vh'}}> */}

        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg8 ms-lgOffset2 ms-md10 ms-mdOffset1 ms-sm12 feed">
            <div style={layout}>
              <div style={menuLayout}>
                <PrimaryButton onClick={this.routeToScoreCards}>Q & N</ PrimaryButton>
                <DefaultButton onClick={this.openAboutDialog}>About</DefaultButton>
              </div>

              <h1 className='ms-font-xl'>
                Score Cards as of {dateTime}
              </h1>

              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <ScoreCardDialog
                  scoreCard={scoreCard}
                />
              </div>
              <div style={{ position: 'relative', boxShadow: '#333 0 0 5px' }}>
                <ScoreCards selected={scoreCard} scoreCards={cards} onOpenScoreCard={this.onOpenScoreCard} ref={this.scoreCardsRef} />
              </div>
            </div>
          </div>
        </div>
        {/* </div>
        </div> */}


        {/* <QuestionDialog
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
        */}
        {/* <ScoreCardDialog
          open={this.state.currentDialog === Dialog.ScoreCard}
          doneAction={this.onCloseDialogs}
          scoreCard={this.state.scoreCard!}
        /> */}
        <AboutDialog
          open={isAboutDialogOpen}
          doneAction={this.closeAboutDialog}
        />
      </Fabric >
    );
  }

  public dismissScoreCard = () => this.setState({ currentDialog: Dialog.None, scoreCard: undefined });
}

const ScoreCardPage = withRouter(ScoreCardPageBase);
export { ScoreCardPage };
