import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
// import { TextField } from 'office-ui-fabric-react/lib/TextField';

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
  // public AboutTextField: TextField;

  public dismiss = async (/*About?: IAbout*/) => {
    this.props.doneAction(/*About*/);
  };

  public render(): React.ReactNode {
    const margin = { margin: '5px' };
    return (
      <Dialog headerText={'About'} {...this.props} >
        <div className="ms-textAlignCenter">

          <h3><a href="/client/privacy.html" target="_new">Privacy Policy</a></h3>

          <h3><a href="/client/attributions.html" target="_new">Attributions</a></h3>

          <PrimaryButton onClick={this.dismiss} style={margin}>Back</PrimaryButton>
        </div>
      </Dialog>
    );
  }
}
