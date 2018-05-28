
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

import { Dialog } from '../Dialog';

import * as React from 'react';

// tslint:disable-next-line no-empty-interface
export interface IAboutDialogState {
}
export interface IAboutDialogProps {
  open: boolean;
  doneAction: () => void;
}
export class AboutDialog extends React.Component<IAboutDialogProps, IAboutDialogState> {
  public AboutTextField: TextField;

  constructor(props: IAboutDialogProps) {
    super(props);

    this.dismiss = this.dismiss.bind(this);
  }

  public async dismiss(/*About?: IAbout*/) {
    this.props.doneAction(/*About*/);
  }

  public render(): React.ReactNode {
    const margin = { margin: '5px' };
    return (
      <Dialog headerText={'About'} {...this.props} >
        TODO
        <div className="ms-textAlignCenter">
          <PrimaryButton onClick={this.dismiss} style={margin}>Back</PrimaryButton>
        </div>
      </Dialog>
    );
  }
}
