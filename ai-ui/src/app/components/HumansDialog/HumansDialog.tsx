
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

// import { app as appCss, section as sectionCss, column as columnCss } from './App.scss';
import * as React from 'react';
import { IHuman } from '../../models/Human';

export interface ITargetOption {
  category?: string;
  key: string;
  text: string;
  selected?: boolean;
  onChangedHandler?: (ev: React.FormEvent<HTMLElement>, isChecked: boolean) => void;
}

export interface IHumansDialogState {
  humans: IHuman[];
}
export interface IHumansDialogProps {
  open: boolean;
  doneAction: (addedHuman?: IHuman) => void;
  createHumanAction: () => Promise<IHuman>;
}
export class HumansDialog extends React.Component<IHumansDialogProps, IHumansDialogState> {
  public HumansTextField: TextField;

  public onChangeHandlers: {
    [key: string]: ([]: React.FormEvent<HTMLElement>, isChecked: boolean) => void;
  };

  constructor(props: IHumansDialogProps) {
    super(props);

    if (!props.doneAction || !props.createHumanAction) {
      throw new Error('channels, individuals, doneAction and channels are required');
    }

    this.state = {
      humans: []
    };
  }

  public reset = () => {
    this.setState({
    });
  }

  public dismiss = () => {
    this.finish();
  }

  public resetDismiss = () => {
    this.reset();
    this.dismiss();
  }

  public createHumansFromInputs = async () => {
    return this.finishCreateHumans();
  }

  public finishCreateHumans = async () => {
    const human = await this.props.createHumanAction();
    this.reset();
    this.finish(human);
    return human;
  }

  public finish = (human?: IHuman) => {
    this.props.doneAction(human);
  }

  public renderFooter = () => {
    const margin = { margin: '5px' };
    return (
      <div className="ms-textAlignCenter">
        <DefaultButton onClick={this.dismiss} style={margin}>Cancel</DefaultButton>
        <DefaultButton onClick={this.reset} style={margin}>Reset</DefaultButton>
        <PrimaryButton onClick={this.createHumansFromInputs} style={margin}>Submit</PrimaryButton>
      </div>
    );
  }

  public onHumansChanged = () => {
    this.setState({
    });
  }

  public render(): React.ReactNode {
    return (
      <Panel
        headerText="Humans"
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
        TODO
      </Panel>
    );
  }

  public createOptions(items: string[], category: string, defaultChannel?: string): ITargetOption[] {
    return items.map((value: string) => this.createOption(value, category, value === defaultChannel));
  }

  public createOption(value: string, category: string, selected?: boolean): ITargetOption {
    const option: ITargetOption = { key: value, text: value, category, selected };
    option.onChangedHandler = this.getOnChangeHandler(option);
    return option;
  }

  public getOnChangeHandler(option: ITargetOption): (evt: React.FormEvent<HTMLElement>, isChecked: boolean) => void {
    if (!this.onChangeHandlers) {
      this.onChangeHandlers = {};
    }
    let handler = this.onChangeHandlers[option.key];
    if (!handler) {
      handler = ([]: React.FormEvent<HTMLElement>) => { // , isChecked: boolean) => {
        // const options = option.category === 'Channel' ? this.state.channelOptions : this.state.individualOptions;
        // const current = this.getOption(option.key, options);
        // if (current) {
        //   current.selected = isChecked;
        // }
        this.setState({
        });
      };
    }
    return handler;
  }

  public getOption(key: string, options: ITargetOption[]): ITargetOption | undefined {
    return options.find((option: ITargetOption) => option.key === key);
  }
}
