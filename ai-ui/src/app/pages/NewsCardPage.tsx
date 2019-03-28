import { Selection } from 'office-ui-fabric-react/lib/utilities/selection';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
// import { NewsCardDialog } from '../components/NewsCards/NewsCardDialog';
import { NewsCards } from '../components/NewsCards/NewsCards';
import { INewsCard, INewsCards } from '../models/NewsCards';
import aiProvider from '../providers/ai-v1';

enum Dialog {
  None,
  About,
  NewsCard,
}

export interface INewsCardPageState {
  currentDialog: Dialog,
  newsCards?: INewsCards,
  newsCard?: INewsCard,
  selection: Selection,
  error?: string,
}

const selection = new Selection();

export interface INewsCardPageProps extends RouteComponentProps {
  newsCards?: INewsCards;
}

class NewsCardPageBase extends React.PureComponent<INewsCardPageProps, INewsCardPageState> {
  public state: INewsCardPageState = {
    currentDialog: Dialog.None,
    selection,
  }

  public newsCardsRef: React.RefObject<NewsCards> = React.createRef<NewsCards>();

  public routeToAi = () => this.props.history.push('/');
  public isAboutDialogOpen = () => this.state.currentDialog === Dialog.About;
  public openAboutDialog = () => this.setState({ currentDialog: Dialog.About });

  public closeAboutDialog = (): void => {
    this.setState({
      currentDialog: Dialog.None,
    });
  }

  public onOpenNewsCard = (newsCard: INewsCard) => {

    if (this.state.newsCard !== newsCard) {
      this.setState({
        newsCard,
      });
      window.open(newsCard.response, newsCard.response);
    }
  };

  public currentNewsCards = () => {
    return this.state.newsCards || this.props.newsCards || {
      sources: [],
    };
  }

  public currentNewsCard = () => {
    return this.state.newsCard || this.currentNewsCards().sources.length && this.currentNewsCards().sources[0] || undefined;
  }

  public updateNewsCards = async (): Promise<void> => {
    try {
      const newsCards = await aiProvider.getNewsCards();
      const newsCard = newsCards.sources.length && newsCards.sources[0] || undefined;
      this.setState({ newsCards, newsCard });
    } catch (ex) {
      this.setState({
        error: ex.message,
        newsCards: {
          ...this.state.newsCards,
          sources: [],
        }
      })
    }
  }

  public componentDidMount(): void {
    this.updateNewsCards();
  }

  public currentNewsCardsTimeFormatted() {
    const cards = this.currentNewsCards();
    if (cards.time) {
      const dte = new Date(cards.time);
      return dte.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
    return '';
  }

  public render(): React.ReactNode {
    const cards = this.currentNewsCards();
    const newsCard = this.currentNewsCard();

    const newsCardHeight = newsCard ? 'minmax(100px, max-content)' : '0px';
    const layout: React.CSSProperties = {
      display: 'grid',
      gridTemplateRows: `min-content minmax(max-content, 200px) ${newsCardHeight} minmax(100px, 80vh) 1px`,
    };
    const dateTime = this.currentNewsCardsTimeFormatted();

    return (
      <div style={layout}>
        <h1 className='ms-font-xl' style={{ padding: 10 }}>
          News AI Responses as of {dateTime}
        </h1>

        <div style={{ position: 'relative' }}>
          <NewsCards selected={newsCard} newsCards={cards} onOpenNewsCard={this.onOpenNewsCard} ref={this.newsCardsRef} />
        </div>

        {/* <div style={{ position: 'relative', overflow: 'hidden' }}>
          <NewsCardDialog
            newsCard={newsCard}
          />
        </div> */}
      </div >
    );
  }

  public dismissNewsCard = () => this.setState({ currentDialog: Dialog.None, newsCard: undefined });
}

const NewsCardPage = withRouter(NewsCardPageBase);
export { NewsCardPage };

