import { Pivot } from 'office-ui-fabric-react/lib/components/Pivot/Pivot';
import { PivotItem } from 'office-ui-fabric-react/lib/components/Pivot/PivotItem';
import { IPivotItemProps } from 'office-ui-fabric-react/lib/components/Pivot/PivotItem.types';
import * as React from 'react';
import { Route, Router } from 'react-router';
import { AIFeedPage } from '../pages/AIFeedPage';
import { ScoreCardPage } from '../pages/ScoreCardPage';
import { NewsCardPage } from '../pages/NewsCardPage';
import { IAppProps } from './App';
import { History } from './History';

export const AppRouter = { history: History.current };

export class Routes extends React.PureComponent<IAppProps> {
  public render(): React.ReactNode {
    return (
      <Router history={History.current}>
        <React.Fragment>
          <Route exact={true} path='/' render={this.renderAIFeedPage} />
          <Route exact={true} path='/scorecards' render={this.renderScoreCardPage} />
          <Route exact={true} path='/newscards' render={this.renderNewsCardPage} />
        </React.Fragment>
      </Router>
    );
  }

  public renderLogo = (props: IPivotItemProps): JSX.Element | null => {
    return <span>Ai2Ai</span>;
  }

  public renderMenu = (index: number): React.ReactNode => {
    const style: React.CSSProperties = {
      backgroundColor: 'white',
      boxShadow: '#333 1px -1px 67px',
      height: 'calc(100vh - 50px)',
      padding: 0,
    }
    return (
      <Pivot initialSelectedIndex={index}>
        {/* <PivotItem
          headerText="AI2AI"
          style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
          onRenderItemLink={this.renderLogo}
        /> */}

        <PivotItem
          headerText="Social AI"
          style={style}
        >
          <AIFeedPage questions={this.props.questions} ais={this.props.ais} />
        </PivotItem>

        <PivotItem
          headerText="Financial AI"
          style={style}
        >
          <ScoreCardPage scoreCards={this.props.scoreCards} />
        </PivotItem>

        <PivotItem
          headerText="News AI"
          style={style}
        >
          <NewsCardPage newsCards={this.props.newsCards} />
        </PivotItem>

        <PivotItem
          headerText="About"
          style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
        >
          <h3><a href="/client/privacy.html" target="_new">Privacy Policy</a></h3>
          <h3><a href="/client/attributions.html" target="_new">Attributions</a></h3>
        </PivotItem>

      </Pivot>
    )
  }

  public renderAIFeedPage = (): React.ReactNode => {
    return this.renderMenu(0);
  }

  public renderScoreCardPage = (): React.ReactNode => {
    return this.renderMenu(1);
  }

  public renderNewsCardPage = (): React.ReactNode => {
    return this.renderMenu(2);
  }
}
