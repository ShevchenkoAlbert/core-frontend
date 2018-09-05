import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { initApp } from '../store/_actions';
import history from '../store/history';
import {
  getUserWithHash,
  checkHashForNewPass,
  getUserWithOrcidCode,
  getUserWithToken,
} from '../store/actions/auth_action';

const isNeedProccess = (pathname, additionalParam) => {
  const path = window.location.pathname;
  return path === pathname && additionalParam;
};


export default function appEnhancer(WrappedComponent) {
  class HocWithApp extends Component {
    componentWillMount() {
      const {
        getUserByHash,
        sendOrcidCode,
        checkHashForNewPassword,
        getUserByToken,
        init,
      } = this.props;
      const parsed = queryString.parse(window.location.search);
      const isMainPath = isNeedProccess('/', window.location.search);
      if (isMainPath) {
        if (parsed.hash) {
          getUserByHash(parsed.hash);
        } else if (parsed.code) {
          const data = {
            code: parsed.code,
          };
          sendOrcidCode(data);
        }
      } else if (isNeedProccess('/newpass/', window.location.search)) {
        if (parsed.hash) {
          checkHashForNewPassword(parsed.hash);
        }
      } else if (isNeedProccess('/activate/', window.location.search)) {
        if (parsed.token) {
          history.replace('/');
          getUserByToken(parsed.token);
        }
      } else if (window.location.pathname === '/' && localStorage.getItem('fullName')) {
        history.push('/dashboard');
      } else if (window.location.pathname === '/' && !localStorage.getItem('fullName')) {
        history.push('/login');
      }
      init();
    }

    render() {
      return (
        <WrappedComponent />
      );
    }
  }

  HocWithApp.propTypes = {
    init: PropTypes.func.isRequired,
    getUserByHash: PropTypes.func.isRequired,
    sendOrcidCode: PropTypes.func.isRequired,
    checkHashForNewPassword: PropTypes.func.isRequired,
    getUserByToken: PropTypes.func.isRequired,
  };

  const mapDispatchToProps = dispatch => ({
    init: () => dispatch(initApp()),
    getUserByHash: value => dispatch(() => getUserWithHash(value)),
    checkHashForNewPassword: value => dispatch(checkHashForNewPass(value)),
    sendOrcidCode: value => dispatch(getUserWithOrcidCode(value)),
    getUserByToken: value => dispatch(getUserWithToken(value)),
  });
  return connect(null, mapDispatchToProps)(HocWithApp);
}
