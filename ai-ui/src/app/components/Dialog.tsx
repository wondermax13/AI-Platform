import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';

export interface IDialogProps {
  headerText: string;
  open: boolean;
  doneAction: () => void;
}

export class Dialog extends React.Component<IDialogProps> {

  constructor(props: IDialogProps) {
    super(props);

    this.dismiss = this.dismiss.bind(this);
  }

  public async dismiss(/*?: I*/) {
    this.props.doneAction(/**/);
  }

  public render(): React.ReactNode {
    return (
      <Panel
        headerText={this.props.headerText}
        isBlocking={true}
        isFooterAtBottom={true}
        isHiddenOnDismiss={false}
        isLightDismiss={true}
        isOpen={this.props.open}
        onDismiss={this.dismiss}
        onLightDismissClick={this.dismiss}
        type={PanelType.medium}
      >
        {this.props.children}
      </Panel>
    );
  }
}
