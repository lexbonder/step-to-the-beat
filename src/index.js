import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers/rootReducer';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { App } from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';
import config from './firebaseConfig';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(rootReducer, devTools);

firebase.initializeApp(config);

const router = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

ReactDOM.render(
  <Provider store={store}>{router}</Provider>,
  document.getElementById('root'));
registerServiceWorker();
