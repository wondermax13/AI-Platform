import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';
import { IQuestionModel } from '../../models/Question';

// import { app as appCss, section as sectionCss, column as columnCss } from './App.scss';
import { ICommon } from '../../models/Common';

export interface ITargetOption {
  category?: string;
  key: string;
  text: string;
  selected: boolean;
  onChangedHandler?: (ev: React.FormEvent<HTMLElement>, isChecked: boolean) => void;
}

export interface IQuestionDialogState {
  channelOptions: ITargetOption[];
  humanOptions: ITargetOption[];
  question?: string;
}

export interface IQuestionDialogProps extends ICommon {
  open: boolean;
  defaultChannel?: string;
  doneAction: (addedQuestion?: IQuestionModel) => void;
  createQuestionAction: (question: string, channels: string[], individuals?: string[]) => Promise<IQuestionModel | undefined>;
}

export class QuestionDialog extends React.Component<IQuestionDialogProps, IQuestionDialogState> {
  // public questionTextField: TextField;

  public onChangeHandlers: {
    [key: string]: ([]: React.FormEvent<HTMLElement>, isChecked: boolean) => void;
  };

  constructor(props: IQuestionDialogProps) {
    super(props);

    if (!props.doneAction || !props.channels || !props.humans || !props.createQuestionAction) {
      throw new Error('channels, humans, doneAction and channels are required');
    }

    const humanOptions = this.createOptions(props.humans, 'Human');
    const channelOptions = this.createOptions(props.channels, 'Channel');

    this.state = {
      channelOptions,
      humanOptions,
    };
    this.reset = this.reset.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.resetDismiss = this.resetDismiss.bind(this);
    this.createQuestionFromInputs = this.createQuestionFromInputs.bind(this);
    this.onQuestionChanged = this.onQuestionChanged.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  public reset(): void {
    this.setState({
      channelOptions: this.createOptions(this.props.channels, 'Channel'),
      humanOptions: this.createOptions(this.props.humans, 'human'),
      question: '',
    });
  }

  public dismiss(): void {
    this.finish();
  }

  public resetDismiss(): void {
    this.reset();
    this.dismiss();
  }

  public createQuestionFromInputs(): Promise<IQuestionModel | undefined> {
    const channels = this.state.channelOptions
      .filter((option: ITargetOption) => option.selected)
      .map((selection: ITargetOption) => selection.key);

    const humans = this.state.humanOptions
      .filter((option: ITargetOption) => option.selected)
      .map((selection: ITargetOption) => selection.key);

    return this.finishCreateQuestion(this.state.question, channels, humans);
  }

  public async finishCreateQuestion(questionText: string | undefined, channels: string[], humans: string[]): Promise<IQuestionModel | undefined> {
    if (questionText) {
      const question = await this.props.createQuestionAction(questionText, channels);
      this.reset();
      this.finish(question);
      return question;
    } else {
      return undefined;
    }
  }

  public finish = (question?: IQuestionModel) => {
    this.props.doneAction(question);
  }

  public renderFooter(): JSX.Element {
    const margin = { margin: '5px' };
    return (
      <div className="ms-textAlignCenter">
        <DefaultButton onClick={this.dismiss} style={margin}>Cancel</DefaultButton>
        <DefaultButton onClick={this.reset} style={margin}>Reset</DefaultButton>
        <PrimaryButton onClick={this.createQuestionFromInputs} style={margin}>Submit</PrimaryButton>
      </div>
    );
  }

  public onQuestionChanged(newValue: string): void {
    this.setState({
      question: newValue
    });
  }

  public render(): React.ReactNode {
    return (
      <Panel
        headerText="Submit a question"
        isBlocking={true}
        isFooterAtBottom={true}
        isHiddenOnDismiss={false}
        isLightDismiss={true}
        isOpen={this.props.open}
        onDismiss={this.dismiss}
        onLightDismissClick={this.dismiss}
        // onRenderFooterContent={this.renderFooter}
        type={PanelType.medium}
      >
        <TextField
          placeholder="Write question here..."
          ariaLabel="Write question here"
          multiline={true}
          rows={4}
          onChanged={this.onQuestionChanged}
          required={true}
          autoFocus={true}
          value={this.state.question || ''}
        />
        {this.renderFooter()}
        <h2>Channels</h2>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${this.state.channelOptions.length}, 1fr)` }}>
          {this.state.channelOptions.map((option: ITargetOption, index: number) =>
            <div key={'channel_' + index}>
              <Checkbox
                key={`${option.category}_${option.key}`}
                label={option.text}
                value={option.key}
                checked={option.selected}
                onChange={option.onChangedHandler}
              />
            </div>
          )}
        </div>
        {/* <h2>Humans</h2>
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            {this.state.humanOptions.map((option: ITargetOption, index: number) =>
              <div key={'human_' + index} className="ms-Grid-col ms-lg2">
                <Checkbox
                  key={`${option.category}_${option.key}`}
                  label={option.text}
                  value={option.key}
                  checked={option.selected}
                  onChange={option.onChangedHandler}
                />
              </div>
            )}
          </div>
        </div> */}
      </Panel>
    );
  }

  public createOptions(items: Array<{ name: string, default?: boolean }>, category: string): ITargetOption[] {
    return items.map((value: { name: string, default?: boolean }) => this.createOption(value, category, value.default));
  }

  public createOption(value: { name: string, default?: boolean }, category: string, selected?: boolean): ITargetOption {
    const option: ITargetOption = { key: value.name, text: value.name, category, selected: selected || false };
    option.onChangedHandler = this.getOnChangeHandler(option);
    return option;
  }

  public getOnChangeHandler(option: ITargetOption): (evt: React.FormEvent<HTMLElement>, isChecked: boolean) => void {
    if (!this.onChangeHandlers) {
      this.onChangeHandlers = {};
    }
    let handler = this.onChangeHandlers[option.key];
    if (!handler) {
      handler = ([]: React.FormEvent<HTMLElement>, isChecked: boolean) => {
        const options = option.category === 'Channel' ? this.state.channelOptions : this.state.humanOptions;
        const current = this.getOption(option.key, options);
        if (current) {
          current.selected = isChecked;
        }
        this.setState({
          channelOptions: this.state.channelOptions,
          humanOptions: this.state.humanOptions
        });
      };
    }
    return handler;
  }

  public getOption(key: string, options: ITargetOption[]): ITargetOption | undefined {
    return options.find((option: ITargetOption) => option.key === key);
  }
}
