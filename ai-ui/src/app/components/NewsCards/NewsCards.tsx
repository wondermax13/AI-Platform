// import { ScrollablePane, Sticky, StickyPositionType } from 'office-ui-fabric-react';
// import { DetailsList } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList';
// import { CheckboxVisibility, IColumn, IDetailsHeaderProps } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList.types';
// import { Icon } from 'office-ui-fabric-react/lib/components/Icon/Icon';
// import { Selection, SelectionMode } from 'office-ui-fabric-react/lib/utilities/selection';
// import { IObjectWithKey } from 'office-ui-fabric-react/lib/utilities/selection';
import * as React from 'react';
import { ISingleNewsCardScore } from '../../models/NewsCards';


const personaGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateAreas: `
    'picon pname'
    'picon ptext'
  `,
  gridTemplateColumns: '40px auto',
  gridTemplateRows: 'min-content min-content',
  marginTop: 10,
  marginBottom: 10,
};


export interface INewsCardsProps {
  selected?: string;
  newsCards: ISingleNewsCardScore;
  onOpenNewsCard: (newsCard: string) => void;
  style?: React.CSSProperties;
}

export class NewsCards extends React.PureComponent<INewsCardsProps, {}> {

  /* This should be a single column 

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
      key: 'bottomscore',
      name: 'Low Scores',
      ariaLabel: 'Bottom Stock Pick',
      minWidth: 60,
      fieldName: 'bottom',
      isPadded: false,
      isCollapsable: true,
      onRender: (item: string) => {
        return (
          <React.Fragment>
            '{item}'
          </React.Fragment>
        );
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
      onRender: (item: string) => {
        return (
          <React.Fragment>
            {item}
          </React.Fragment>
        );
      }
    },
  ];
*/

  public domRef = React.createRef<HTMLDivElement>();
  // private selector: Selection = new Selection();

  public onActiveItemChanged = (item: string) => {
    if (this.props.onOpenNewsCard) {
      this.props.onOpenNewsCard(item);
    }
  }

  /* Render Header 
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
*/


  public currentItems = (): string | number | undefined => {
    return this.props.newsCards.response;
  }
  

/*
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
    const currentNewsCardKey = this.props.selected && this.props.selected.name || undefined;
    if (currentNewsCardKey !== currentKey) {
      const items = this.currentItems();
      const index = items.findIndex(item => item.name === currentNewsCardKey);
      this.selector.setIndexSelected(index, true, false);
    }
  }
*/

  public render(): React.ReactNode {
    
    return (

    <div style={personaGrid}>
      <text style={{ gridArea: 'pname' }} className='ms-font-xs  ms-fontWeight-bold'>'name'</text>
      <text style={{ gridArea: 'ptext' }} className='ms-font-s'>'answer'</text>
    </div>
    
    );

    }
}
