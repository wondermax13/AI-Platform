
import * as React from 'react';
import { ISingleNewsCardScore, ISingleNewsCardScoreModel } from '../../models/NewsCards';
import { Persona, PersonaSize } from 'office-ui-fabric-react';

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


export interface INewsCardDialogProps {
  newsCard?: ISingleNewsCardScore;
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
          <h2 className='ms-font-l' style={{ margin: 0, textAlign: 'right', whiteSpace: 'nowrap' }}>Score Card</h2>
        </div>
        <div style={{ gridArea: 'chart', position: 'relative' }}>
          <div style={{ width: '100%', height: '100%', backgroundColor: 'yellow' }}>x</div>
        </div>
      </div>
    );
  }

  public renderSingleNewsResponse(newsResponse: ISingleNewsCardScoreModel) {

      const persona = (
        <Persona
          styles={{ root: { gridArea: 'picon' } }}
          coinProps={{ style: { backgroundColor: 'black' } }}
          size={PersonaSize.size32}
          imageUrl='https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png'
          initialsColor='#efefef'
          imageInitials=' '
        />
      );

      return (
        <div style={personaGrid}>
          {persona}
          <text style={{ gridArea: 'ptext' }} className='ms-font-s'>{newsResponse.response}</text>
        </div>
      )
    }
}
