import React from 'react';
import {
  BaseComponent,
  Checkbox,
  DefaultButton,
  IBaseProps,
  Panel,
  PrimaryButton,
  TextField,
  autobind,
  PanelType
} from 'office-ui-fabric-react';
// import { app as appCss, section as sectionCss, column as columnCss } from './App.scss';
import { Question } from 'portal/models';

export interface ITargetOption {
  category?: string;
  key: string;
  text: string;
  selected: boolean;
  onChangedHandler: (ev: React.FormEvent<HTMLElement>, isChecked: boolean) => void;
}

export interface IQuestionDialogState {
  channelOptions: Array<ITargetOption>;
  humanOptions: Array<ITargetOption>;
  question: string;
}
export interface IQuestionDialogProps extends IBaseProps<IQuestionDialogProps> {
  open: boolean;
  channels: Array<{ name: string, default?: boolean }>;
  humans: Array<{ name: string, default?: boolean }>;
  ai?: Array<{ name: string, default?: boolean }>;
  defaultChannel: string;
  doneAction: (addedQuestion?: Question) => void;
  createQuestionAction: (question: string, channels: Array<string>, humans: Array<string>) => Promise<Question>;
}
class QuestionDialog extends BaseComponent<IQuestionDialogProps, IQuestionDialogState> {
  public questionTextField: TextField;

  public onChangeHandlers: {
    [key: string]: ([]: React.FormEvent<HTMLElement>, isChecked: boolean) => void;
  } = null;

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
      question: null,
    };
  }

  @autobind
  public reset(): void {
    this.setState({
      channelOptions: this.createOptions(this.props.channels, 'Channel'),
      humanOptions: this.createOptions(this.props.humans, 'human'),
      question: '',
    });
  }

  @autobind
  public dismiss(): void {
    this.finish();
  }

  @autobind
  public resetDismiss(): void {
    this.reset();
    this.dismiss();
  }

  @autobind
  public createQuestionFromInputs(): Promise<Question> {
    const channels = this.state.channelOptions
      .filter((option: ITargetOption) => option.selected)
      .map((selection: ITargetOption) => selection.key);

    const humans = this.state.humanOptions
      .filter((option: ITargetOption) => option.selected)
      .map((selection: ITargetOption) => selection.key);

    return this.finishCreateQuestion(this.state.question, channels, humans);
  }

  public finishCreateQuestion = async (questionText: string, channels: Array<string>, humans: Array<string>) => {
    const question = await this.props.createQuestionAction(questionText, channels, humans);
    this.reset();
    this.finish(question);
    return question;
  }

  public finish = (question?: Question) => {
    this.props.doneAction(question);
  }

  @autobind
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

  @autobind
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
        onRenderFooterContent={this.renderFooter}
        type={PanelType.medium}
      >
        <TextField
          componentRef={this._resolveRef('questionTextField')}
          placeholder="Write question here..."
          ariaLabel="Write question here"
          multiline
          rows={4}
          onChanged={this.onQuestionChanged}
          required={true}
          autoFocus={true}
          value={this.state.question || ''}
        />
        {this.renderFooter()}
        <h2>Channels</h2>
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            {this.state.channelOptions.map((option: ITargetOption, index: number) =>
              <div className="ms-Grid-col ms-lg2" key={'channel_' + index}>
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
        </div>
        <h2>Humans</h2>
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
        </div>
      </Panel>
    );
  }

  public createOptions(items: Array<{ name: string, default?: boolean }>, category: string): Array<ITargetOption> {
    return items.map((value: { name: string, default?: boolean }) => this.createOption(value, category, value.default));
  }

  public createOption(value: { name: string, default?: boolean }, category: string, selected?: boolean): ITargetOption {
    const option: ITargetOption = { key: value.name, text: value.name, category, onChangedHandler: null, selected };
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

  public getOption(key: string, options: Array<ITargetOption>): ITargetOption {
    return options.find((option: ITargetOption) => option.key === key);
  }
}
export default QuestionDialog;