import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HashLink } from 'react-router-hash-link';

import Footer from '../common/Footer';

export default class AuthLoyaut extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="auth">
        <div className="auth__preview">
          <div className="auth__preview--fixed">
            <div className="auth__logo--wrapper">
              <div className="auth__logo">
                <img
                  className="auth__logo_img auth__logo_img-decktop"
                  src={require('../../img/logo.svg')}
                  alt="ARTiFACTS logo"
                />
                <img
                  className="auth__logo_img auth__logo_img-mobile"
                  src={require('../../img/artifacts_logo-mobile.svg')}
                  alt="ARTiFACTS logo"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="auth__formSide">
          { children }
        </div>
        <Footer />
      </div>
    );
  }
}
AuthLoyaut.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
