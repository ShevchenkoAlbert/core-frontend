import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { NotificationContainer } from 'react-notifications';
import ComingSoon from '../core/ComingSoon';

class ProfileSocial extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>
            ARTIFACTS | Profile Social
          </title>
        </Helmet>
        <NotificationContainer />
        <ComingSoon />
      </React.Fragment>
    );
  }
}

ProfileSocial.propTypes = {
};
export default ProfileSocial;
