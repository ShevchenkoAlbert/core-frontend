import React, { PureComponent } from 'react';
import history from '../store/history';
import { isLogin, redirectUrlHandler } from '../helpers';

export default function (ComposedComponent) {
  class Redirect extends PureComponent {
    componentWillMount() {
      if (isLogin() && redirectUrlHandler('/login/')) {
        window.location.href = redirectUrlHandler('/login/');
      } else if (isLogin()) {
        history.replace('/dashboard');
      }
    }

    render() {
      if (!isLogin()) return <ComposedComponent />;
      return null;
    }
  }
  return Redirect;
}
