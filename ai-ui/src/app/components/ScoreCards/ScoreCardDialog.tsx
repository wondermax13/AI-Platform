// import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
// import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
// import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
// import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';
import { IScoreCard, IScoreCardScore } from '../../models/ScoreCard';
import { Icon } from 'office-ui-fabric-react';
// import { DocumentCard } from 'office-ui-fabric-react/lib/components/DocumentCard/DocumentCard';

// import { DocumentCardTitle } from 'office-ui-fabric-react';
// import { Callout } from 'office-ui-fabric-react/lib/components/Callout/Callout';
// import { DocumentCard } from 'office-ui-fabric-react';
// import { ScoreCards } from './ScoreCards';
// import { IQuestionModel } from '../../models/Question';

// import { app as appCss, section as sectionCss, column as columnCss } from './App.scss';
// import { ICommon } from '../../models/Common';

// export interface ITargetOption {
//   category?: string;
//   key: string;
//   text: string;
//   selected: boolean;
//   onChangedHandler?: (ev: React.FormEvent<HTMLElement>, isChecked: boolean) => void;
// }

// export interface IScoreCardDialogState {
// channelOptions: ITargetOption[];
// humanOptions: ITargetOption[];
// question?: string;
// }

export interface IScoreCardDialogProps {
  // defaultChannel?: string;
  scoreCard?: IScoreCard;

  // doneAction: (addedQuestion?: IQuestionModel) => void;
  // createQuestionAction: (question: string, channels: string[], individuals?: string[]) => Promise<IQuestionModel | undefined>;
}

export class ScoreCardDialog extends React.Component<IScoreCardDialogProps> {

  // public onChangeHandlers: {
  //   [key: string]: ([]: React.FormEvent<HTMLElement>, isChecked: boolean) => void;
  // };

  constructor(props: IScoreCardDialogProps) {
    super(props);

    // if (!props.doneAction || !props.channels || !props.humans || !props.createQuestionAction) {
    //   throw new Error('channels, humans, doneAction and channels are required');
    // }

    // const humanOptions = this.createOptions(props.humans, 'Human');
    // const channelOptions = this.createOptions(props.channels, 'Channel');

    this.state = {
      // channelOptions,
      // humanOptions,
    };
  }

  // public renderFooter(): JSX.Element {
  //   // const margin = { margin: '5px' };
  //   return (
  //     <div className="ms-textAlignCenter">
  //       {/* <DefaultButton onClick={this.dismiss} style={margin}>Cancel</DefaultButton> */}
  //       {/* <PrimaryButton onClick={this.createQuestionFromInputs} style={margin}>Submit</PrimaryButton> */}
  //     </div>
  //   );
  // }

  public render(): React.ReactNode {
    if (!this.props.scoreCard) {
      return <span />;
    }

    // const data = [
    //   {"name":"Workout", "data": {"2017-01-01": 3, "2017-01-02": 4 }},
    //   {"name":"Call parents", "data": {"2017-01-01": 5, "2017-01-02": 3 }}
    // ];

    // and
    // <LineChart data={data} />

    // const style: React.CSSProperties = {
    //   // boxSizing: 'border-box',
    //   // boxShadow: '0px 0px 5px 0px',
    //   // borderWidth: '1px',
    //   // borderStyle: 'solid',
    //   // borderColor: 'rgb(234, 234, 234)',
    //   // outline: 'transparent',
    //   // padding: '5px',
    //   // margin: '5px',
    //   // marginLeft: '-5px',
    // };

    const cardStyle: React.CSSProperties = {
      border: '1pt solid black',
      boxShadow: 'inset #212121 0px 0px 5px 0px',
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
    // const repeat = 5 * this.props.scoreCard.scores.length * 3;
    // const cols = `repeat(${repeat}, min-content)`;
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
      // </Panel>
    );
  }

  public renderScore = (item: IScoreCardScore) => {
    return (
      // <div style={{ display: 'grid', gridTemplateColumns: 'minmax(min-content, min-content) minmax(100px, min-content) auto', }} key={item.stock}>
      <div style={{ display: 'grid', gridGap: 2, gridTemplateColumns: '50px 20px 40px 50px', alignItems: 'center', }}>
        <h3 className='ms-font-l' style={{ margin: 0, textAlign: 'left' }}>{item.stock}</h3>
        <Icon iconName='ArrowUpRight8' style={{ alignSelf: 'center', margin: 0, color: 'lightgreen' }} />
        <h3 className='ms-font-l' style={{ margin: 0, textAlign: 'left' }}>{item.score}</h3>
        <div/>
      </div>
    )
  }

  // public createOptions(items: Array<{ name: string, default?: boolean }>, category: string): ITargetOption[] {
  //   return items.map((value: { name: string, default?: boolean }) => this.createOption(value, category, value.default));
  // }

  // public createOption(value: { name: string, default?: boolean }, category: string, selected?: boolean): ITargetOption {
  //   const option: ITargetOption = { key: value.name, text: value.name, category, selected: selected || false };
  //   option.onChangedHandler = this.getOnChangeHandler(option);
  //   return option;
  // }

  // public getOnChangeHandler(option: ITargetOption): (evt: React.FormEvent<HTMLElement>, isChecked: boolean) => void {
  //   if (!this.onChangeHandlers) {
  //     this.onChangeHandlers = {};
  //   }
  //   let handler = this.onChangeHandlers[option.key];
  //   if (!handler) {
  //     handler = ([]: React.FormEvent<HTMLElement>, isChecked: boolean) => {
  //       const options = option.category === 'Channel' ? this.state.channelOptions : this.state.humanOptions;
  //       const current = this.getOption(option.key, options);
  //       if (current) {
  //         current.selected = isChecked;
  //       }
  //       this.setState({
  //         channelOptions: this.state.channelOptions,
  //         humanOptions: this.state.humanOptions
  //       });
  //     };
  //   }
  //   return handler;
  // }

  // public getOption(key: string, options: ITargetOption[]): ITargetOption | undefined {
  //   return options.find((option: ITargetOption) => option.key === key);
  // }
}
