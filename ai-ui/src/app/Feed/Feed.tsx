// import { app as appCss, section as sectionCss, column as columnCss } from './App.scss';
import { DocumentCard, DocumentCardActions, DocumentCardActivity, DocumentCardLocation, DocumentCardTitle, DocumentCardType } from 'office-ui-fabric-react';
import * as React from 'react';
import { ICommon } from '../Common';
import { IAnswer, IQuestionModel } from '../models/Question';
import { avatarByCyclingIndex } from '../providers/avatars';

class Feed extends React.Component<ICommon, {}> {
  constructor(props: ICommon) {
    super(props);

    this.getLocation = this.getLocation.bind(this);
    this.onClickLocation = this.onClickLocation.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.renderAnswer = this.renderAnswer.bind(this);
  }

  public getLocation(question: IQuestionModel): string {
    // return question.to.reduce((acc: string, nex: { type: string, value: string }) => acc + (acc.length > 0 ? ', ' : '') + nex.value, '');
    return question.channels.reduce((acc: string, nex: string) => acc + (acc.length > 0 ? ', ' : '') + nex, '');
  }

  public onClickLocation(): void {
    console.log(arguments);
  }

  public renderAnswer(answer: IAnswer, index: number) {
    return <DocumentCardActivity
      activity={answer.answer}
      people={
        [
          {
            name: `${answer.ai && answer.ai.name || answer.aiId}`,
            profileImageSrc: answer.ai && answer.ai.avatar && `client/avatars/${answer.ai.avatar}` || avatarByCyclingIndex(index)
          }
        ]
      }
    />
  }

  public renderQuestion(item: IQuestionModel, index: number) {
    return <DocumentCard
      key={index}
      type={DocumentCardType.normal}
    >
      <div className="ms-DocumentCard-details">
        <DocumentCardLocation
          location={this.getLocation(item)}
          ariaLabel={this.getLocation(item)}
          onClick={this.onClickLocation}

        />
        <DocumentCardTitle
          title={item.question}
          shouldTruncate={false}
        />
        <DocumentCardActions
          actions={
            [
              {
                ariaLabel: 'share action',
                iconProps: { iconName: 'Share' },
              },
              {
                ariaLabel: 'pin action',
                iconProps: { iconName: 'Pin' },
              },
              {
                ariaLabel: 'ringer action',
                iconProps: { iconName: 'Ringer' },
              },
            ]
          }
          views={432}
        />
        {item.answers!.slice(0, 10).map(this.renderAnswer)}
      </div>
    </DocumentCard>
  }

  public render(): React.ReactNode {
    return this.props.questions.slice(0, 15).map(this.renderQuestion);
  }
}
export default Feed;