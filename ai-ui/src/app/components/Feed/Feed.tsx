import { Persona, PersonaSize, Shimmer } from 'office-ui-fabric-react';
import * as React from 'react';
import { ICommon } from '../../models/Common';
import { IAnswer, IQuestionModel } from '../../models/Question';

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

  public renderAnswerShimmer() {
    const name = <Shimmer width={100} />;
    const answer = <Shimmer width={200} />;
    const persona = (
      <Persona
        styles={{ root: { gridArea: 'picon' } }}
        coinProps={{ style: { backgroundColor: 'black' } }}
        size={PersonaSize.size32}
        imageUrl={undefined}
        initialsColor='#efefef'
        imageInitials=' '
      />
    );
    return (
      <div style={personaGrid}>
        {persona}
        <text style={{ gridArea: 'pname', marginBottom: 10 }} className='ms-font-xs  ms-fontWeight-bold'>{name}</text>
        <text style={{ gridArea: 'ptext' }} className='ms-font-s'>{answer}</text>
      </div>
    );
  }

  public renderAnswer(answer: IAnswer, index: number) {
    const artificial = this.props.ais.find(ai => ai.id === answer.aiId);
    const name = artificial && artificial.name || <Shimmer width={75} />;
    const avatar = artificial && artificial.avatar && `client/avatars/${artificial.avatar}` || undefined;
    const persona = (
      <Persona
        styles={{ root: { gridArea: 'picon' } }}
        coinProps={{ style: { backgroundColor: 'black' } }}
        size={PersonaSize.size32}
        imageUrl={avatar}
        initialsColor='#efefef'
        imageInitials=' '
      />
    );
    return (
      <div style={personaGrid}>
        {persona}
        <text style={{ gridArea: 'pname' }} className='ms-font-xs  ms-fontWeight-bold'>{name}</text>
        <text style={{ gridArea: 'ptext' }} className='ms-font-s'>{answer.answer}</text>
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
    const answers = answerItems.length > 0 ? answerItems.map(this.renderAnswer) : this.renderAnswerShimmer();

    return (
      <div key={index} style={{ borderBottom: '1pt solid #eee', padding: 10 }}>
        <div style={personaGrid}>
          <Persona
            size={PersonaSize.size32}
            styles={{ root: { gridArea: 'picon' } }}
            imageUrl='https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png'
            imageInitials='AL'
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
    return this.props.questions.slice(0, 15).map(this.renderQuestion);
  }
}
