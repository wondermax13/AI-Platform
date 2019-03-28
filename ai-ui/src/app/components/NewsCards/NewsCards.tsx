import { ScrollablePane, Sticky, StickyPositionType } from 'office-ui-fabric-react';
import { DetailsList } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList';
import { CheckboxVisibility, IColumn, IDetailsHeaderProps, IDetailsGroupRenderProps } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList.types';
import { IObjectWithKey, Selection, SelectionMode } from 'office-ui-fabric-react/lib/utilities/selection';
import * as React from 'react';
import { INewsCard, INewsCards } from '../../models/NewsCards';

export interface INewsCardsProps {
  selected?: INewsCard;
  newsCards: INewsCards;
  onOpenNewsCard: (newsCard: INewsCard) => void;
  style?: React.CSSProperties;
}

export class NewsCards extends React.PureComponent<INewsCardsProps, {}> {
  public columns: IColumn[] = [
    {
      key: 'Articles',
      name: 'Articles',
      fieldName: 'name',
      minWidth: 100,
      isResizable: true,
      data: 'string',
      isPadded: false,
    }
  ];

  public domRef = React.createRef<HTMLDivElement>();
  private selector: Selection = new Selection();

  public onActiveItemChanged = (item: { key: string }) => {
    if (this.props.onOpenNewsCard) {
      const card = this.props.newsCards.sources.find(n => n.response === item.key);
      if (card) {
        this.props.onOpenNewsCard(card);
      }
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

  public currentItems = (): INewsCard[] & IObjectWithKey[] => {
    return this.props.newsCards.sources.map((card: INewsCard) => {
      return {
        key: card.response,
        ...card,
      };
    });
  }

  public getItemsKey = (items: Array<{ name?: string, key?: string | number }>) => {
    return `${this.props.newsCards.time}:${items.map(item => item.key || item.name || 'n/a').join(',')}`;
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
    const currentNewsCardKey = this.props.selected && this.props.selected.response || undefined;
    if (currentNewsCardKey !== currentKey) {
      const items = this.currentItems();
      const index = items.findIndex(item => item.response === currentNewsCardKey);
      this.selector.setIndexSelected(index, true, false);
    }
  }

  public render(): React.ReactNode {
    const selector = this.currentSelector();

    const links = this.props.newsCards.sources.map(s => {
      const url = new URL(s.response);
      return {
        key: s.response,
        group: url.hostname,
        name: url.pathname
      };
    }).sort((a, b) => a.group > b.group ? 1 : a.group < b.group ? -1: 0);

    const groupNames = [...new Set(links.map(l => l.group))];
    const groups = groupNames.map(g => ({
      key: g,
      name: g,
      startIndex: links.findIndex(v => v.group === g),
      count: links.filter(l => l.group === g).length
    }));

    const groupProps: IDetailsGroupRenderProps = {
      showEmptyGroups: true,
    };

    return (
      <div ref={this.domRef}>
        <ScrollablePane >
          <DetailsList
            selection={selector}
            selectionMode={SelectionMode.single}
            items={links}
            groups={groups}
            columns={this.columns}
            compact={true}
            // selection={selection}
            checkboxVisibility={CheckboxVisibility.hidden}
            // styles={{ root: { color: 'white', backgroundColor: 'rgb(0, 120, 212)' } }}
            // data-is-focusable='true'
            groupProps={groupProps}
            onActiveItemChanged={this.onActiveItemChanged}
            onRenderDetailsHeader={this.renderHeader}
          />
          {/* <Sticky stickyPosition={StickyPositionType.Footer}>
            <div style={{ height: '1px' }} />
          </Sticky> */}
        </ScrollablePane>
      </div>
    );
  }
}
