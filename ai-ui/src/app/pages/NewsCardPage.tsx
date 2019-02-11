import { Selection } from 'office-ui-fabric-react/lib/utilities/selection';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
// import { NewsCardDialog } from '../components/NewsCards/NewsCardDialog';
// import { NewsCards } from '../components/NewsCards/NewsCards';
import { ISingleNewsCardScore } from '../models/NewsCards';
import aiProvider from '../providers/ai-v1';

enum Dialog {
  None,
  About,
  NewsCard,
}

export interface INewsCardPageState {
  currentDialog: Dialog,
  newsCards?: ISingleNewsCardScore,
  newsCard?: string,  // string instead of IScoreCard
  selection: Selection,
  error?: string,
}

const selection = new Selection();

export interface INewsCardPageProps extends RouteComponentProps<INewsCardPageProps> {
  newsCards?: ISingleNewsCardScore;
}

class NewsCardPageBase extends React.PureComponent<INewsCardPageProps, INewsCardPageState> {
  public state: INewsCardPageState = {
    currentDialog: Dialog.None,
    selection,
  }

  public newsCardsRef: React.RefObject<ISingleNewsCardScore> = React.createRef<ISingleNewsCardScore>();

  public routeToAi = () => this.props.history.push('/');
  public isAboutDialogOpen = () => this.state.currentDialog === Dialog.About;
  public openAboutDialog = () => this.setState({ currentDialog: Dialog.About });

  public closeAboutDialog = (): void => {
    this.setState({
      currentDialog: Dialog.None,
    });
  }

  public onOpenNewsCard = (newsCard: string) => {
    this.setState({
      newsCard,
      currentDialog: Dialog.NewsCard
    })
  };

  public currentNewsCards = () => {
    return this.state.newsCards || this.props.newsCards || {
      response: "default response",
    };
  }

  public currentNewsCard = () => {
    return this.state.newsCard || this.currentNewsCards().response || undefined;
  }

  public updateNewsCards = async (): Promise<void> => {
    try {
      const newsCards = await aiProvider.getNewsCards();
      const newsCard = newsCards.response || "undefined UpdateNewsCards";

      this.setState({ newsCards, newsCard });

    } catch (ex) {
    /*
      this.setState({
        error: ex.message,
        newsCard: {
          ...this.state.newsCards,
          response: "default response",
        }
      })
      */
    }
  }

  public componentDidMount(): void {
    this.updateNewsCards();
  }

/*
  public currentNewsCardsTimeFormatted() {
    const cards = this.currentNewsCards();
    if (cards.time) {
      const dte = new Date(cards.time);
      return dte.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
    return '';
  }
*/

  public render(): React.ReactNode {
    
    console.log(' Rendering ')

     // const cards = this.currentNewsCards();
     // const newsCard = this.currentNewsCard();

    // const newsCardHeight = newsCard ? 'minmax(100px, max-content)' : '0px';
    const layout: React.CSSProperties = {
      display: 'grid',
      gridTemplateRows: `min-content min-content 0px minmax(100px, 80vh) 1px`,
    };

    const dateTime = new Date();

    return (
          <div style={layout}>
            <h1 className='ms-font-xl' style={{ padding: 10 }}>
              Score Cards as of {dateTime}
            </h1>

          </div >
        );
  }

  public dismissNewsCard = () => this.setState({ currentDialog: Dialog.None, newsCard: undefined });
}

const NewsCardPage = withRouter(NewsCardPageBase);
export { NewsCardPage };

