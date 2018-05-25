// import { app as appCss, section as sectionCss, column as columnCss } from './App.scss';
import {
  DocumentCard,
  DocumentCardActions,
  DocumentCardActivity,
  DocumentCardLocation,
  DocumentCardTitle,
  DocumentCardType,
} from 'office-ui-fabric-react';
import * as React from 'react';
import { IQuestionModel } from '../models/Question';

export interface ICommonProps {
  channels: Array<{ name: string, default?: boolean }>;
  recentlyAddedQuestion?: IQuestionModel;
  humans: Array<{ name: string, default?: boolean }>;
}

export interface IFeedProps extends ICommonProps {
  userId: string;
  ai: Array<{ name: string, default?: boolean }>;
  questions: IQuestionModel[];
}
class Feed extends React.Component<IFeedProps, {}> {
  constructor(props: IFeedProps) {
    super(props);

    this.getLocation = this.getLocation.bind(this);
    this.onClickLocation = this.onClickLocation.bind(this);
  }

  public getLocation(question: IQuestionModel): string {
    // return question.to.reduce((acc: string, nex: { type: string, value: string }) => acc + (acc.length > 0 ? ', ' : '') + nex.value, '');
    return question.channels.reduce((acc: string, nex: string) => acc + (acc.length > 0 ? ', ' : '') + nex, '');
  }

  public onClickLocation(): void {
    console.log(arguments);
  }

  public render(): React.ReactNode {
    const image1 = 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png';
    return this.props.questions.map((item: IQuestionModel, index: number) =>
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