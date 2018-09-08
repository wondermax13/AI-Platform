import * as React from 'react';
import { IScoreCard, IScoreCardScore } from '../../models/ScoreCards';
import { Icon } from 'office-ui-fabric-react';

export interface IScoreCardDialogProps {
  scoreCard?: IScoreCard;
}

export class ScoreCardDialog extends React.Component<IScoreCardDialogProps> {

  public render(): React.ReactNode {
    if (!this.props.scoreCard) {
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
    const listStyle: React.CSSProperties = {
      alignSelf: 'center',
      gridArea: 'scores',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(125px, min-content))',
    };
    return (
      <div style={cardStyle}>
        <div style={{ gridArea: 'title', display: 'grid', gridTemplateColumns: 'auto min-content', alignItems: 'baseline', }}>
          <h1 className='ms-font-xxl' style={{ margin: 0 }}>{this.props.scoreCard.name}</h1>
          <h2 className='ms-font-l' style={{ margin: 0, textAlign: 'right', whiteSpace: 'nowrap' }}>Score Card</h2>
        </div>
        <div style={listStyle}>
          {this.props.scoreCard.scores.map(this.renderScore).splice(0, 1)}
          {this.props.scoreCard.scores.map(this.renderScore)}
          {this.props.scoreCard.scores.map(this.renderScore).splice(1, 2)}
        </div>
        <div style={{ gridArea: 'chart', position: 'relative' }}>
          <div style={{ width: '100%', height: '100%', backgroundColor: 'yellow' }}>x</div>
        </div>
      </div>
    );
  }

  public renderScore = (item: IScoreCardScore) => {
    return (
      <div style={{ display: 'grid', gridGap: 2, gridTemplateColumns: '50px 20px 40px 50px', alignItems: 'center', }}>
        <h3 className='ms-font-l' style={{ margin: 0, textAlign: 'left' }}>{item.stock}</h3>
        <Icon iconName='ArrowUpRight8' style={{ alignSelf: 'center', margin: 0, color: 'lightgreen' }} />
        <h3 className='ms-font-m-plus' style={{ margin: 0, textAlign: 'left' }}>{item.score}</h3>
        <div/>
      </div>
    )
  }
}
