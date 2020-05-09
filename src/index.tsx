import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './containers/app/App';
import { initializeFirebase } from './utils/initializeFirebase';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

initializeFirebase();

serviceWorker.unregister();
