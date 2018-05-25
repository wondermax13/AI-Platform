
// import { app as appCss, section as sectionCss, column as columnCss } from './App.scss';
import {
  // CommandBar,
  // Toggle,
  // assign,
  // IContextualMenuItem
} from 'office-ui-fabric-react';
import * as React from 'react';

class Header extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);

    this.state = {
    };
  }

  public render(): React.ReactNode {
    // const home: IContextualMenuItem = {
    //   key: 'home',
    //   name: 'Home',
    //   subMenuProps: {
    //     items: [
    //       {
    //         key: 'emailMessage',
    //         name: 'Email message',
    //         icon: 'Mail',
    //         ['data-automation-id']: 'newEmailButton'
    //       },
    //       {
    //         key: 'calendarEvent',
    //         name: 'Calendar event',
    //         icon: 'Calendar',
    //         ['data-automation-id']: 'newCalendarButton'
    //       }
    //     ],
    //   },
    // };

    // const search: IContextualMenuItem = {
    //   key: 'home',
    //   name: 'Home',
    //   subMenuProps: {
    //     items: [
    //       {
    //         key: 'emailMessage',
    //         name: 'Email message',
    //         icon: 'Mail',
    //         ['data-automation-id']: 'newEmailButton'
    //       },
    //       {
    //         key: 'calendarEvent',
    //         name: 'Calendar event',
    //         icon: 'Calendar',
    //         ['data-automation-id']: 'newCalendarButton'
    //       }
    //     ],
    //   },
    // };

//    const { items, overflowItems, farItems } = this.props;
    // const items: Array<IContextualMenuItem> = [
    //   home
    // ];

    // const settings = {
    //   isSearchBoxVisible: true, // searchBoxVisible,
    //   areIconsVisible: true, // iconsVisible,
    //   areNamesVisible: true, // namesVisible,
    //   areItemsEnabled: true, // itemsEnabled
    // };// = this.state;

    // const filteredItems = items.map((item: any) => assign({}, item, {
    //   iconOnly: !namesVisible,
    //   icon: iconsVisible ? item.icon : '',
    //   disabled: !itemsEnabled
    // }));

    // const filteredOverflowItems = overflowItems.map((item: any) => assign({}, item, {
    //   iconOnly: !namesVisible,
    //   icon: iconsVisible ? item.icon : '',
    //   disabled: !itemsEnabled
    // }));

    // const filteredFarItems = farItems.map((item: any) => assign({}, item, {
    //   iconOnly: !namesVisible,
    //   icon: iconsVisible ? item.icon : '',
    //   disabled: !itemsEnabled
    // }));

    return (
      <div>test
        {/* <Toggle
          label="Show search box"
          checked={searchBoxVisible}
          // tslint:disable-next-line:jsx-no-lambda
          onChanged={isSearchBoxVisible => this.setState({ isSearchBoxVisible })}
          onText="Visible"
          offText="Hidden"
        />
        <Toggle
          label="Show names"
          checked={namesVisible}
          // tslint:disable-next-line:jsx-no-lambda
          onChanged={areNamesVisible => this.setState({ areNamesVisible })}
          onText="Visible"
          offText="Hidden"
        />
        <Toggle
          label="Show icons"
          checked={iconsVisible}
          // tslint:disable-next-line:jsx-no-lambda
          onChanged={areIconsVisible => this.setState({ areIconsVisible })}
          onText="Visible"
          offText="Hidden"
        />
        <Toggle
          label="Enable Items"
          checked={itemsEnabled}
          // tslint:disable-next-line:jsx-no-lambda
          onChanged={areItemsEnabled => this.setState({ areItemsEnabled })}
          onText="Visible"
          offText="Hidden"
        /> */}
        {/* <CommandBar
          isSearchBoxVisible={settings.isSearchBoxVisible}
          // areIconsVisible={settings.areIconsVisible}
          // areNamesVisible={settings.areNamesVisible}
          searchPlaceholderText="Search..."
          elipisisAriaLabel="More options"
          items={items}
          // overflowItems={filteredOverflowItems}
          // farItems={filteredFarItems}
        /> */}
      </div>
    );
  }
}
export default Header;