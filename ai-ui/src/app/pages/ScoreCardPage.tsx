import * as React from 'react';
import { ScoreCards } from '../components/ScoreCards/ScoreCards';
import { IScoreCard, IScoreCards } from '../models/ScoreCards';
import { Selection } from 'office-ui-fabric-react/lib/utilities/selection';
import { ScoreCardDialog } from '../components/ScoreCards/ScoreCardDialog';
import { RouteComponentProps, withRouter } from 'react-router';
import aiProvider from '../providers/ai-v1';

enum Dialog {
  None,
  About,
  ScoreCard,
}

export interface IScoreCardPageState {
  currentDialog: Dialog,
  scoreCards?: IScoreCards,
  scoreCard?: IScoreCard,
  selection: Selection,
  error?: string,
}

const selection = new Selection();

export interface IScoreCardPageProps extends RouteComponentProps<IScoreCardPageProps> {
  initialScoreCards?: IScoreCards;
}

class ScoreCardPageBase extends React.PureComponent<IScoreCardPageProps, IScoreCardPageState> {
  public state: IScoreCardPageState = {
    currentDialog: Dialog.None,
    selection,
  }

  public scoreCardsRef: React.RefObject<ScoreCards> = React.createRef<ScoreCards>();

  public routeToAi = () => this.props.history.push('/');
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

  public currentScoreCards = () => {
    return this.state.scoreCards || this.props.initialScoreCards || {
      sources: [],
      time: new Date(),
    };
  }

  public currentScoreCard = () => {
    return this.state.scoreCard || this.currentScoreCards().sources.length && this.currentScoreCards().sources[0] || undefined;
  }

  public updateScoreCards = async (): Promise<void> => {
    try {
      const scoreCards = await aiProvider.getScoreCards();
      const scoreCard = scoreCards.sources.length && scoreCards.sources[0] || undefined;
      this.setState({ scoreCards, scoreCard });
    } catch (ex) {
      this.setState({
        error: ex.message,
        scoreCards: {
          sources: [],
          time: new Date(),
        }
      })
    }
  }

  public componentDidMount(): void {
    this.updateScoreCards();
  }

  public currentScoreCardsTimeFormatted() {
    const cards = this.currentScoreCards();
    if (cards.time) {
      const dte = new Date(cards.time);
      return dte.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
    return '';
  }

  public render(): React.ReactNode {
    const cards = this.currentScoreCards();
    const scoreCard = this.currentScoreCard();

    const scoreCardHeight = scoreCard ? 'minmax(100px, max-content)' : '0px';
    const layout: React.CSSProperties = {
      display: 'grid',
      gridTemplateRows: `min-content min-content ${scoreCardHeight} minmax(100px, 80vh) 1px`,
    };
    const dateTime = this.currentScoreCardsTimeFormatted();

    return (
      <div style={layout}>
        <h1 className='ms-font-xl' style={{ padding: 10 }}>
          Score Cards as of {dateTime}
        </h1>

        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <ScoreCardDialog
            scoreCard={scoreCard}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <ScoreCards selected={scoreCard} scoreCards={cards} onOpenScoreCard={this.onOpenScoreCard} ref={this.scoreCardsRef} />
        </div>
      </div >
    );
  }

  public dismissScoreCard = () => this.setState({ currentDialog: Dialog.None, scoreCard: undefined });
}

const ScoreCardPage = withRouter(ScoreCardPageBase);
export { ScoreCardPage };
