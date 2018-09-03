import {
  Persona,
  PersonaSize
} from 'office-ui-fabric-react';
import * as React from 'react';
import { ICommon } from '../../models/Common';
import { IAnswer, IQuestionModel } from '../../models/Question';
import { avatarByCyclingIndex } from '../../providers/avatars';

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

// const rightPersonaGrid: React.CSSProperties = {
//   ...personaGrid,
//   gridTemplateAreas: `
//     'pname . picon'
//     'ptext . picon'
//   `,
//   gridTemplateColumns: 'auto 10px 40px',
//   gridTemplateRows: 'min-content min-content',
//   textAlign: 'right',
// }

export class Feed extends React.Component<ICommon, {}> {
  constructor(props: ICommon) {
    super(props);

    this.getLocation = this.getLocation.bind(this);
    this.onClickLocation = this.onClickLocation.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.renderAnswer = this.renderAnswer.bind(this);
  }

  public getLocation(question: IQuestionModel): string {
    return question.channels.reduce((acc: string, nex: string) => acc + (acc.length > 0 ? ', ' : '') + nex, '');
  }

  public onClickLocation(): void {
    console.log(arguments);
  }

  public renderAnswer(answer: IAnswer, index: number) {
    return (
      <div style={personaGrid}>
        <Persona
          styles={{ root: { gridArea: 'picon' } }}
          size={PersonaSize.size32}
          // imageUrl='https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png'
          imageUrl={answer.ai && answer.ai.avatar && `client/avatars/${answer.ai.avatar}` || avatarByCyclingIndex(index)}
          imageInitials='A3'
        />
        <text style={{ gridArea: 'pname' }} className='ms-font-xs  ms-fontWeight-bold'>{answer.ai && answer.ai.name || answer.aiId}</text>
        <text style={{ gridArea: 'ptext' }} className='ms-font-s'>
          {answer.answer}
        </text>
      </div>
    )
  }

  public renderQuestion(item: IQuestionModel, index: number) {

    // const questioner: IPersonaSharedProps = {
    //   imageUrl: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png',
    //   imageInitials: 'AL',
    //   text: 'Annie Lindqvist',
    //   secondaryText: 'Software Engineer',
    //   tertiaryText: 'In a meeting',
    //   optionalText: 'Available at 4:00pm'
    // };

    const answerItems = item.answers && item.answers.slice(0, 10) || [];
    const answers = answerItems.map(this.renderAnswer);

    return (
      <div key={index} style={{ borderBottom: '1pt solid #eee', padding: 10 }}>
        <div style={personaGrid}>
          <Persona
            size={PersonaSize.size32}
            styles={{ root: { gridArea: 'picon' } }}
            // imageUrl='https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png'
            imageInitials='A3'
          />
          <div style={{ gridArea: 'pname' }} className='ms-font-s ms-fontWeight-bold'>
            <text className='ms-font-xs' style={{ float: 'right' }}>
              {this.getLocation(item)}
            </text>
            {'Annie Lindqvist'}
          </div>
          <text style={{ gridArea: 'ptext' }} className='ms-font-m-plus'>
            {item.question}
          </text>
        </div>
        <div style={{ margin: 20 }}>
          {answers}
        </div>
      </div>
    );
  }

  public render(): React.ReactNode {
    return (
      <div style={{ boxShadow: '#333 1px -1px 67px' }}>
        {this.props.questions.slice(0, 15).map(this.renderQuestion)}
      </div>
    )
  }
}
