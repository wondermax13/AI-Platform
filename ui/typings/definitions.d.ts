declare module 'definitions/src/index.scss' {
	export {};

}
declare module 'definitions/src/App/App.scss' {
	export const App: string;
	export const app: string;
	export const appScrollable: string;

}
declare module 'definitions/src/models/Question' {
	export default class Question {
	    question: string;
	    from: {
	        type: string;
	        value: string;
	    };
	    to: Array<{
	        type: string;
	        value: string;
	    }>;
	}

}
declare module 'definitions/src/models/Human' {
	export default class Question {
	}

}
declare module 'definitions/src/models/Artificial' {
	export default class Question {
	}

}
declare module 'definitions/src/models/index' {
	export { default as Question } from 'definitions/src/models/Question';
	export { default as Human } from 'definitions/src/models/Human';
	export { default as Artificial } from 'definitions/src/models/Artificial';

}
declare module 'definitions/src/QuestionDialog/QuestionDialog' {
	/// <reference types="react" />
	import React from 'react';
	import { BaseComponent, IBaseProps, TextField } from 'office-ui-fabric-react';
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
	} class QuestionDialog extends BaseComponent<IQuestionDialogProps, IQuestionDialogState> {
	    questionTextField: TextField;
	    onChangeHandlers: {
	        [key: string]: ([]: React.FormEvent<HTMLElement>, isChecked: boolean) => void;
	    };
	    constructor(props: IQuestionDialogProps);
	    reset(): void;
	    dismiss(): void;
	    resetDismiss(): void;
	    createQuestionFromInputs(): Promise<Question>;
	    finishCreateQuestion: (questionText: string, channels: string[], individuals: string[]) => Promise<Question>;
	    finish: (question?: Question) => void;
	    renderFooter(): JSX.Element;
	    onQuestionChanged(newValue: string): void;
	    render(): React.ReactNode;
	    createOptions(items: Array<string>, category: string, defaultChannel?: string): Array<ITargetOption>;
	    createOption(value: string, category: string, selected?: boolean): ITargetOption;
	    getOnChangeHandler(option: ITargetOption): (evt: React.FormEvent<HTMLElement>, isChecked: boolean) => void;
	    getOption(key: string, options: Array<ITargetOption>): ITargetOption;
	}
	export default QuestionDialog;

}
declare module 'definitions/src/QuestionDialog/index' {
	export { default as QuestionDialog } from 'definitions/src/QuestionDialog/QuestionDialog';

}
declare module 'definitions/src/HumansDialog/HumansDialog' {
	/// <reference types="react" />
	import React from 'react';
	import { BaseComponent, IBaseProps, TextField } from 'office-ui-fabric-react';
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
	} class HumansDialog extends BaseComponent<IHumansDialogProps, IHumansDialogState> {
	    HumansTextField: TextField;
	    onChangeHandlers: {
	        [key: string]: ([]: React.FormEvent<HTMLElement>, isChecked: boolean) => void;
	    };
	    constructor(props: IHumansDialogProps);
	    reset(): void;
	    dismiss(): void;
	    resetDismiss(): void;
	    createHumansFromInputs(): Promise<Human>;
	    finishCreateHumans: () => Promise<Human>;
	    finish: (Humans?: Human) => void;
	    renderFooter(): JSX.Element;
	    onHumansChanged(): void;
	    render(): React.ReactNode;
	    createOptions(items: Array<string>, category: string, defaultChannel?: string): Array<ITargetOption>;
	    createOption(value: string, category: string, selected?: boolean): ITargetOption;
	    getOnChangeHandler(option: ITargetOption): (evt: React.FormEvent<HTMLElement>, isChecked: boolean) => void;
	    getOption(key: string, options: Array<ITargetOption>): ITargetOption;
	}
	export default HumansDialog;

}
declare module 'definitions/src/HumansDialog/index' {
	export { default as HumansDialog } from 'definitions/src/HumansDialog/HumansDialog';

}
declare module 'definitions/src/ArtificialsDialog/ArtificialsDialog' {
	/// <reference types="react" />
	import React from 'react';
	import { BaseComponent, IBaseProps, TextField } from 'office-ui-fabric-react';
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
	} class ArtificialDialog extends BaseComponent<IArtificialDialogProps, IArtificialDialogState> {
	    artificialTextField: TextField;
	    onChangeHandlers: {
	        [key: string]: ([]: React.FormEvent<HTMLElement>, isChecked: boolean) => void;
	    };
	    constructor(props: IArtificialDialogProps);
	    reset(): void;
	    dismiss(): void;
	    resetDismiss(): void;
	    createArtificialFromInputs(): Promise<Artificial>;
	    finishCreateArtificial: () => Promise<Artificial>;
	    finish: (artificial?: Artificial) => void;
	    renderFooter(): JSX.Element;
	    onQuestionChanged(): void;
	    render(): React.ReactNode;
	    getOnChangeHandler(option: ITargetOption): (evt: React.FormEvent<HTMLElement>, isChecked: boolean) => void;
	}
	export default ArtificialDialog;

}
declare module 'definitions/src/ArtificialsDialog/index' {
	export { default as ArtificialsDialog } from 'definitions/src/ArtificialsDialog/ArtificialsDialog';

}
declare module 'definitions/src/Feed/Feed' {
	/// <reference types="react" />
	import React from 'react';
	import { Question } from 'definitions/src/models';
	export interface IFeedState {
	}
	export interface IFeedProps {
	    questions: Array<Question>;
	    channels: Array<string>;
	    individuals: Array<string>;
	    userId: string;
	    recentlyAddedQuestion: Question;
	} class Feed extends React.Component<IFeedProps, IFeedState> {
	    constructor(props: IFeedProps);
	    getLocation(question: Question): string;
	    onClickLocation(): void;
	    render(): React.ReactNode;
	}
	export default Feed;

}
declare module 'definitions/src/Feed/index' {
	export { default as Feed } from 'definitions/src/Feed/Feed';

}
declare module 'definitions/src/App/App' {
	/// <reference types="react" />
	import React from 'react';
	import { Question, Human, Artificial } from 'models';
	export interface InterfaceAppState {
	    newQuestionDialogIsOpen: boolean;
	    humansDialogIsOpen: boolean;
	    artificialsDialogIsOpen: boolean;
	    channels: Array<string>;
	    individuals: Array<string>;
	    questions: Array<Question>;
	    userId: string;
	    recentlyAddedQuestion: Question;
	    recentlyAddedHuman: Human;
	    recentlyAddedArtificial: Artificial;
	}
	export interface InterfaceAppProps {
	} class App extends React.Component<InterfaceAppProps, InterfaceAppState> {
	    constructor(props: InterfaceAppProps);
	    openNewQuestionDialog(): void;
	    openHumansDialog(): void;
	    openArtificialsDialog(): void;
	    closeNewQuestionDialog(newQuestion?: Question): void;
	    closeHumansDialog(human?: Human): void;
	    closeArtificialsDialog(artificial?: Artificial): void;
	    createQuestion(question: string, channels: Array<string>, individuals: Array<string>): Promise<Question>;
	    createArtificial(): Promise<Artificial>;
	    createHuman(): Promise<Human>;
	    getLocation(question: Question): string;
	    onClickLocation(): void;
	    render(): React.ReactNode;
	}
	export default App;

}
declare module 'definitions/src/App/index' {
	export { default as App } from 'definitions/src/App/App';

}
declare module 'definitions/src/index' {
	import 'definitions/src/index.scss';

}
declare module 'definitions/src/Header/Header' {
	/// <reference types="react" />
	import React from 'react';
	export interface IHeaderState {
	}
	export interface IHeaderProps {
	} class Header extends React.Component<IHeaderProps, IHeaderState> {
	    constructor(props: IHeaderProps);
	    render(): React.ReactNode;
	}
	export default Header;

}
declare module 'definitions/src/Header/index' {
	export { default as Header } from 'definitions/src/Header/Header';

}
