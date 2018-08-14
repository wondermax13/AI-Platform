
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { TextField } from 'office-ui-fabric-react/lib/TextField';


// import { app as appCss, section as sectionCss, column as columnCss } from './App.scss';
import * as React from 'react';
import { IArtificial, IArtificialModel } from '../../models/Artificial';

export interface ITargetOption {
  category?: string;
  key: string;
  text: string;
  selected: boolean;
  onChangedHandler: (ev: React.FormEvent<HTMLElement>, isChecked: boolean) => void;
}

export interface IArtificialDialogState {
  artificials: IArtificialModel[];
}
export interface IArtificialDialogProps {
  open: boolean;
  doneAction: (addedArtificial?: IArtificial) => void;
  createArtificialAction: () => Promise<IArtificial>;
}
export class ArtificialsDialog extends React.Component<IArtificialDialogProps, IArtificialDialogState> {
  public artificialTextField: TextField;

  public onChangeHandlers: {
    [key: string]: ([]: React.FormEvent<HTMLElement>, isChecked: boolean) => void;
  };

  constructor(props: IArtificialDialogProps) {
    super(props);

    if (!props.doneAction || !props.createArtificialAction) {
      throw new Error('channels, individuals, doneAction and channels are required');
    }

    this.state = {
      artificials: []
    };
    this.reset = this.reset.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.resetDismiss = this.resetDismiss.bind(this);
    this.createArtificialFromInputs = this.createArtificialFromInputs.bind(this);
    this.finishCreateArtificial = this.finishCreateArtificial.bind(this);

    this.finish = this.finish.bind(this);
    this.onQuestionChanged = this.onQuestionChanged.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  public reset(): void {
    this.setState({
    });
  }

  public dismiss(): void {
    this.finish();
  }

  public resetDismiss(): void {
    this.reset();
    this.dismiss();
  }

  public createArtificialFromInputs(): Promise<IArtificial> {
    return this.finishCreateArtificial();
  }

  public async finishCreateArtificial() {
    const artificial = await this.props.createArtificialAction();
    this.reset();
    this.finish(artificial);
    return artificial;
  }

  public async finish(artificial?: IArtificial) {
    this.props.doneAction(artificial);
  }

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

  public onQuestionChanged(/*newValue: string*/): void {
    this.setState({});
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
