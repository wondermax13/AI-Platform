import React from 'react';
// import { app as appCss, section as sectionCss, column as columnCss } from './App.scss';
import {
  DocumentCard,
  DocumentCardType,
  DocumentCardTitle,
  DocumentCardActivity,
  DocumentCardActions,
  DocumentCardLocation,
  autobind
} from 'office-ui-fabric-react';
import { Question } from '../models';

export interface IFeedState {
}
export interface IFeedProps {
  questions: Array<Question>;
  channels: Array<{ name: string, default?: boolean }>;
  humans: Array<{ name: string, default?: boolean }>;
  ai: Array<{ name: string, default?: boolean }>;
  userId: string;
  recentlyAddedQuestion: Question;
}
class Feed extends React.Component<IFeedProps, IFeedState> {
  constructor(props: IFeedProps) {
    super(props);

    this.state = {
    };
  }

  @autobind
  public getLocation(question: Question): string {
    // return question.to.reduce((acc: string, nex: { type: string, value: string }) => acc + (acc.length > 0 ? ', ' : '') + nex.value, '');
    return question.channels.reduce((acc: string, nex: string) => acc + (acc.length > 0 ? ', ' : '') + nex, '');
  }

  @autobind
  public onClickLocation(): void {
    console.log(arguments);
  }

  public render(): React.ReactNode {
    const image1 = 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png';
    return this.props.questions.map((item: Question, index: number) =>
      (
        <DocumentCard
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
                  iconProps: { iconName: 'Share' },
                  ariaLabel: 'share action',
                },
                {
                  iconProps: { iconName: 'Pin' },
                  ariaLabel: 'pin action'
                },
                {
                  iconProps: { iconName: 'Ringer' },
                  ariaLabel: 'ringer action'
                },
              ]
            }
            views={432}
          />
          <DocumentCardActivity
            activity="Submitted a few minutes ago"
            people={
              [
                {
                  name: 'Kat Larrson',
                  profileImageSrc: image1
                }
              ]
            }
          />
        </div>

        </DocumentCard>
      ));
  }
}
export default Feed;