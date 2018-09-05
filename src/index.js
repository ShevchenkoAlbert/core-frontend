import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

import App from './App';
import store from './store/store';
import appEnhancer from './hocs/AppEnhancer';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import '../node_modules/font-awesome/css/font-awesome.css';
// import './style/icomoon/style.css';
import './index.scss';

const AppHOC = appEnhancer(App);

ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <AppHOC />
    </CookiesProvider>
  </Provider>,
  document.getElementById('root'),
);
