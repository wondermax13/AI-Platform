import { ScrollablePane, Sticky, StickyPositionType } from 'office-ui-fabric-react';
import { DetailsList } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList';
import { CheckboxVisibility, IColumn, IDetailsHeaderProps } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList.types';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon/Icon';
import { IObjectWithKey, Selection, SelectionMode } from 'office-ui-fabric-react/lib/utilities/selection';
import * as React from 'react';
import { IScoreCard, IScoreCards } from '../../models/ScoreCards';
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
      minWidth: 40,
      isResizable: true,
      data: 'string',
      isPadded: false,
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
      minWidth: 60,
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
      minWidth: 60,
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
  private selector: Selection = new Selection();

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

  public getCurrentlySelectedKey = (): string | number | undefined => {
    const selections = this.selector.getSelection();
    return selections.length && selections[0].key || undefined;
  }

  public currentItems = (): IScoreCard[] & IObjectWithKey[] => {
    return this.props.scoreCards.sources.map((card: IScoreCard) => {
      return {
        key: card.name,
        ...card,
      };
    });
  }

  public getItemsKey = (items: Array<{ name?: string, key?: string | number }>) => {
    return `${this.props.scoreCards.time}:${items.map(item => item.key || item.name || 'n/a').join(',')}`;
  }

  public currentSelector = (): Selection => {
    const items = this.currentItems();
    const oldItems = this.selector.getItems();
    const thisKey = this.getItemsKey(items);
    const oldKey = this.getItemsKey(oldItems);
    if (thisKey !== oldKey) {
      this.selector.setItems(items, true);
      console.log('new', thisKey, 'old', oldKey);
    }

    return this.selector;
  }

  public componentDidMount(): void {
    this.setDefaultSelectedIfNeeded();
  }
  public componentDidUpdate(): void {
    this.setDefaultSelectedIfNeeded();
  }

  public setDefaultSelectedIfNeeded = (): void => {
    const currentKey = this.getCurrentlySelectedKey();
    const currentScoreCardKey = this.props.selected && this.props.selected.name || undefined;
    if (currentScoreCardKey !== currentKey) {
      const items = this.currentItems();
      const index = items.findIndex(item => item.name === currentScoreCardKey);
      this.selector.setIndexSelected(index, true, false);
    }
  }

  public render(): React.ReactNode {
    const selector = this.currentSelector();

    return (
      <div ref={this.domRef}>
        <ScrollablePane >
          <DetailsList
            selection={selector}
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
