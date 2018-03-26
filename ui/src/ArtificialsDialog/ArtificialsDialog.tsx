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
import { Artificial } from 'portal/models';

export interface ITargetOption {
  category?: string;
  key: string;
  text: string;
  selected: boolean;
  onChangedHandler: (ev: React.FormEvent<HTMLElement>, isChecked: boolean) => void;
}

export interface IArtificialDialogState {
  artificials: Array<Artificial>;
}
export interface IArtificialDialogProps extends IBaseProps<IArtificialDialogProps> {
  open: boolean;
  doneAction: (addedArtificial?: Artificial) => void;
  createArtificialAction: () => Promise<Artificial>;
}
class ArtificialDialog extends BaseComponent<IArtificialDialogProps, IArtificialDialogState> {
  public artificialTextField: TextField;

  public onChangeHandlers: {
    [key: string]: ([]: React.FormEvent<HTMLElement>, isChecked: boolean) => void;
  } = null;

  constructor(props: IArtificialDialogProps) {
    super(props);

    if (!props.doneAction || !props.createArtificialAction) {
      throw new Error('channels, individuals, doneAction and channels are required');
    }

    this.state = {
      artificials: []
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
  public createArtificialFromInputs(): Promise<Artificial> {
    return this.finishCreateArtificial();
  }

  public finishCreateArtificial = async () => {
    const artificial = await this.props.createArtificialAction();
    this.reset();
    this.finish();
    return artificial;
  }

  public finish = (artificial?: Artificial) => {
    this.props.doneAction(artificial);
  }

  @autobind
  public renderFooter(): JSX.Element {
    const margin = { margin: '5px' };
    return (
      <div className="ms-textAlignCenter">
        <DefaultButton onClick={this.dismiss} style={margin}>Cancel</DefaultButton>
        <DefaultButton onClick={this.reset} style={margin}>Reset</DefaultButton>
        <PrimaryButton onClick={this.createArtificialFromInputs} style={margin}>Submit</PrimaryButton>
      </div>
    );
  }

  @autobind
  public onQuestionChanged(/*newValue: string*/): void {
    this.setState({
    });
  }

  public render(): React.ReactNode {
    return (
      <Panel
        headerText="Artificials"
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

  // public createOptions(items: Array<string>, category: string, defaultChannel?: string): Array<ITargetOption> {
  //   return items.map((value: string) => this.createOption(value, category, value === defaultChannel));
  // }

  // public createOption(value: string, category: string, selected?: boolean): ITargetOption {
  //   const option: ITargetOption = { key: value, text: value, category, onChangedHandler: null, selected };
  //   option.onChangedHandler = this.getOnChangeHandler(option);
  //   return option;
  // }

  public getOnChangeHandler(option: ITargetOption): (evt: React.FormEvent<HTMLElement>, isChecked: boolean) => void {
    if (!this.onChangeHandlers) {
      this.onChangeHandlers = {};
    }
    let handler = this.onChangeHandlers[option.key];
    if (!handler) {
    handler = ([]: React.FormEvent<HTMLElement>/*, isChecked: boolean*/) => {
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

  // public getOption(key: string, options: Array<ITargetOption>): ITargetOption {
  //   return options.find((option: ITargetOption) => option.key === key);
  // }
}
export default ArtificialDialog;