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
  individualOptions: Array<ITargetOption>;
  question: string;
}
export interface IQuestionDialogProps extends IBaseProps<IQuestionDialogProps> {
  open: boolean;
  channels: Array<string>;
  individuals: Array<string>;
  defaultChannel: string;
  doneAction: (addedQuestion?: Question) => void;
  createQuestionAction: (question: string, channels: Array<string>, individuals: Array<string>) => Promise<Question>;
}
class QuestionDialog extends BaseComponent<IQuestionDialogProps, IQuestionDialogState> {
  public questionTextField: TextField;

  public onChangeHandlers: {
    [key: string]: ([]: React.FormEvent<HTMLElement>, isChecked: boolean) => void;
  } = null;

  constructor(props: IQuestionDialogProps) {
    super(props);

    if (!props.doneAction || !props.channels || !props.individuals || !props.createQuestionAction) {
      throw new Error('channels, individuals, doneAction and channels are required');
    }

    const individualOptions = this.createOptions(props.individuals, 'Individual');
    const channelOptions = this.createOptions(props.channels, 'Channel', this.props.defaultChannel);

    this.state = {
      channelOptions,
      individualOptions,
      question: null,
    };
  }

  @autobind
  public reset(): void {
    this.setState({
      channelOptions: this.createOptions(this.props.channels, 'Channel', this.props.defaultChannel),
      individualOptions: this.createOptions(this.props.individuals, 'Individual'),
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

    const individuals = this.state.individualOptions
      .filter((option: ITargetOption) => option.selected)
      .map((selection: ITargetOption) => selection.key);

    return this.finishCreateQuestion(this.state.question, channels, individuals);
  }

  public finishCreateQuestion = async (questionText: string, channels: Array<string>, individuals: Array<string>) => {
    const question = await this.props.createQuestionAction(questionText, channels, individuals);
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
        <h2>Individuals</h2>
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            {this.state.individualOptions.map((option: ITargetOption, index: number) =>
              <div key={'individual_' + index} className="ms-Grid-col ms-lg2">
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

  public createOptions(items: Array<string>, category: string, defaultChannel?: string): Array<ITargetOption> {
    return items.map((value: string) => this.createOption(value, category, value === defaultChannel));
  }

  public createOption(value: string, category: string, selected?: boolean): ITargetOption {
    const option: ITargetOption = { key: value, text: value, category, onChangedHandler: null, selected };
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
        const options = option.category === 'Channel' ? this.state.channelOptions : this.state.individualOptions;
        const current = this.getOption(option.key, options);
        if (current) {
          current.selected = isChecked;
        }
        this.setState({
          channelOptions: this.state.channelOptions,
          individualOptions: this.state.individualOptions
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