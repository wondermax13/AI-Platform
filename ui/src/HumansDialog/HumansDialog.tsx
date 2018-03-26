import React from 'react';
import {
  BaseComponent,
  // Checkbox,
  DefaultButton,
  IBaseProps,
  Panel,
  PrimaryButton,
  TextField,
  autobind,
  PanelType
} from 'office-ui-fabric-react';
// import { app as appCss, section as sectionCss, column as columnCss } from './App.scss';
import { Human } from 'portal/models';

export interface ITargetOption {
  category?: string;
  key: string;
  text: string;
  selected: boolean;
  onChangedHandler: (ev: React.FormEvent<HTMLElement>, isChecked: boolean) => void;
}

export interface IHumansDialogState {
  humans: Array<Human>;
}
export interface IHumansDialogProps extends IBaseProps<IHumansDialogProps> {
  open: boolean;
  doneAction: (addedHumans?: Human) => void;
  createHumanAction: () => Promise<Human>;
}
class HumansDialog extends BaseComponent<IHumansDialogProps, IHumansDialogState> {
  public HumansTextField: TextField;

  public onChangeHandlers: {
    [key: string]: ([]: React.FormEvent<HTMLElement>, isChecked: boolean) => void;
  } = null;

  constructor(props: IHumansDialogProps) {
    super(props);

    if (!props.doneAction || !props.createHumanAction) {
      throw new Error('channels, individuals, doneAction and channels are required');
    }

    this.state = {
      humans: []
    };
  }

  @autobind
  public reset(): void {
    this.setState({
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
  public createHumansFromInputs(): Promise<Human> {
    return this.finishCreateHumans();
  }

  public finishCreateHumans = async () => {
    const humans = await this.props.createHumanAction();
    this.reset();
    this.finish();
    return humans;
  }

  public finish = (Humans?: Human) => {
    this.props.doneAction(Humans);
  }

  @autobind
  public renderFooter(): JSX.Element {
    const margin = { margin: '5px' };
    return (
      <div className="ms-textAlignCenter">
        <DefaultButton onClick={this.dismiss} style={margin}>Cancel</DefaultButton>
        <DefaultButton onClick={this.reset} style={margin}>Reset</DefaultButton>
        <PrimaryButton onClick={this.createHumansFromInputs} style={margin}>Submit</PrimaryButton>
      </div>
    );
  }

  @autobind
  public onHumansChanged(): void {
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

  public getOption(key: string, options: Array<ITargetOption>): ITargetOption {
    return options.find((option: ITargetOption) => option.key === key);
  }
}
export default HumansDialog;