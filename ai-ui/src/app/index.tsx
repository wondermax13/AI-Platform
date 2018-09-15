import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App, { IAppProps } from './App/App';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';

export function start() {
  let initialState: IAppProps = {
    scoreCards: { sources: [] },
    questions: [],
    ais: [],
  };
  try {
    // tslint:disable-next-line no-string-literal
    const serverState = window['__APP_INITIAL_STATE__'];
    if (serverState) {
      let parsed = serverState;
      if (typeof serverState === 'string') {
        parsed = JSON.parse(serverState);
      }
      initialState = parsed || initialState;
    }
  } catch(ex) {
    console.error('Error loading initial state from server. Starting empty', ex);
  }

  ReactDOM.render(
    <App {...initialState} />,
    document.getElementById('root') as HTMLElement
  );
  // registerServiceWorker();
}

