import React, { PureComponent } from 'react';
import history from '../store/history';
import { isLogin } from '../helpers';

export default function (ComposedComponent) {
  class Authenticate extends PureComponent {
    componentDidMount() {
      if (!isLogin()) {
        history.replace('/login');
      }
    }

    render() {
      return isLogin() ? <ComposedComponent /> : null;
    }
  }
  return Authenticate;
}
