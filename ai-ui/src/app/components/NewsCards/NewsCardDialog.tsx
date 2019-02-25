import * as React from 'react';
import { INewsCard } from '../../models/NewsCards';

export interface INewsCardDialogProps {
  newsCard?: INewsCard;
}

export class NewsCardDialog extends React.Component<INewsCardDialogProps> {

  public render(): React.ReactNode {
    if (!this.props.newsCard) {
      return <span />;
    }
    const cardStyle: React.CSSProperties = {
      padding: 10,
      gridTemplateAreas: `
        'title title'
        '. .'
        'scores chart'
      `,
      gridTemplateColumns: 'auto min-content',
      gridTemplateRows: 'min-content 10px min-content',
      display: 'grid',
      backgroundColor: 'rgb(0, 120, 212)',
      color: 'white',
    };
    return (
      <div style={cardStyle}>
        <div style={{ gridArea: 'title', display: 'grid', gridTemplateColumns: 'auto min-content', alignItems: 'baseline', }}>
          <h1 className='ms-font-xxl' style={{ margin: 0 }}>{this.props.newsCard.response}</h1>
        </div>
      </div>
    );
  }
}
