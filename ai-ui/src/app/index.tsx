import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App/App';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';

export function start() {
  let initialState = { initialQuestions: [] };
  try {
    // tslint:disable-next-line no-string-literal
    const serverState = window['__APP_INITIAL_STATE__'];
    if (serverState) {
      const parsed = JSON.parse(unescape(serverState));
      initialState = parsed || initialState;
    }
  } catch(ex) {
    console.log('Error loading initial state from server. Starting empty');
  }

  ReactDOM.render(
    <App {...initialState} />,
    document.getElementById('root') as HTMLElement
  );
  // registerServiceWorker();
}

