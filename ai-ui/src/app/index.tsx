import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App/App';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';

// tslint:disable-next-line no-string-literal
const x = (window['__APP_INITIAL_STATE__'] || { initialQuestions: [] })
x.initialQuestions = x.initialQuestions || [];

export function start() {
  ReactDOM.render(
    <App {...x} />,
    document.getElementById('root') as HTMLElement
  );
  // registerServiceWorker();
}

