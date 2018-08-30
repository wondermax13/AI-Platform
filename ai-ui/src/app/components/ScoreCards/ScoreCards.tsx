import { DetailsList } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList';

import * as React from 'react';

import { IScoreCards, IScoreCard } from '../../models/ScoreCard';
import { IColumn, CheckboxVisibility, IDetailsHeaderProps } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList.types';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon/Icon';
import { SelectionMode/*, Selection */ } from 'office-ui-fabric-react/lib/utilities/selection';
import { ScrollablePane, Sticky, StickyPositionType } from 'office-ui-fabric-react';
export interface IScoreCardsProps {
  selected?: IScoreCard;
  scoreCards: IScoreCards;
  onOpenScoreCard: (scoreCard: IScoreCard) => void;
  style?: React.CSSProperties;
}

export class ScoreCards extends React.PureComponent<IScoreCardsProps, {}> {
  public columns: IColumn[] = [
    {
      key: 'NewsSource',
      name: 'News Source',
      fieldName: 'name',
      minWidth: 100,
      isResizable: true,
      data: 'string',
      isPadded: true,
    },
    {
      key: 'bottomicon',
      name: '',
      fieldName: 'bottom',
      ariaLabel: 'bottom pick icon',
      isPadded: false,
      minWidth: 12,
      maxWidth: 12,
      isCollapsable: true,
      onRender: (item: IScoreCard) => {
        return <Icon iconName='ArrowDownRight8' style={{ width: 12, height: 12, color: 'red' }} />;
      }
    },
    {
      key: 'bottomscore',
      name: 'Low Scores',
      ariaLabel: 'Bottom Stock Pick',
      minWidth: 100,
      fieldName: 'bottom',
      isPadded: false,
      isCollapsable: true,
      onRender: (item: IScoreCard) => {
        return (
          <React.Fragment>
            {item.bottom.stock} {item.bottom.score}
          </React.Fragment>
        );
      }
    },
    {
      key: 'topicon',
      name: '',
      fieldName: 'top',
      ariaLabel: 'top pick icon',
      isPadded: false,
      minWidth: 12,
      maxWidth: 12,
      className: 'noMargin noPadding',
      isCollapsable: false,
      onRender: (item: IScoreCard) => {
        return <Icon iconName='ArrowUpRight8' style={{ color: 'lightgreen' }} />;
      }
    },
    {
      key: 'topscore',
      name: 'Top Scores',
      ariaLabel: 'Top Stock Pick',
      isPadded: false,
      fieldName: 'top',
      minWidth: 100,
      isCollapsable: false,
      onRender: (item: IScoreCard) => {
        return (
          <React.Fragment>
            {item.top.stock} {item.top.score}
          </React.Fragment>
        );
      }
    },
  ];

  public domRef = React.createRef<HTMLDivElement>();

  public onActiveItemChanged = (item: IScoreCard) => {
    if (this.props.onOpenScoreCard) {
      this.props.onOpenScoreCard(item);
    }
  }

  public renderHeader = (props?: IDetailsHeaderProps, defaultRender?: (props?: IDetailsHeaderProps) => JSX.Element | null): JSX.Element | null => {
    return (
      <Sticky stickyPosition={StickyPositionType.Header}>
        {defaultRender && defaultRender(props) || undefined}
      </Sticky>
    );
  }

  public render(): React.ReactNode {
    // const selection: Selection = new Selection({ selectionMode: SelectionMode.single });
    // if (this.props.selected) {
    //   const index = this.props.scoreCards.sources.findIndex((item: IScoreCard) => this.props.selected === item);
    //   selection.setIndexSelected(index, true, true);
    // }

    return (
      <div ref={this.domRef}>
        <ScrollablePane >
          <DetailsList
            selectionMode={SelectionMode.single}
            items={this.props.scoreCards.sources}
            columns={this.columns}
            compact={true}
            // selection={selection}
            checkboxVisibility={CheckboxVisibility.hidden}
            styles={{ root: { color: 'white', backgroundColor: 'rgb(0, 120, 212)' } }}
            data-is-focusable='true'
            onActiveItemChanged={this.onActiveItemChanged}
            onRenderDetailsHeader={this.renderHeader}
          />
          <Sticky stickyPosition={StickyPositionType.Footer}>
            <div style={{ height: '1px' }} />
          </Sticky>
        </ScrollablePane>
      </div>
    );
  }
}
