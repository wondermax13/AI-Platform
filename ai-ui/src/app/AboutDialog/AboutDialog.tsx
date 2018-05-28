
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

  public attributions = () => {
    return (<pre style={{ textAlign: 'left', fontSize: '6pt' }}>{`
      Avatar Icons provided under the Creative Commons 3.0 BY
      or CC0 if mentioned below:
      - Lorc, http://lorcblog.blogspot.com
      - Delapouite, http://delapouite.com
      - John Colburn, http://ninmunanmu.com
      - Felbrigg, http://blackdogofdoom.blogspot.co.uk
      - John Redman, http://www.uniquedicetowers.com
      - Carl Olsen, https://twitter.com/unstoppableCarl
      - Sbed, http://opengameart.org/content/95-game-icons
      - PriorBlue
      - Willdabeast, http://wjbstories.blogspot.com
      - Viscious Speed, http://viscious-speed.deviantart.com - CC0
      - Lord Berandas, http://berandas.deviantart.com
      - Irongamer, http://ecesisllc.wix.com/home
      - HeavenlyDog, http://www.gnomosygoblins.blogspot.com
      - Lucas
      - Faithtoken, http://fungustoken.deviantart.com
      - Skoll
      - Andy Meneely, http://www.se.rit.edu/~andy/
      - Cathelineau
      - Kier Heyl
      - Aussiesim
      - Sparker, http://citizenparker.com
      - Zeromancer - CC0
      - Rihlsul
      - Quoting
      - Guard13007, https://guard13007.com
      - DarkZaitzev, http://darkzaitzev.deviantart.com
      - SpencerDub
      - GeneralAce135
      - Zajkonur
      More info and icons available at https://game-icons.net
    `}</pre>);
  };

  public dismiss = async (/*About?: IAbout*/) => {
    this.props.doneAction(/*About*/);
  };

  public render(): React.ReactNode {
    const margin = { margin: '5px' };
    return (
      <Dialog headerText={'About'} {...this.props} >
        <div className="ms-textAlignCenter">

          {this.attributions()}
          <PrimaryButton onClick={this.dismiss} style={margin}>Back</PrimaryButton>
        </div>
      </Dialog>
    );
  }
}
